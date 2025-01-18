import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toasts/ToastManager";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
    <ToastProvider>
      <LoginPage />
    </ToastProvider></BrowserRouter>
  );
}

export default App;
