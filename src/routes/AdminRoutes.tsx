import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLoginPage/>} />
            <Route path="users" element={<div>Admin Users</div>} />
        </Routes>
    );
}

export default AdminRoutes;