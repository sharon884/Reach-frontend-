import Button from "@/components/atoms/Button/Button";
import OtpInput from "@/components/molecules/OtpInput/OtpInput";
import AuthTemplate from "@/components/templates/AuthTemplate";

import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";

function VerifyOtpPage() {
    const {
        otp,
        email,
        otpError,
        isVerifying,
        resendCooldown,
        handleOtpChange,
        handleSubmit,
        handleResendOtp,
    } = useVerifyOtp();

    return (
        <AuthTemplate
            title="Verify your email"
            description={
                <>
                    Enter the 6-digit verification code sent to{" "}
                    <span className="font-medium text-reach-plum">
                        {email}
                    </span>
                </>
            }
            backLink={{
                label: "← Back to Reach",
                to: "/",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <OtpInput
                    value={otp}
                    error={otpError}
                    onChange={handleOtpChange}
                />

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className="text-xs font-medium text-reach-plum disabled:cursor-not-allowed disabled:text-reach-text/30"
                    >
                        {resendCooldown > 0
                            ? `Resend OTP in ${resendCooldown}s`
                            : "Resend OTP"}
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    loading={isVerifying}
                >
                    Verify email →
                </Button>
            </form>
        </AuthTemplate>
    );
}

export default VerifyOtpPage;