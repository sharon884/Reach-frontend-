import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import PasswordField from "@/components/molecules/PasswordField/PasswordField";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

function ResetPasswordPage() {
    const {
        newPassword,
        formErrors,
        isResetting,
        handlePasswordChange,
        handleSubmit,
    } = useResetPassword();

    return (
        <AuthTemplate
            title="Create a new password"
            description={
                <>
                    Choose a new password for your Reach account.
                    <br />
                    Make sure it is at least 8 characters long.
                </>
            }
            backLink={{
                label: "← Back to Login",
                to: "/login",
            }}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <PasswordField
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                    error={formErrors.newPassword}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isResetting}
                >
                    Reset Password →
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

export default ResetPasswordPage;