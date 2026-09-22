import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import FormField from "@/components/molecules/FormField/FormField";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

function ForgotPasswordPage() {
    const {
        formData,
        formErrors,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useForgotPassword();

    return (
        <AuthTemplate
            title="Forgot your password?"
            description={
                <>
                    Enter your email address and we'll send you
                    <br />
                    an OTP to reset your password.
                </>
            }
            backLink={{ label: "← Back to Login", to: "/login" }}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={formErrors.email}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
                >
                    Send OTP →
                </Button>

                <p className="text-center text-[10px] text-reach-text/50">
                    Remember your password?{" "}
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

export default ForgotPasswordPage;