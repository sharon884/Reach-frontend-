import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    verifyPasswordResetOtp,
    type VerifyPasswordResetOtpRequest,
} from "@/features/auth/services/auth.service";
import { verifyPasswordResetOtpSchema } from "@/features/auth/schemas/verify-password-reset-otp.schema";

interface FormErrors {
    otp?: string;
}

interface LocationState {
    email?: string;
}

export function useVerifyPasswordResetOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = (location.state as LocationState | null) ?? {};

    const [otp, setOtp] = useState("");
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isVerifying, setIsVerifying] = useState(false);

    const handleOtpChange = (value: string) => {
        setOtp(value);
        setFormErrors({});
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!email) {
            navigate("/forgot-password");
            return;
        }

        const formData: VerifyPasswordResetOtpRequest = {
            email,
            otp,
        };

        const result = verifyPasswordResetOtpSchema.safeParse(formData);

        if (!result.success) {
            const errors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                if (issue.path[0] === "otp") {
                    errors.otp = issue.message;
                }
            });

            setFormErrors(errors);
            return;
        }

        try {
            setIsVerifying(true);
            setFormErrors({});

            const response = await verifyPasswordResetOtp(result.data);

            navigate("/reset-password", {
                state: {
                    resetToken: response.resetToken,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFormErrors({
                    otp:
                        error.response?.data?.message ||
                        "Invalid or expired OTP. Please try again.",
                });
            } else {
                setFormErrors({
                    otp: "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsVerifying(false);
        }
    };

    return {
        email,
        otp,
        formErrors,
        isVerifying,
        handleOtpChange,
        handleSubmit,
    };
}