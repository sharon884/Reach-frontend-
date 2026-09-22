import { useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import axios from "axios";

import {
    verifyOtp,
    resendOtp,
} from "@/features/auth/services/auth.service";

import {
    verifyOtpSchema,
} from "@/features/auth/schemas/verify-otp.schema";

export function useVerifyOtp() {

   
    const location = useLocation();
    const navigate = useNavigate();

    const { userId, email } = location.state || {};

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendCooldown((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    useEffect(() => {
        if (!userId || !email) {
            navigate("/signup");
        }
    }, [userId, email, navigate]);

    const handleOtpChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
            setOtpError("");
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        const result = verifyOtpSchema.safeParse({
            otp,
        });

        if (!result.success) {
            setOtpError(
                result.error.issues[0].message,
            );
            return;
        }

        setOtpError("");

        try {
            setIsVerifying(true);

            await verifyOtp({
                userId,
                otp: result.data.otp,
            });

            navigate("/login");
        } catch (error) {
            console.error(
                "OTP verification failed:",
                error,
            );

            if (axios.isAxiosError(error)) {
                setOtpError(
                    error.response?.data?.message ||
                    "Unable to verify OTP. Please try again.",
                );

                return;
            }

            setOtpError(
                "Something went wrong. Please try again.",
            );
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        if (!userId || resendCooldown > 0) {
            return;
        }

        try {
            await resendOtp({
                userId,
            });

            setResendCooldown(60);
        } catch (error) {
            console.error(
                "Failed to resend OTP:",
                error,
            );
        }
    };

    return {
        otp,
        email,
        otpError,
        isVerifying,
        resendCooldown,
        handleOtpChange,
        handleSubmit,
        handleResendOtp,
    };
}