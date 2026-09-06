import { Routes, Route } from "react-router-dom";

import AdminRoutes from "./AdminRoutes";
import LandingPage from "../pages/LandingPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/signup" element={<div>Signup</div>} />

            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
}

export default AppRoutes;