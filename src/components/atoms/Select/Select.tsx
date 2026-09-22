import {
    forwardRef,
    type SelectHTMLAttributes,
} from "react";

type SelectProps =
    SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<
    HTMLSelectElement,
    SelectProps
>(function Select(
    {
        className = "",
        children,
        ...props
    },
    ref,
) {
    const baseStyles =
        "w-full rounded-lg border border-reach-plum/15 bg-white px-3 py-3 text-xs text-reach-text outline-none transition focus:border-reach-plum/50";

    return (
        <select
            ref={ref}
            className={`${baseStyles} ${className}`}
            {...props}
        >
            {children}
        </select>
    );
});

export default Select;