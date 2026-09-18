export type AdminUserStatus = "ACTIVE" | "BLOCKED";

export type AdminUserSortField =
    | "fullName"
    | "email"
    | "role"
    | "status"
    | "createdAt";

export interface AdminUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: AdminUserStatus;
    isEmailVerified: boolean;
    createdAt: string;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: AdminUserSortField;
    sortOrder?: "asc" | "desc";
}

export interface GetUsersResponse {
    users: AdminUser[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}

export interface UpdateUserStatusRequest {
    status: AdminUserStatus;
}