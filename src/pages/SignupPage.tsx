import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../services/auth/auth.service";
import Button from "../components/atoms/Button";
import { signupSchema } from "../schemas/auth/signup.schema";

function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((previous) => {
            if (!previous[name]) {
                return previous;
            }

            const updatedErrors = { ...previous };
            delete updatedErrors[name];

            return updatedErrors;
        });
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const result = signupSchema.safeParse(formData);

        if (!result.success) {
            const validationErrors: Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (
                    typeof field === "string" &&
                    !validationErrors[field]
                ) {
                    validationErrors[field] = issue.message;
                }
            });

            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
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
            console.error("Signup failed:", error);
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
            valid: /[^A-Za-z0-9]/.test(formData.password),
        },
    ];

    const isPasswordValid =
        formData.password.length > 0 &&
        passwordRequirements.every(
            (requirement) => requirement.valid,
        );

    return (
        <div className="min-h-screen bg-reach-surface">

            {/* Top bar */}
            <header className="border-b border-reach-plum/10 bg-reach-card">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 text-[10px] text-reach-text/50 md:px-8">
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
            </header>

            {/* Signup content */}
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
                            Create your Reach account
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-reach-text/60">
                            Join the neighborhood network built around
                            sharing, helping, and real-world community action.
                        </p>
                    </div>

                    {/* Form card */}
                    <div className="mt-8 rounded-2xl border border-reach-plum/10 bg-reach-card p-6 shadow-sm md:p-8">

                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                        >

                            {/* Full name */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-xs font-medium text-reach-text"
                                >
                                    Full name
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="e.g. Jane Doe"
                                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50 ${errors.fullName
                                        ? "border-red-400"
                                        : "border-reach-plum/15"
                                        }`}
                                />

                                {errors.fullName && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-medium text-reach-text"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jane@example.com"
                                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50 ${errors.email
                                        ? "border-red-400"
                                        : "border-reach-plum/15"
                                        }`}
                                />

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-xs font-medium text-reach-text"
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
                                        placeholder="Create a password"
                                        className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50 ${errors.password
                                            ? "border-red-400"
                                            : "border-reach-plum/15"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous,
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-reach-text/40 transition hover:text-reach-plum"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>

                                {/* Password requirements */}
                                {formData.password.length > 0 &&
                                    !isPasswordValid && (
                                        <div className="mt-3 space-y-1.5">
                                            {passwordRequirements.map(
                                                (requirement) => (
                                                    <div
                                                        key={requirement.label}
                                                        className={`flex items-center gap-2 text-[11px] ${requirement.valid
                                                            ? "text-green-600"
                                                            : "text-red-500"
                                                            }`}
                                                    >
                                                        {requirement.valid ? (
                                                            <Check size={13} />
                                                        ) : (
                                                            <X size={13} />
                                                        )}

                                                        <span>
                                                            {
                                                                requirement.label
                                                            }
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-xs font-medium text-reach-text"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50 ${errors.confirmPassword
                                            ? "border-red-400"
                                            : "border-reach-plum/15"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (previous) => !previous,
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-reach-text/40 transition hover:text-reach-plum"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide confirm password"
                                                : "Show confirm password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            <div>
                                <label className="flex items-start gap-2 text-[10px] leading-4 text-reach-text/60">
                                    <input
                                        id="termsAccepted"
                                        name="termsAccepted"
                                        type="checkbox"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        className="mt-0.5 accent-reach-plum"
                                    />

                                    <span>
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-reach-plum"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-reach-plum"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </label>

                                {errors.termsAccepted && (
                                    <p className="mt-1.5 text-xs text-red-600">
                                        {errors.termsAccepted}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                Create account
                            </Button>

                        </form>

                        {/* Login */}
                        <p className="mt-5 text-center text-[10px] text-reach-text/50">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-reach-plum hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>

                    {/* Back */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-xs text-reach-text/60 transition hover:text-reach-plum"
                        >
                            ← Back to Reach
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default SignupPage;