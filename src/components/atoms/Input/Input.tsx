import {
    forwardRef,
    type InputHTMLAttributes,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input(
        {
            className = "",
            ...props
        },
        ref,
    ) {
        const baseStyles =
            "w-full rounded-lg border border-reach-plum/15 bg-white px-3 py-3 text-xs text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50";

        return (
            <input
                ref={ref}
                className={`${baseStyles} ${className}`}
                {...props}
            />
        );
    },
);

export default Input;