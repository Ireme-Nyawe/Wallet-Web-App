import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/toasts/ToastManager";
import LoginPage from "./pages/LoginPage";
import AppRouter from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
