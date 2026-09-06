import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

function Button({
    variant = "primary",
    className = "",
    children,
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
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;