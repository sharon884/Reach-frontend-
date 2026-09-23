import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import OtpInput from "@/components/molecules/OtpInput/OtpInput";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { useVerifyPasswordResetOtp } from "@/features/auth/hooks/useVerifyPasswordResetOtp";

function VerifyPasswordResetOtpPage() {
    const {
        email,
        otp,
        formErrors,
        isVerifying,
        handleOtpChange,
        handleSubmit,
    } = useVerifyPasswordResetOtp();

    return (
        <AuthTemplate
            title="Verify your email"
            description={
                <>
                    Enter the 6-digit OTP sent to
                    <br />
                    <span className="font-medium text-reach-text">
                        {email}
                    </span>
                </>
            }
            backLink={{
                label: "← Back to Forgot Password",
                to: "/forgot-password",
            }}
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <OtpInput
                    value={otp}
                    onChange={(event) => handleOtpChange(event.target.value)}
                    error={formErrors.otp}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isVerifying}
                >
                    Verify OTP →
                </Button>

                <p className="text-center text-[10px] text-reach-text/50">
                    Enter the OTP sent to your email address.
                </p>

                <p className="text-center text-[10px] text-reach-text/50">
                    Need to start again?{" "}
                    <Link
                        to="/forgot-password"
                        className="font-medium text-reach-plum hover:underline"
                    >
                        Send a new OTP
                    </Link>
                </p>
            </form>
        </AuthTemplate>
    );
}

export default VerifyPasswordResetOtpPage;