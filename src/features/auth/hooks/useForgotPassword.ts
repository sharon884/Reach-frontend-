import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    forgotPassword,
    type ForgotPasswordRequest,
} from "@/features/auth/services/auth.service";
import { forgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";

interface FormErrors {
    email?: string;
}

export function useForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ForgotPasswordRequest>({
        email: "",
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setFormErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const result = forgotPasswordSchema.safeParse(formData);

        if (!result.success) {
            const errors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (field === "email") {
                    errors.email = issue.message;
                }
            });

            setFormErrors(errors);
            return;
        }

        try {
            setIsSubmitting(true);
            setFormErrors({});

            await forgotPassword(result.data);

            navigate("/verify-password-reset-otp", {
                state: {
                    email: result.data.email,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFormErrors({
                    email:
                        error.response?.data?.message ||
                        "Something went wrong. Please try again.",
                });
            } else {
                setFormErrors({
                    email: "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        formErrors,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}