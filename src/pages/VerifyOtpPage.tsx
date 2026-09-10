import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/atoms/Button";
import OtpInput from "../components/molecules/OtpInput";
import AuthTemplate from "../components/templates/AuthTemplate";
import { verifyOtp, resendOtp } from "../services/auth/auth.service";
import { verifyOtpSchema } from "../schemas/auth/verify-otp.schema";

function VerifyOtpPage() {

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);



    const [resendCooldown, setResendCooldown] = useState(0);
    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);



    const location = useLocation();
    const navigate = useNavigate();

    const { userId, email } = location.state || {};


    useEffect(() => {
        if (!userId || !email) {
            navigate("/signup");
        }
    }, [userId, email, navigate]);



    const handleOtpChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
            setOtpError("");
        }
    };



    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        const result = verifyOtpSchema.safeParse({
            otp,
        });

        if (!result.success) {
            setOtpError(result.error.issues[0].message);
            return;
        }

        setOtpError("");

        try {

            setIsVerifying(true);

            await verifyOtp({
                userId,
                otp: result.data.otp,
            });

            navigate("/login");
        } catch (error) {
            console.error("OTP verification failed:", error);

            if (axios.isAxiosError(error)) {
                setOtpError(
                    error.response?.data?.message ||
                    "Unable to verify OTP. Please try again.",
                );
                return;
            }

            setOtpError("Something went wrong. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };


    const handleResendOtp = async () => {
        if (!userId || resendCooldown > 0) {
            return;
        }

        try {
            await resendOtp({
                userId,
            });

            setResendCooldown(60);
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        }
    };

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
                disabled={isVerifying}
            >
                {isVerifying
                    ? "Verifying..."
                    : "Verify email →"}
            </Button>
        </form>
    </AuthTemplate>
);
}

export default VerifyOtpPage;