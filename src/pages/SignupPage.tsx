import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {signup} from "../services/auth/auth.service";
import Button from "../components/atoms/Button";
import FormField from "../components/molecules/FormField";
import PasswordField from "../components/molecules/PasswordField";
import PasswordRequirements from "../components/molecules/PasswordRequirements";
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
                            <FormField
                                label="Full name"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="e.g. Jane Doe"
                                error={errors.fullName}
                            />

                            {/* Email */}
                            <FormField
                                label="Email address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jane@example.com"
                                error={errors.email}
                            />

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-xs font-medium text-reach-text"
                                >
                                    Password
                                </label>

                                <PasswordField
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="py-2.5 text-sm"
                                    error={errors.password}
                                />

                                {formData.password.length > 0 &&
                                    !isPasswordValid && (
                                        <PasswordRequirements
                                            requirements={passwordRequirements}
                                        />
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

                                <PasswordField
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="py-2.5 text-sm"
                                    error={errors.confirmPassword}
                                />
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
                                        I agree to{" "}
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