import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { signup, googleLogin } from "@/services/auth/auth.service";

import Button from "@/components/atoms/Button/Button";
import FormField from "@/components/molecules/FormField/FormField";
import PasswordField from "@/components/molecules/PasswordField/PasswordField";
import PasswordRequirements from "@/components/molecules/PasswordRequirements/PasswordRequirements";
import GoogleSignInButton from "@/components/molecules/GoogleSignInButton/GoogleSignInButton";

import { signupSchema } from "@/schemas/auth/signup.schema";

import AuthTemplate from "@/components/templates/AuthTemplate";


function SignupPage() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [isGoogleSigningUp, setIsGoogleSigningUp] =
        useState(false);

    const navigate = useNavigate();

    const [errors, setErrors] =
        useState<Record<string, string>>({});


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

                setErrors({
                    signup:
                        error.response?.data?.message ||
                        "Unable to create your account. Please try again.",
                });

                return;
            }


            setErrors({
                signup:
                    "Something went wrong. Please try again.",
            });

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

                setErrors({
                    google:
                        error.response?.data?.message ||
                        "Unable to continue with Google. Please try again.",
                });

                return;
            }


            setErrors({
                google:
                    "Something went wrong. Please try again.",
            });

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
            valid: /[A-Z]/.test(
                formData.password,
            ),
        },
        {
            label: "One lowercase letter",
            valid: /[a-z]/.test(
                formData.password,
            ),
        },
        {
            label: "One number",
            valid: /[0-9]/.test(
                formData.password,
            ),
        },
        {
            label: "One special character",
            valid: /[^A-Za-z0-9]/.test(
                formData.password,
            ),
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


                    {formData.password.length > 0 && (
                        <PasswordRequirements
                            requirements={
                                passwordRequirements
                            }
                        />
                    )}

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
                            checked={
                                formData.termsAccepted
                            }
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


                {errors.signup && (
                    <p className="text-xs text-red-600">
                        {errors.signup}
                    </p>
                )}


                <Button
                    type="submit"
                    className="w-full"
                    disabled={isGoogleSigningUp}
                >
                    Create account →
                </Button>


                <div className="flex items-center gap-3">

                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-sm text-gray-500">
                        or
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />

                </div>


                {errors.google && (
                    <p className="text-xs text-red-600">
                        {errors.google}
                    </p>
                )}


                <GoogleSignInButton
                    onCredential={
                        handleGoogleCredential
                    }
                />


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