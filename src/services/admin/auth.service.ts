import { api } from "../api";


// Admin Login 

export interface AdminLoginRequest {
    email: string;
    password: string;
}


export async function adminLogin(
    data: AdminLoginRequest,
): Promise<void> {
    await api.post("admin/login", data);
}



// Admin Logout
export async function adminLogout(): Promise<void> {
    await api.post("admin/logout");
}