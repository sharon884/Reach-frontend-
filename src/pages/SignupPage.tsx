import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import FormField from "@/components/molecules/FormField/FormField";
import PasswordField from "@/components/molecules/PasswordField/PasswordField";
import PasswordRequirements from "@/components/molecules/PasswordRequirements/PasswordRequirements";
import GoogleSignInButton from "@/components/molecules/GoogleSignInButton/GoogleSignInButton";
import AuthTemplate from "@/components/templates/AuthTemplate";

import { useSignup } from "@/features/auth/hooks/useSignup";

function SignupPage() {
    const {
        formData,
        errors,
        isSigningUp,
        isGoogleSigningUp,
        passwordRequirements,
        handleChange,
        handleSubmit,
        handleGoogleCredential,
    } = useSignup();

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
                            requirements={passwordRequirements}
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

                {errors.signup && (
                    <p className="text-xs text-red-600">
                        {errors.signup}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={
                        isSigningUp ||
                        isGoogleSigningUp
                    }
                >
                    {isSigningUp
                        ? "Creating account..."
                        : "Create account →"}
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
                    onCredential={handleGoogleCredential}
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