import { api } from "../api";

export interface AdminUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    createdAt: string;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface GetUsersResponse {
    users: AdminUser[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}


export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}


// Fetch users 
export async function getUsers(
    params?: GetUsersParams,
): Promise<GetUsersResponse> {
    const response = await api.get<ApiResponse<GetUsersResponse>>(
        "admin/users",
        { params },
    );

    return response.data.data;
}




// Update user status 


export interface UpdateUserStatusRequest {
    status: "ACTIVE" | "BLOCKED";
}

export async function updateUserStatus(
    userId: string,
    data: UpdateUserStatusRequest,
): Promise<AdminUser> {
   const response = await api.patch<ApiResponse<AdminUser>>(
    `admin/users/${userId}/status`,
    data,
);

return response.data.data;
}