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

import { ROUTES } from "@/constants/routes";



function AppRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTES.ROOT}
                element={<ReachIntroPage />}
            />

            <Route
                path={ROUTES.LANDING}
                element={<LandingPage />}
            />

            <Route
                path={ROUTES.LOGIN}
                element={<LoginPage />}
            />

            <Route
                path={ROUTES.SIGNUP}
                element={<SignupPage />}
            />

            <Route
                path={ROUTES.VERIFY_OTP}
                element={<VerifyOtpPage />}
            />

            <Route
                path={ROUTES.FEED}
                element={<FeedPage />}
            />

            <Route
                path={`${ROUTES.ADMIN.ROOT}/*`}
                element={<AdminRoutes />}
            />

            <Route
                path={ROUTES.FORGOT_PASSWORD}
                element={<ForgotPasswordPage />}
            />

            <Route
                path={ROUTES.VERIFY_PASSWORD_RESET_OTP}
                element={<VerifyPasswordResetOtpPage />}
            />

            <Route
                path={ROUTES.RESET_PASSWORD}
                element={<ResetPasswordPage />}
            />
        </Routes>
    );
}

export default AppRoutes;