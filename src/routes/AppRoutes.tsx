import { Routes, Route } from "react-router-dom";

import AdminRoutes from "@/routes/AdminRoutes";

import ReachIntroPage from "@/pages/ReachIntroPage";

import LandingPage from "@/pages/LandingPage";

import SignupPage from "@/pages/SignupPage";

import VerifyOtpPage from "@/pages/VerifyOtpPage";

import LoginPage from "@/pages/LoginPage";

import FeedPage from "@/pages/FeedPage";

import ForgotPasswordPage from "@/pages/ForgotPasswordPage";

import VerifyPasswordResetOtpPage from "@/pages/VerifyPasswordResetOtpPage";

import ResetPasswordPage from "@/pages/ResetPasswordPage";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ReachIntroPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/feed" element={<FeedPage />} />

            <Route  path="/admin/*" element={<AdminRoutes />} />
               
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/verify-password-reset-otp" element={<VerifyPasswordResetOtpPage />} />
    
 <Route  path="/reset-password" element={<ResetPasswordPage />} />
    
    

            

        </Routes>
    );
}

export default AppRoutes;