import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import CategoryConfigurationsPage from "@/pages/admin/CategoryConfigurationsPage";
import CategoryConfigurationPage from "@/pages/admin/CategoryConfigurationPage";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";


function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLoginPage />} />

            <Route path="/" element={<AdminLayout />}>
                <Route path="users" element={<AdminUsersPage />} />

                <Route
                    path="catalog/category-configurations"
                    element={<CategoryConfigurationsPage />}
                />

                <Route
                    path="catalog/category-configuration/:draftId"
                    element={<CategoryConfigurationPage />}
                />

                <Route
                    path="dashboard"
                    element={<AdminDashboardPage />}
                />


            </Route>
        </Routes>
    );
}

export default AdminRoutes;
