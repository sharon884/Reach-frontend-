import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    resetPassword,
    type ResetPasswordRequest,
} from "@/features/auth/services/auth.service";
import { resetPasswordSchema } from "@/features/auth/schemas/reset-password.schema";

interface FormErrors {
    newPassword?: string;
}

interface LocationState {
    resetToken?: string;
}

export function useResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const { resetToken } = (location.state as LocationState | null) ?? {};

    const [newPassword, setNewPassword] = useState("");
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isResetting, setIsResetting] = useState(false);

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(event.target.value);

        setFormErrors((previous) => ({
            ...previous,
            newPassword: undefined,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!resetToken) {
            navigate("/forgot-password");
            return;
        }

        const formData: ResetPasswordRequest = {
            resetToken,
            newPassword,
        };

        const result = resetPasswordSchema.safeParse(formData);

        if (!result.success) {
            const errors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                if (issue.path[0] === "newPassword") {
                    errors.newPassword = issue.message;
                }
            });

            setFormErrors(errors);
            return;
        }

        try {
            setIsResetting(true);
            setFormErrors({});

            await resetPassword(result.data);

            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFormErrors({
                    newPassword:
                        error.response?.data?.message ||
                        "Unable to reset password. Please try again.",
                });
            } else {
                setFormErrors({
                    newPassword:
                        "Unable to reset password. Please try again.",
                });
            }
        } finally {
            setIsResetting(false);
        }
    };

    return {
        newPassword,
        formErrors,
        isResetting,
        handlePasswordChange,
        handleSubmit,
    };
}