import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/atoms/Button";
import FormField from "../components/molecules/FormField";
import PasswordField from "../components/molecules/PasswordField";
import { loginSchema } from "../schemas/auth/login.schema";
import { login } from "../services/auth/auth.service";

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
        <div className="min-h-screen bg-reach-surface">
            <main className="px-5 py-10 md:py-16">
                <div className="mx-auto max-w-md">
                    {/* Heading */}
                    <div className="text-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-reach-plum"
                        >
                            Reach
                        </Link>

                        <h1 className="mt-5 text-2xl font-bold text-reach-text md:text-3xl">
                            Welcome back
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-reach-text/60">
                            Sign in to discover what your community needs —
                            <br />
                            and what you can offer.
                        </p>
                    </div>

                    {/* Login card */}
                    <div className="mt-8 rounded-2xl border border-reach-plum/10 bg-reach-card p-6 shadow-sm md:p-8">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                        >
                            {/* Email */}
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                error={formErrors.email}
                            />

                            {/* Password */}
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

                            {/* Login error */}
                            {loginError && (
                                <p className="text-xs text-red-600">
                                    {loginError}
                                </p>
                            )}

                            {/* Login button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn
                                    ? "Logging in..."
                                    : "Log in →"}
                            </Button>

                            {/* Signup */}
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
                    </div>

                    {/* Back */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-[10px] text-reach-text/60 transition hover:text-reach-plum"
                        >
                            ← Back to Reach
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-reach-plum/10 bg-reach-card">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-[9px] text-reach-text/50 md:px-8">
                    <p>© 2026 Reach. All rights reserved.</p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="transition hover:text-reach-plum"
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-reach-plum"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;