import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import CategoryConfigurationPage from "@/pages/admin/CategoryConfigurationPage";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLoginPage />} />

            <Route path="/" element={<AdminLayout />}>
                <Route path="users" element={<AdminUsersPage />} />
            </Route>


             <Route
        path="catalog/category-configuration/:draftId"
        element={<CategoryConfigurationPage />}
    />
        </Routes>
    );
}

export default AdminRoutes; 