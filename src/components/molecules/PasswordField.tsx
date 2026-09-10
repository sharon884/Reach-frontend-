import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "../atoms/Input";

interface PasswordFieldProps {
    name: string;
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({
    name,
    value,
    placeholder,
    error,
    onChange,
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="pr-10"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-reach-text/50 transition hover:text-reach-plum"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff size={14} />
                    ) : (
                        <Eye size={14} />
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default PasswordField;