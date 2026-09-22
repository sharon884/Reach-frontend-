import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    loading?: boolean;
}

function Button({
    variant = "primary",
    loading = false,
    className = "",
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-full px-6 py-3 text-sm font-medium transition";

    const variantStyles = {
        primary:
            "bg-reach-plum text-white hover:opacity-90",

        secondary:
            "border border-reach-plum/30 bg-reach-card text-reach-plum hover:bg-white",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        aria-hidden="true"
                    />
                    <span>{children}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;