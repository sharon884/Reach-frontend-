import { Routes, Route } from "react-router-dom";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<div>Admin Login</div>} />
            <Route path="users" element={<div>Admin Users</div>} />
        </Routes>
    );
}

export default AdminRoutes;