import { Outlet } from "react-router-dom";

import AdminSidebar from "@/features/admin/layout/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-reach-beige">
            <AdminSidebar />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}