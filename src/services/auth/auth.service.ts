import { api } from "../api";


//Signup 
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



// OTP 
export interface VerifyOtpRequest {
    userId: string;
    otp: string;
}

export async function verifyOtp(
    data: VerifyOtpRequest,
): Promise<void> {
    await api.post("/auth/verify-otp", data);
}


//Resend OTP 
export interface ResendOtpRequest {
    userId: string;
}

export async function resendOtp(
    data: ResendOtpRequest,
): Promise<void> {
    await api.post("/auth/resend-otp", data);
}



//Login
export interface LoginRequest {
    email: string;
    password: string;
}

export async function login(
    data: LoginRequest,
): Promise<void> {
    await api.post("/auth/login", data);
}