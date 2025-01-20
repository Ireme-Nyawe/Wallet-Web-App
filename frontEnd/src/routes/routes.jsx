import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userViewProfile } from '../slices/userSlice';
import LoginPage from '../pages/LoginPage';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Dashboard from '../components/dashboard/Dashboard';
import { useToast } from '../components/toasts/ToastManager';
import PageNotFound from '../components/PageNotFound';
import DashboardPageNotFound from '../components/dashboard/DashboardPageNotFound';
import Budget from '../components/dashboard/Budget';
import Categories from '../components/dashboard/Categories';
import Transactions from '../components/dashboard/Transactions';
import Reports from '../components/dashboard/Reports';
import Accounts from '../components/dashboard/Accounts';

const validateToken = () => {
  const token = localStorage.getItem('token');
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  const sessionDuration = 5 * 60 * 60 * 1000; 

  if (!token) {
    return { isValid: false };
  }

  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);

  const tokenCreationTime = new Date(parseInt(tokenTimestamp, 10));
  const tokenCreationHours = tokenCreationTime.getHours();
  const tokenCreationMinutes = tokenCreationTime.getMinutes();
  const tokenCreationSeconds = tokenCreationTime.getSeconds();

  console.log(
    `Token was created at ${tokenCreationHours}:${tokenCreationMinutes}:${tokenCreationSeconds}`
  );

  console.log(
    `Elapsed time since token creation: ${(
      elapsedTime /
      (1000 * 60 * 60)
    ).toFixed(2)} hours`
  );

  if (elapsedTime > sessionDuration) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    return { isValid: false };
  }

  return { isValid: true };
};

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const { isValid } = validateToken();
      setIsAuthorized(isValid);
      setIsLoading(false);
    };

    checkAuthorization();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};
const AppRouter = () => {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const { addToast } = useToast();

  const fetchProfile = async () => {
    try {
      const response = await userViewProfile();
      if (response.status === 200) {
        setProfile({
          firstname: response.data.firstName || '',
          lastname: response.data.lastName || '',
          email: response.data.email || '',
        });
      } else if (response.status === 401) {
        localStorage.removeItem('token');
      } else {
        throw new Error(response.message || 'Error fetching profile');
      }
    } catch (error) {
      addToast('error', error.message || 'Unknown error occurred', 3000);
    }
  };


  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
        <Route index element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="budget" element={<Budget />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<DashboardPageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
