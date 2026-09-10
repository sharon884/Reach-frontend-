import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className = "", ...props }: InputProps) {
    const baseStyles =
        "w-full rounded-lg border border-reach-plum/15 bg-white px-3 py-3 text-xs text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50";

    return (
        <input
            className={`${baseStyles} ${className}`}
            {...props}
        />
    );
}

export default Input;