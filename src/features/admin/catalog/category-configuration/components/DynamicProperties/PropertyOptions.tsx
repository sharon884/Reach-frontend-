import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useAppDispatch } from "@/store/hooks";

import {
    addPropertyOption,
    removePropertyOption,
    updatePropertyOption,
} from "@/features/admin/catalog/category-configuration/store/categoryConfigurationSlice";

import type {
    ConfigureDynamicPropertyDto,
    ConfigureDynamicPropertyOptionDto,
} from "../../types/categoryConfiguration.types";

interface PropertyOptionsProps {
    property: ConfigureDynamicPropertyDto;
    propertyIndex: number;
}

function PropertyOptions({
    property,
    propertyIndex,
}: PropertyOptionsProps) {
    const dispatch = useAppDispatch();

    const options = property.options ?? [];

    const handleAddOption = () => {
        const newOption: ConfigureDynamicPropertyOptionDto = {
            label: "",
            value: "",
            displayOrder: options.length,
        };

        dispatch(
            addPropertyOption({
                propertyIndex,
                option: newOption,
            }),
        );
    };

    const handleUpdateOption = (
        optionIndex: number,
        changes: Partial<ConfigureDynamicPropertyOptionDto>,
    ) => {
        const option = options[optionIndex];

        if (!option) {
            return;
        }

        dispatch(
            updatePropertyOption({
                propertyIndex,
                optionIndex,
                option: {
                    ...option,
                    ...changes,
                },
            }),
        );
    };

    const handleRemoveOption = (optionIndex: number) => {
        dispatch(
            removePropertyOption({
                propertyIndex,
                optionIndex,
            }),
        );
    };

    return (
        <div className="rounded-xl border border-reach-plum/10 bg-reach-card p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h4 className="text-sm font-medium text-reach-text">
                        Options
                    </h4>

                    <p className="mt-1 text-xs text-reach-text/60">
                        Define the available choices for this property.
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={handleAddOption}
                >
                    Add Option
                </Button>
            </div>

            {options.length === 0 ? (
                <div className="rounded-lg border border-dashed border-reach-plum/15 bg-white p-4 text-center">
                    <p className="text-xs text-reach-text/60">
                        No options added yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {options.map((option, optionIndex) => (
                        <div
                            key={`${propertyIndex}-${optionIndex}`}
                            className="grid grid-cols-[1fr_1fr_auto] items-end gap-3"
                        >
                            <div>
                                <label className="mb-2 block text-xs font-medium text-reach-text">
                                    Label
                                </label>

                                <Input
                                    value={option.label}
                                    onChange={(event) =>
                                        handleUpdateOption(
                                            optionIndex,
                                            {
                                                label: event.target.value,
                                            },
                                        )
                                    }
                                    placeholder="Option label"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-medium text-reach-text">
                                    Value
                                </label>

                                <Input
                                    value={option.value}
                                    onChange={(event) =>
                                        handleUpdateOption(
                                            optionIndex,
                                            {
                                                value: event.target.value,
                                            },
                                        )
                                    }
                                    placeholder="option-value"
                                />
                            </div>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    handleRemoveOption(optionIndex)
                                }
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PropertyOptions;