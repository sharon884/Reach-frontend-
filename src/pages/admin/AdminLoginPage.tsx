import { useState } from "react";
import FormField from "../../components/molecules/FormField";
import PasswordField from "../../components/molecules/PasswordField";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/auth/login.schema";
import { adminLogin } from "../../services/admin/auth.service";
import Button from "../../components/atoms/Button";
import axios from "axios";

function AdminLoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));

        setLoginError("");
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        setLoginError("");

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

        try {
            setIsLoggingIn(true);

            await adminLogin({
                email: formData.email,
                password: formData.password,
            });

            navigate("/admin/users");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setLoginError(
                    error.response?.data?.message ||
                    "Unable to login. Please try again.",
                );
            } else {
                setLoginError("Unable to login. Please try again.");
            }
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-reach-beige text-reach-text flex flex-col">
            {/* Header */}
            <header className="px-6 py-6 md:px-10">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-2xl font-semibold tracking-tight text-reach-plum"
                >
                    Reach
                </button>
            </header>

            {/* Main */}
            <main className="flex flex-1 items-center justify-center px-6 py-10">
                <div className="w-full max-w-md">
                    <div className="rounded-3xl bg-reach-card p-7 shadow-sm md:p-9">
                        {/* Heading */}
                        <div className="mb-8 text-center">
                            <p className="mb-2 text-sm font-medium text-reach-plum">
                                Admin Portal
                            </p>

                            <h1 className="text-3xl font-semibold tracking-tight">
                                Welcome back
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Sign in to manage the Reach platform.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
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
                                className="rounded-xl border-gray-200 px-4 py-3 text-sm"
                            />

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <PasswordField
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    error={formErrors.password}
                                    className="rounded-xl border-gray-200 px-4 py-3 pr-12 text-sm"
                                />
                            </div>

                            {/* Login Error */}
                            {loginError && (
                                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {loginError}
                                </div>
                            )}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn
                                    ? "Logging in..."
                                    : "Log in"}
                            </Button>
                        </form>

                        {/* Back */}
                        <div className="mt-7 text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="text-sm text-gray-600 transition hover:text-reach-plum"
                            >
                                ← Back to Reach
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-6 text-center text-xs text-gray-500">
                <p>
                    By continuing, you agree to the Reach Terms of
                    Service and Privacy Policy.
                </p>
            </footer>
        </div>
    );
}

export default AdminLoginPage;