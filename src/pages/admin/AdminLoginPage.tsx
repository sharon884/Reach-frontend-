import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/auth/login.schema";
import { adminLogin } from "../../services/admin/auth.service";
import Button from "../../components/common/Button";

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
    const [showPassword, setShowPassword] = useState(false);

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
        } catch (error: any) {
            setLoginError(
                error.response?.data?.message ||
                    "Unable to login. Please try again.",
            );
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
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-reach-plum ${
                                        formErrors.email
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }`}
                                />

                                {formErrors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-reach-plum ${
                                            formErrors.password
                                                ? "border-red-500"
                                                : "border-gray-200"
                                        }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev,
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-reach-plum"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {formErrors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {formErrors.password}
                                    </p>
                                )}
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