import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLoginPage/>} />
            <Route path="users" element={<AdminUsersPage/>} />
        </Routes>
    );
}

export default AdminRoutes;