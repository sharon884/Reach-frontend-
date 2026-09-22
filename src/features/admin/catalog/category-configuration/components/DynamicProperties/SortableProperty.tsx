import {
    useSortable,
} from "@dnd-kit/sortable";

import {
    CSS,
} from "@dnd-kit/utilities";

import type {
    ConfigureDynamicPropertyDto,
} from "../../types/categoryConfiguration.types";

import PropertyEditor from "./PropertyEditor";

interface SortablePropertyProps {
    property: ConfigureDynamicPropertyDto;
    index: number;
}

function SortableProperty({
    property,
    index,
}: SortablePropertyProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `property-${index}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div className="mb-2 flex justify-end">
                <button
                    type="button"
                    {...listeners}
                    className="cursor-grab rounded-lg border border-reach-plum/10 bg-white px-3 py-1 text-xs text-reach-text/60 active:cursor-grabbing"
                >
                    Drag
                </button>
            </div>

            <PropertyEditor
                property={property}
                index={index}
            />
        </div>
    );
}

export default SortableProperty;