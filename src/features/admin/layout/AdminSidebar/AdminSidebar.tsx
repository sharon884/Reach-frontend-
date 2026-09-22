import { NavLink, useNavigate } from "react-router-dom";

import { adminLogout } from "@/features/admin/auth/services/auth.service";

import { notification } from "@/services/notification";



export default function AdminSidebar() {

    const navigate = useNavigate();


    async function handleLogout() {
        try {
            await adminLogout();
            navigate("/admin/login");
        } catch (error) {
            console.error(
                "Admin logout failed:",
                error,
            );

            if (
                error &&
                typeof error === "object" &&
                "data" in error &&
                error.data &&
                typeof error.data === "object" &&
                "message" in error.data &&
                typeof error.data.message === "string"
            ) {
                notification.error(error.data.message);
                return;
            }

            notification.error(
                "Failed to log out. Please try again.",
            );
        }
    }


    return (
        <aside className="flex h-screen w-64 flex-col bg-reach-card p-6">
            <h1 className="mb-8 text-2xl font-bold text-reach-plum">
                REACH
            </h1>

            <nav className="flex flex-col gap-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `rounded-lg px-4 py-3 ${isActive
                            ? "bg-reach-plum text-white"
                            : "text-reach-text hover:bg-reach-beige"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/catalog/category-configurations"
                    className={({ isActive }) =>
                        `rounded-lg px-4 py-3 ${isActive
                            ? "bg-reach-plum text-white"
                            : "text-reach-text hover:bg-reach-beige"
                        }`
                    }
                >
                    Category Configurations
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `rounded-lg px-4 py-3 ${isActive
                            ? "bg-reach-plum text-white"
                            : "text-reach-text hover:bg-reach-beige"
                        }`
                    }
                >
                    Users
                </NavLink>
            </nav>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-4 py-3 text-left text-reach-text hover:bg-reach-beige"
            >
                Logout
            </button>
        </aside>
    );
}