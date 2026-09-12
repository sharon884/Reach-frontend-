import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/atoms/Button";
import FormField from "../components/molecules/FormField";
import PasswordField from "../components/molecules/PasswordField";
import { loginSchema } from "../schemas/auth/login.schema";
import { login } from "../services/auth/auth.service";
import AuthTemplate from "../components/templates/AuthTemplate";

function LoginPage() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

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

        setLoginError("");
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

                if (field === "email" || field === "password") {
                    errors[field] = issue.message;
                }
            });

            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        try {
            setIsLoggingIn(true);

            await login(result.data);

            navigate("/feed");
        } catch (error) {
            console.error("Login failed:", error);

            if (axios.isAxiosError(error)) {
                setLoginError(
                    error.response?.data?.message ||
                    "Unable to login. Please try again.",
                );
                return;
            }

            setLoginError("Something went wrong. Please try again.");
        } finally {
            setIsLoggingIn(false);
        }
    };

 return (
    <AuthTemplate
        title="Welcome back"
        description={
            <>
                Sign in to discover what your community needs —
                <br />
                and what you can offer.
            </>
        }
        backLink={{
            label: "← Back to Reach",
            to: "/",
        }}
    >
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >
            <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={formErrors.email}
            />

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="text-xs font-medium text-reach-text"
                    >
                        Password
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-[10px] font-medium text-reach-plum hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <PasswordField
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={formErrors.password}
                />
            </div>

            {loginError && (
                <p className="text-xs text-red-600">
                    {loginError}
                </p>
            )}

            <Button
                type="submit"
                className="w-full"
                disabled={isLoggingIn}
            >
                {isLoggingIn
                    ? "Logging in..."
                    : "Log in →"}
            </Button>

            <p className="text-center text-[10px] text-reach-text/50">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-medium text-reach-plum hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </form>
    </AuthTemplate>
);
}

export default LoginPage;