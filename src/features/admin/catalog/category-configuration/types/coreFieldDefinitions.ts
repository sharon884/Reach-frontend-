import type { CoreFieldKey } from "./categoryConfiguration.types";

export interface CoreFieldDefinition {
    key: CoreFieldKey;
    label: string;
}

export const CORE_FIELD_DEFINITIONS: CoreFieldDefinition[] = [
    {
        key: "TITLE",
        label: "Title",
    },
    {
        key: "DESCRIPTION",
        label: "Description",
    },
    {
        key: "IMAGES",
        label: "Images",
    },
    {
        key: "LOCATION",
        label: "Location",
    },
    {
        key: "QUANTITY",
        label: "Quantity",
    },
    {
        key: "EXPIRY",
        label: "Expiry",
    },
];