import { Routes, Route } from "react-router-dom";

import AdminRoutes from "./AdminRoutes";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/verify-otp" element={<VerifyOtpPage/>}/>

            <Route path="/admin/*" element={<AdminRoutes />} />

        </Routes>
    );
}

export default AppRoutes;