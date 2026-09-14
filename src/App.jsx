import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import CroatianQuiz from "@/pages/CroatianQuiz";
import BraniSvojGrad from "@/pages/BraniSvojGrad";
import CityQuiz from "@/pages/CityQuiz";
import DailyQuiz from "@/pages/DailyQuiz";
import Leaderboard from "@/pages/Leaderboard";
import PatriaSoul from "@/pages/PatriaSoul";
import Profile from "@/pages/Profile";
import PageNotFound from "./lib/PageNotFound";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0b1020]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === "user_not_registered") return <UserNotRegisteredError />;
    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kviz" element={<CroatianQuiz />} />
        <Route path="/brani-svoj-grad" element={<BraniSvojGrad />} />
        <Route path="/brani-svoj-grad/:slug" element={<CityQuiz />} />
        <Route path="/dnevni-kviz" element={<DailyQuiz />} />
        <Route path="/rang-lista" element={<Leaderboard />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/patriasoul" element={<PatriaSoul />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AuthenticatedApp />
      </Router>
    </AuthProvider>
  );
}
