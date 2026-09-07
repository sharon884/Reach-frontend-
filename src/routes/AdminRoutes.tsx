import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminLayout from "../components/layout/AdminLayout";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLoginPage />} />

            <Route path="/" element={<AdminLayout />}>
                <Route path="users" element={<AdminUsersPage />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;