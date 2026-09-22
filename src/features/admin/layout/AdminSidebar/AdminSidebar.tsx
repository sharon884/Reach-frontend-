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

    const navItems = [
        {
            label: "Dashboard",
            to: "/admin/dashboard",
        },
        {
            label: "Users",
            to: "/admin/users",
        },
        {
            label: "Category Configurations",
            to: "/admin/catalog/category-configurations",
        },
    ];

    return (
       <aside className="sticky top-0 z-20 flex h-screen w-64 shrink-0 flex-col border-r border-reach-plum/10 bg-reach-card">
            {/* Brand */}
            <div className="border-b border-reach-plum/10 px-6 py-6">
                <p className="text-xl font-bold tracking-tight text-reach-plum">
                    Reach
                </p>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-reach-text/45">
                    Management Portal
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-reach-text/40">
                    Main
                </p>

                <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                                    isActive
                                        ? "bg-reach-plum text-white shadow-sm"
                                        : "text-reach-text/70 hover:bg-reach-beige hover:text-reach-plum",
                                ].join(" ")
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-reach-plum/10 p-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-reach-text/70 transition hover:bg-reach-beige hover:text-reach-plum"
                >
                    Log out
                </button>
            </div>
        </aside>
    );
}