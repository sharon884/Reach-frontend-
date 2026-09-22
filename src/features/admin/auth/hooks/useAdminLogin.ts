import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { adminLogin } from "@/features/admin/auth/services/auth.service";

import { loginSchema } from "@/features/auth/schemas/login.schema";

import { notification } from "@/services/notification";

export function useAdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

   
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
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
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const errors: {
                email?: string;
                password?: string;
            } = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (
                    field === "email" ||
                    field === "password"
                ) {
                    errors[field] = issue.message;
                }
            });

            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        try {
            setIsLoggingIn(true);

            await adminLogin({
                email: result.data.email,
                password: result.data.password,
            });

            navigate("/admin/users");
      } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        notification.error(
            error.response?.data?.message ||
                "Unable to login. Please try again.",
        );

        return;
    }

    notification.error(
        "Unable to login. Please try again.",
    );
} finally {
            setIsLoggingIn(false);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return {
        formData,
        formErrors,
        isLoggingIn,
        handleChange,
        handleSubmit,
        handleBack,
    };
}