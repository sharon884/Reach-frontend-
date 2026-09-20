import {
    useSortable,
} from "@dnd-kit/sortable";

import {
    CSS,
} from "@dnd-kit/utilities";

import type {
    CoreFieldKey,
    ConfigureCoreFieldDto,
} from "../../types/categoryConfiguration.types";

interface SortableCoreFieldProps {
    field: ConfigureCoreFieldDto;
    label: string;
    onEnabledChange: (
        fieldKey: CoreFieldKey,
        isEnabled: boolean,
    ) => void;
    onRequiredChange: (
        fieldKey: CoreFieldKey,
        required: boolean,
    ) => void;
}

function SortableCoreField({
    field,
    label,
    onEnabledChange,
    onRequiredChange,
}: SortableCoreFieldProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: field.fieldKey,
    });

    const style = {
        transform: CSS.Transform.toString(
            transform,
        ),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between rounded-xl border border-reach-plum/10 bg-white p-4"
        >
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="cursor-grab touch-none text-reach-text/40 active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                    aria-label={`Reorder ${label}`}
                >
                    ⋮⋮
                </button>

                <span className="text-sm font-medium text-reach-text">
                    {label}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs text-reach-text">
                    <input
                        type="checkbox"
                        checked={field.isEnabled}
                        onChange={(event) =>
                            onEnabledChange(
                                field.fieldKey,
                                event.target.checked,
                            )
                        }
                    />

                    Enabled
                </label>

                <label className="flex items-center gap-2 text-xs text-reach-text">
                    <input
                        type="checkbox"
                        checked={field.required}
                        disabled={!field.isEnabled}
                        onChange={(event) =>
                            onRequiredChange(
                                field.fieldKey,
                                event.target.checked,
                            )
                        }
                    />

                    Required
                </label>
            </div>
        </div>
    );
}

export default SortableCoreField;