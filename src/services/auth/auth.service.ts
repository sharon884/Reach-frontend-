import { api } from "../api";

export interface SignupRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
}

export async function signup(
    data: SignupRequest,
): Promise<SignupResponse> {
    const response = await api.post<{
        success: boolean;
        message: string;
        data: SignupResponse;
    }>("/auth/signup", data);

    return response.data.data;
}