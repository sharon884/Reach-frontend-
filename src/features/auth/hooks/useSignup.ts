import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    signup,
    googleLogin,
} from "@/features/auth/services/auth.service";

import {
    signupSchema,
} from "@/features/auth/schemas/signup.schema";

import { notification } from "@/services/notification";

export function useSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [isSigningUp, setIsSigningUp] =
        useState(false);

    const [isGoogleSigningUp, setIsGoogleSigningUp] =
        useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        setErrors((previous) => {
            if (!previous[name]) {
                return previous;
            }

            const updatedErrors = {
                ...previous,
            };

            delete updatedErrors[name];

            return updatedErrors;
        });
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const result =
            signupSchema.safeParse(formData);

        if (!result.success) {
            const validationErrors:
                Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (
                    typeof field === "string" &&
                    !validationErrors[field]
                ) {
                    validationErrors[field] =
                        issue.message;
                }
            });

            setErrors(validationErrors);

            return;
        }

        setErrors({});

        try {
            setIsSigningUp(true);

            const response = await signup({
                fullName: result.data.fullName,
                email: result.data.email,
                password: result.data.password,
            });

            navigate("/verify-otp", {
                state: {
                    userId: response.id,
                    email: response.email,
                },
            });
        } catch (error) {
            console.error(
                "Signup failed:",
                error,
            );

            if (axios.isAxiosError(error)) {
                notification.error(
                    error.response?.data?.message ||
                        "Unable to create your account. Please try again.",
                );

                return;
            }

            notification.error(
                "Something went wrong. Please try again.",
            );
        } finally {
            setIsSigningUp(false);
        }
    };

    const handleGoogleCredential = async (
        credential: string,
    ) => {
        try {
            setIsGoogleSigningUp(true);
            setErrors({});

            await googleLogin({
                credential,
            });

            navigate("/feed");
        } catch (error) {
            console.error(
                "Google signup failed:",
                error,
            );

            if (axios.isAxiosError(error)) {
                notification.error(
                    error.response?.data?.message ||
                        "Unable to continue with Google. Please try again.",
                );

                return;
            }

            notification.error(
                "Something went wrong. Please try again.",
            );
        } finally {
            setIsGoogleSigningUp(false);
        }
    };

    const passwordRequirements = [
        {
            label: "At least 8 characters",
            valid: formData.password.length >= 8,
        },
        {
            label: "One uppercase letter",
            valid: /[A-Z]/.test(formData.password),
        },
        {
            label: "One lowercase letter",
            valid: /[a-z]/.test(formData.password),
        },
        {
            label: "One number",
            valid: /[0-9]/.test(formData.password),
        },
        {
            label: "One special character",
            valid: /[^A-Za-z0-9]/.test(
                formData.password,
            ),
        },
    ];

    return {
        formData,
        errors,
        isSigningUp,
        isGoogleSigningUp,
        passwordRequirements,
        handleChange,
        handleSubmit,
        handleGoogleCredential,
    };
}