import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import FormField from "@/components/molecules/FormField/FormField";
import PasswordField from "@/components/molecules/PasswordField/PasswordField";
import GoogleSignInButton from "@/components/molecules/GoogleSignInButton/GoogleSignInButton";
import AuthTemplate from "@/components/templates/AuthTemplate";

import { useLogin } from "@/features/auth/hooks/useLogin";

function LoginPage() {
    const {
        formData,
        formErrors,
        isLoggingIn,
        isGoogleLoggingIn,
        loginError,
        handleChange,
        handleSubmit,
        handleGoogleCredential,
    } = useLogin();

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
                    disabled={
                        isLoggingIn ||
                        isGoogleLoggingIn
                    }
                >
                    {isLoggingIn
                        ? "Logging in..."
                        : "Log in →"}
                </Button>

                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-sm text-gray-500">
                        or
                    </span>

                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <GoogleSignInButton
                    onCredential={handleGoogleCredential}
                />

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