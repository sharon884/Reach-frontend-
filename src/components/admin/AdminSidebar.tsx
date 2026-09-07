import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout } from "../../services/admin/auth.service";

export default function AdminSidebar() {

    const navigate = useNavigate();


    async function handleLogout() {
        try {
            await adminLogout();
            navigate("/admin/login");
        } catch (error) {
            console.error("Admin logout failed:", error);
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