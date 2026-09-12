interface PasswordRequirement {
    label: string;
    valid: boolean;
}

interface PasswordRequirementsProps {
    requirements: PasswordRequirement[];
}

function PasswordRequirements({
    requirements,
}: PasswordRequirementsProps) {
    return (
        <div className="mt-3 space-y-1.5">
            {requirements.map((requirement) => (
                <div
                    key={requirement.label}
                    className={`flex items-center gap-2 text-[11px] ${
                        requirement.valid
                            ? "text-green-600"
                            : "text-red-500"
                    }`}
                >
                    <span aria-hidden="true">
                        {requirement.valid ? "✓" : "×"}
                    </span>

                    <span>{requirement.label}</span>
                </div>
            ))}
        </div>
    );
}

export default PasswordRequirements;