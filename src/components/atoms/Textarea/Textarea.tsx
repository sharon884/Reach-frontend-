import {
    forwardRef,
    type TextareaHTMLAttributes,
} from "react";

type TextareaProps =
    TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaProps
>(
    function Textarea(
        {
            className = "",
            ...props
        },
        ref,
    ) {
        const baseStyles =
            "w-full resize-y rounded-lg border border-reach-plum/15 bg-white px-3 py-3 text-xs text-reach-text outline-none transition placeholder:text-reach-text/30 focus:border-reach-plum/50";

        return (
            <textarea
                ref={ref}
                className={`${baseStyles} ${className}`}
                {...props}
            />
        );
    },
);

export default Textarea;