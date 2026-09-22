import { api } from "@/services/api";


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


//Logout
export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}


//Google  auth 
export interface GoogleLoginRequest {
    credential: string;
}

export async function googleLogin(
    data: GoogleLoginRequest,
): Promise<void> {
    await api.post("/auth/google", data);
}




// Forgot Password
export interface ForgotPasswordRequest {
    email: string;
}

export async function forgotPassword(
    data: ForgotPasswordRequest
): Promise<void> {
    await api.post("/auth/forgot-password", data);
}




// Verify Password Reset OTP
export interface VerifyPasswordResetOtpRequest {
    email: string;
    otp: string;
}


export interface VerifyPasswordResetOtpResponse {
    resetToken: string;
}

export async function verifyPasswordResetOtp(
    data: VerifyPasswordResetOtpRequest
): Promise<VerifyPasswordResetOtpResponse> {
    const response = await api.post<{
        success: boolean;
        message: string;
        data: VerifyPasswordResetOtpResponse;
    }>("/auth/verify-password-reset-otp", data);

    return response.data.data;
}



// Reset Password
export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
}

export async function resetPassword(
    data: ResetPasswordRequest
): Promise<void> {
    await api.post("/auth/reset-password", data);
}