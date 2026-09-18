import { api } from "@/services/api";

import type {
    AdminUser,
    GetUsersParams,
    GetUsersResponse,
    UpdateUserStatusRequest,
} from "@/features/admin/users/types/user.types";


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