import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import SettingsPage from "./pages/SettingsPage";
import GoalPage from "./pages/GoalPage";
import Results from "./pages/Results";
import { useThemeStore } from "./store/themeStore";
import { Toaster } from "react-hot-toast";
import VerificationCode from "./pages/VerificationCode";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/verification" element={<VerificationCode />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
