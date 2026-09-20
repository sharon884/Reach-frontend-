import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import SortableCoreField from "./SortableCoreField";

import {
    CORE_FIELD_DEFINITIONS,
} from "../../types/coreFieldDefinitions";

import type {
    CoreFieldKey,
} from "../../types/categoryConfiguration.types";

import {
    useConfigureCoreFieldsMutation,
} from "../../services/categoryConfigurationApi";

import {
    selectCoreFields,
} from "../../store/categoryConfigurationSelectors";

import {
    hydrateFromDraft,
    setCoreFields,
} from "../../store/categoryConfigurationSlice";

function CoreFields() {
    const { draftId } = useParams<{
        draftId: string;
    }>();

    const dispatch = useAppDispatch();

    const coreFields = useAppSelector(
        selectCoreFields,
    );

    const [
        configureCoreFields,
        {
            isLoading: isSaving,
            isError: isSaveError,
        },
    ] = useConfigureCoreFieldsMutation();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const enabledFields = coreFields
        .filter((field) => field.isEnabled)
        .sort(
            (first, second) =>
                first.displayOrder -
                second.displayOrder,
        );

    const disabledFields = CORE_FIELD_DEFINITIONS.filter(
        (definition) =>
            !coreFields.some(
                (field) =>
                    field.fieldKey ===
                        definition.key &&
                    field.isEnabled,
            ),
    );

    const handleEnabledChange = (
        fieldKey: CoreFieldKey,
        isEnabled: boolean,
    ) => {
        const existingField = coreFields.find(
            (field) => field.fieldKey === fieldKey,
        );

        if (existingField) {
            dispatch(
                setCoreFields(
                    coreFields.map((field) =>
                        field.fieldKey === fieldKey
                            ? {
                                  ...field,
                                  isEnabled,
                                  required:
                                      isEnabled
                                          ? field.required
                                          : false,
                              }
                            : field,
                    ),
                ),
            );

            return;
        }

        if (!isEnabled) {
            return;
        }

        dispatch(
            setCoreFields([
                ...coreFields,
                {
                    fieldKey,
                    required: false,
                    isEnabled: true,
                    displayOrder:
                        enabledFields.length,
                },
            ]),
        );
    };

    const handleRequiredChange = (
        fieldKey: CoreFieldKey,
        required: boolean,
    ) => {
        dispatch(
            setCoreFields(
                coreFields.map((field) =>
                    field.fieldKey === fieldKey
                        ? {
                              ...field,
                              required,
                          }
                        : field,
                ),
            ),
        );
    };

    const handleDragEnd = (
        event: DragEndEvent,
    ) => {
        const {
            active,
            over,
        } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = enabledFields.findIndex(
            (field) =>
                field.fieldKey === active.id,
        );

        const newIndex = enabledFields.findIndex(
            (field) =>
                field.fieldKey === over.id,
        );

        if (
            oldIndex === -1 ||
            newIndex === -1
        ) {
            return;
        }

        const reorderedFields = arrayMove(
            enabledFields,
            oldIndex,
            newIndex,
        );

        const reorderedWithDisplayOrder =
            reorderedFields.map(
                (field, index) => ({
                    ...field,
                    displayOrder: index,
                }),
            );

        const disabledConfigurations =
            coreFields.filter(
                (field) => !field.isEnabled,
            );

        dispatch(
            setCoreFields([
                ...reorderedWithDisplayOrder,
                ...disabledConfigurations,
            ]),
        );
    };

    const handleSave = async () => {
        if (!draftId) {
            return;
        }

        try {
            const updatedDraft =
                await configureCoreFields({
                    draftId,
                    body: {
                        coreFields,
                    },
                }).unwrap();

            dispatch(
                hydrateFromDraft(updatedDraft),
            );
        } catch {
            /*
             * RTK Query exposes the error through
             * isSaveError. No local error state
             * is required.
             */
        }
    };

    return (
        <section className="rounded-2xl border border-reach-plum/10 bg-reach-card p-6">
            <div className="mb-6">
                <h2 className="text-base font-semibold text-reach-text">
                    Core Fields
                </h2>

                <p className="mt-1 text-xs text-reach-text/60">
                    Configure the standard fields available
                    for this category.
                </p>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="space-y-3">
                    {enabledFields.length > 0 && (
                        <SortableContext
                            items={enabledFields.map(
                                (field) =>
                                    field.fieldKey,
                            )}
                            strategy={
                                verticalListSortingStrategy
                            }
                        >
                            {enabledFields.map(
                                (field) => {
                                    const definition =
                                        CORE_FIELD_DEFINITIONS.find(
                                            (item) =>
                                                item.key ===
                                                field.fieldKey,
                                        );

                                    if (!definition) {
                                        return null;
                                    }

                                    return (
                                        <SortableCoreField
                                            key={
                                                field.fieldKey
                                            }
                                            field={field}
                                            label={
                                                definition.label
                                            }
                                            onEnabledChange={
                                                handleEnabledChange
                                            }
                                            onRequiredChange={
                                                handleRequiredChange
                                            }
                                        />
                                    );
                                },
                            )}
                        </SortableContext>
                    )}

                    {disabledFields.map(
                        (definition) => {
                            const field =
                                coreFields.find(
                                    (item) =>
                                        item.fieldKey ===
                                        definition.key,
                                );

                            const isRequired =
                                field?.required ??
                                false;

                            return (
                                <div
                                    key={
                                        definition.key
                                    }
                                    className="flex items-center justify-between rounded-xl border border-reach-plum/10 bg-white p-4"
                                >
                                    <span className="text-sm font-medium text-reach-text">
                                        {
                                            definition.label
                                        }
                                    </span>

                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-2 text-xs text-reach-text">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    false
                                                }
                                                onChange={(
                                                    event,
                                                ) =>
                                                    handleEnabledChange(
                                                        definition.key,
                                                        event
                                                            .target
                                                            .checked,
                                                    )
                                                }
                                            />

                                            Enabled
                                        </label>

                                        <label className="flex items-center gap-2 text-xs text-reach-text">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    isRequired
                                                }
                                                disabled
                                            />

                                            Required
                                        </label>
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </DndContext>

            {isSaveError && (
                <p className="mt-4 text-xs text-red-600">
                    Failed to save core fields.
                </p>
            )}

            <div className="mt-6 flex justify-end">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving
                        ? "Saving..."
                        : "Save Changes"}
                </Button>
            </div>
        </section>
    );
}

export default CoreFields;