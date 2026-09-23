import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";

import AdminUsersPage from "@/pages/admin/AdminUsersPage";

import CategoryConfigurationsPage from "@/pages/admin/CategoryConfigurationsPage";

import CategoryConfigurationPage from "@/pages/admin/CategoryConfigurationPage";

import AdminLayout from "@/features/admin/layout/AdminLayout";

import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

import { ROUTES } from "@/constants/routes";



function AdminRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTES.ADMIN.LOGIN}
                element={<AdminLoginPage />}
            />

            <Route path="/" element={<AdminLayout />}>
                <Route
                    path={ROUTES.ADMIN.USERS}
                    element={<AdminUsersPage />}
                />

                <Route
                    path={ROUTES.ADMIN.CATEGORY_CONFIGURATIONS}
                    element={<CategoryConfigurationsPage />}
                />

                <Route
                    path={ROUTES.ADMIN.CATEGORY_CONFIGURATION}
                    element={<CategoryConfigurationPage />}
                />

                <Route
                    path={ROUTES.ADMIN.DASHBOARD}
                    element={<AdminDashboardPage />}
                />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;