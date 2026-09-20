import { useState } from "react";
import { useParams } from "react-router-dom";

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

import Button from "@/components/atoms/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
    useConfigureDynamicPropertiesMutation,
} from "../../services/categoryConfigurationApi";

import {
    selectProperties,
} from "../../store/categoryConfigurationSelectors";

import {
    hydrateFromDraft,
    setProperties,
} from "../../store/categoryConfigurationSlice";

import { validateDynamicProperties } from "../../validation/dynamicPropertyValidation";

import SortableProperty from "./SortableProperty";

function DynamicProperties() {
    const dispatch = useAppDispatch();

    const { draftId } = useParams<{
        draftId: string;
    }>();

    const properties = useAppSelector(selectProperties);

    const [
        configureDynamicProperties,
        {
            isLoading: isSaving,
            isError: isSaveError,
        },
    ] = useConfigureDynamicPropertiesMutation();

    const [validationErrors, setValidationErrors] =
        useState<string[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const handleAddProperty = () => {
        dispatch(
            setProperties([
                ...properties,
                {
                    name: "",
                    slug: "",
                    description: null,
                    dataType: "TEXT",
                    validationConfig: null,
                    required: false,
                    filterable: false,
                    sortable: false,
                    displayOrder: properties.length,
                },
            ]),
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {
            active,
            over,
        } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = properties.findIndex(
            (_, index) =>
                `property-${index}` === active.id,
        );

        const newIndex = properties.findIndex(
            (_, index) =>
                `property-${index}` === over.id,
        );

        if (
            oldIndex === -1 ||
            newIndex === -1
        ) {
            return;
        }

        const reorderedProperties = arrayMove(
            properties,
            oldIndex,
            newIndex,
        );

        const reorderedWithDisplayOrder =
            reorderedProperties.map(
                (property, index) => ({
                    ...property,
                    displayOrder: index,
                }),
            );

        dispatch(
            setProperties(
                reorderedWithDisplayOrder,
            ),
        );
    };

    const handleSave = async () => {
        if (!draftId) {
            return;
        }

        const errors =
            validateDynamicProperties(
                properties,
            );

        setValidationErrors(errors);

        if (errors.length > 0) {
            return;
        }

        try {
            const updatedDraft =
                await configureDynamicProperties({
                    draftId,
                    body: {
                        properties,
                    },
                }).unwrap();

            dispatch(
                hydrateFromDraft(
                    updatedDraft,
                ),
            );

            setValidationErrors([]);
        } catch {
            /*
             * RTK Query exposes the API error
             * through isSaveError.
             */
        }
    };

    return (
        <section className="rounded-2xl border border-reach-plum/10 bg-reach-card p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-base font-semibold text-reach-text">
                        Dynamic Properties
                    </h2>

                    <p className="mt-1 text-xs text-reach-text/60">
                        Configure additional properties for this category.
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={handleAddProperty}
                >
                    Add Property
                </Button>
            </div>

            {validationErrors.length > 0 && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
                    <ul className="space-y-1 text-xs text-red-600">
                        {validationErrors.map(
                            (error, index) => (
                                <li
                                    key={`${error}-${index}`}
                                >
                                    {error}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            )}

            {properties.length === 0 ? (
                <div className="rounded-xl border border-dashed border-reach-plum/15 bg-white p-6 text-center">
                    <p className="text-sm text-reach-text/60">
                        No dynamic properties configured yet.
                    </p>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={properties.map(
                            (_, index) =>
                                `property-${index}`,
                        )}
                        strategy={
                            verticalListSortingStrategy
                        }
                    >
                        <div className="space-y-3">
                            {properties.map(
                                (
                                    property,
                                    index,
                                ) => (
                                    <SortableProperty
                                        key={`property-${index}`}
                                        property={
                                            property
                                        }
                                        index={
                                            index
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            {isSaveError && (
                <p className="mt-4 text-xs text-red-600">
                    Failed to save dynamic properties.
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

export default DynamicProperties;