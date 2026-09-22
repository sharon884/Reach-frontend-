import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import { useAppDispatch } from "@/store/hooks";

import { updateProperty, removeProperty } from "../../store/categoryConfigurationSlice";
import PropertyOptions from "./PropertyOptions";
import type { ConfigureDynamicPropertyDto } from "../../types/categoryConfiguration.types";

interface PropertyEditorProps {
    property: ConfigureDynamicPropertyDto;
    index: number;
}

const PROPERTY_DATA_TYPES = [
    { value: "TEXT", label: "Text" },
    { value: "LONG_TEXT", label: "Long Text" },
    { value: "NUMBER", label: "Number" },
    { value: "BOOLEAN", label: "Boolean" },
    { value: "DATE", label: "Date" },
    { value: "SELECT", label: "Select" },
    { value: "MULTI_SELECT", label: "Multi Select" },
] as const;

function PropertyEditor({
    property,
    index,
}: PropertyEditorProps) {
    const dispatch = useAppDispatch();

    const updateField = (
        changes: Partial<ConfigureDynamicPropertyDto>,
    ) => {
        dispatch(
            updateProperty({
                index,
                property: {
                    ...property,
                    ...changes,
                },
            }),
        );
    };



    const handleRemove = () => {
        dispatch(removeProperty(index));
    };

    return (
        <div className="rounded-xl border border-reach-plum/10 bg-white p-5">
            <div className="mb-5">
                <h3 className="text-sm font-semibold text-reach-text">
                    Property {index + 1}
                </h3>

                <p className="mt-1 text-xs text-reach-text/60">
                    Configure the property details and behavior.
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-2 block text-xs font-medium text-reach-text">
                        Name
                    </label>

                    <Input
                        value={property.name ?? ""}
                        onChange={(event) =>
                            updateField({
                                name: event.target.value,
                            })
                        }
                        placeholder="Property name"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-reach-text">
                        Slug
                    </label>

                    <Input
                        value={property.slug ?? ""}
                        onChange={(event) =>
                            updateField({
                                slug: event.target.value,
                            })
                        }
                        placeholder="property-slug"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-reach-text">
                        Description
                    </label>

                    <Textarea
                        value={property.description ?? ""}
                        onChange={(event) =>
                            updateField({
                                description:
                                    event.target.value || null,
                            })
                        }
                        placeholder="Describe this property"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-reach-text">
                        Data Type
                    </label>

                    <Select
                        value={property.dataType}
                        onChange={(event) =>
                            updateField({
                                dataType:
                                    event.target.value as ConfigureDynamicPropertyDto["dataType"],
                            })
                        }
                    >
                        {PROPERTY_DATA_TYPES.map((type) => (
                            <option
                                key={type.value}
                                value={type.value}
                            >
                                {type.label}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 text-xs text-reach-text">
                        <input
                            type="checkbox"
                            checked={property.required}
                            onChange={(event) =>
                                updateField({
                                    required:
                                        event.target.checked,
                                })
                            }
                        />

                        Required
                    </label>

                    <label className="flex items-center gap-2 text-xs text-reach-text">
                        <input
                            type="checkbox"
                            checked={property.filterable}
                            onChange={(event) =>
                                updateField({
                                    filterable:
                                        event.target.checked,
                                })
                            }
                        />

                        Filterable
                    </label>

                    <label className="flex items-center gap-2 text-xs text-reach-text">
                        <input
                            type="checkbox"
                            checked={property.sortable}
                            onChange={(event) =>
                                updateField({
                                    sortable:
                                        event.target.checked,
                                })
                            }
                        />

                        Sortable
                    </label>

                    {(
                        property.dataType === "SELECT" ||
                        property.dataType === "MULTI_SELECT"
                    ) && (
                            <PropertyOptions
                                property={property}
                                propertyIndex={index}
                            />
                        )}<div className="mt-5 flex justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleRemove}
                        >
                            Remove Property
                        </Button>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default PropertyEditor;