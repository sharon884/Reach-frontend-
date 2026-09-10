import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {signup} from "../services/auth/auth.service";
import Button from "../components/atoms/Button";
import FormField from "../components/molecules/FormField";
import PasswordField from "../components/molecules/PasswordField";
import PasswordRequirements from "../components/molecules/PasswordRequirements";
import { signupSchema } from "../schemas/auth/signup.schema";
import AuthTemplate from "../components/templates/AuthTemplate";

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


    return (
    <AuthTemplate
        title="Create your Reach account"
        description="Join the neighborhood network built around sharing, helping, and real-world community action."
        backLink={{
            label: "← Back to Reach",
            to: "/",
        }}
    >
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <FormField
                label="Full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.fullName}
            />

            <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
            />

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
                    error={errors.password}
                />

                <PasswordRequirements
                    requirements={passwordRequirements}
                />
            </div>

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
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                />
            </div>

            <div>
                <label className="flex items-start gap-2 text-xs text-reach-text/70">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="mt-0.5"
                    />

                    <span>
                        I agree to the{" "}
                        <a
                            href="#"
                            className="font-medium text-reach-plum hover:underline"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="font-medium text-reach-plum hover:underline"
                        >
                            Privacy Policy
                        </a>
                    </span>
                </label>

                {errors.termsAccepted && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.termsAccepted}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
            >
                Create account →
            </Button>

            <p className="text-center text-[10px] text-reach-text/50">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-reach-plum hover:underline"
                >
                    Log in
                </Link>
            </p>
        </form>
    </AuthTemplate>
);
}

export default SignupPage;