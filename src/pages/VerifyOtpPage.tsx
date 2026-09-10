import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/atoms/Button";
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

            {/* OTP content */}
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
                            Verify your email
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-reach-text/60">
                            We sent a 6-digit verification code to
                            <span className="font-medium text-reach-text">
                                {email}
                            </span>
                        </p>
                    </div>

                    {/* OTP card */}
                    <div className="mt-8 rounded-2xl border border-reach-plum/10 bg-reach-card p-6 shadow-sm md:p-8">
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            {/* OTP input */}
                            <div>
                                <label
                                    htmlFor="otp"
                                    className="mb-2 block text-xs font-medium text-reach-text"
                                >
                                    Verification code
                                </label>

                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="w-full rounded-lg border border-reach-plum/15 bg-white px-3 py-3 text-center text-lg tracking-[0.4em] text-reach-text outline-none transition placeholder:text-xs placeholder:tracking-normal placeholder:text-reach-text/30 focus:border-reach-plum/50"
                                />
                                {otpError && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {otpError}
                                    </p>
                                )}
                            </div>

                            {/* Resend */}
                            <div className="text-center text-[10px] text-reach-text/50">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={resendCooldown > 0}
                                    className="font-medium text-reach-plum hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {resendCooldown > 0
                                        ? `Resend OTP in ${resendCooldown}s`
                                        : "Resend OTP"}
                                </button>
                            </div>

                            {/* Verify */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isVerifying}
                            >
                                {isVerifying ? "Verifying..." : "Verify email"}
                            </Button>
                        </form>

                        {/* Back to signup */}
                        <p className="mt-5 text-center text-[10px] text-reach-text/50">
                            <Link
                                to="/signup"
                                className="font-medium text-reach-plum hover:underline"
                            >
                                ← Back to signup
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default VerifyOtpPage;