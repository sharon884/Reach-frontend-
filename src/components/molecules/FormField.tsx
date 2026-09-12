import Input from "../atoms/Input";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
    label,
    name,
    type = "text",
    value,
    placeholder,
    error,
    className = "",
    onChange,
}: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-xs font-medium text-reach-text"
            >
                {label}
            </label>

            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${className} ${
                    error
                        ? "border-red-500"
                        : ""
                }`}
            />

            {error && (
                <p className="mt-2 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;