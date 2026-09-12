import Input from "../atoms/Input";

interface OtpInputProps {
    value: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function OtpInput({
    value,
    error,
    onChange,
}: OtpInputProps) {
    return (
        <div>
            <label
                htmlFor="otp"
                className="mb-2 block text-xs font-medium text-reach-text"
            >
                Verification code
            </label>

            <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={value}
                onChange={onChange}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="py-3 text-center text-lg tracking-[0.4em] placeholder:text-xs placeholder:tracking-normal"
            />

            {error && (
                <p className="mt-2 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default OtpInput;