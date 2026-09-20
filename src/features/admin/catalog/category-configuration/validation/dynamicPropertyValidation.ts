import type { ConfigureDynamicPropertyDto } from "../types/categoryConfiguration.types";

const OPTION_DATA_TYPES = new Set([
    "SELECT",
    "MULTI_SELECT",
]);

export function validateDynamicProperty(
    property: ConfigureDynamicPropertyDto,
): string[] {
    const errors: string[] = [];

    if (!property.name?.trim()) {
        errors.push("Property name is required.");
    }

    if (!property.slug?.trim()) {
        errors.push("Property slug is required.");
    }

    if (
        OPTION_DATA_TYPES.has(property.dataType) &&
        (!property.options || property.options.length === 0)
    ) {
        errors.push(
            `${property.dataType} property must have at least one option.`,
        );
    }

    if (
        !OPTION_DATA_TYPES.has(property.dataType) &&
        property.options &&
        property.options.length > 0
    ) {
        errors.push(
            "Options are not allowed for this property type.",
        );
    }

    const optionValues = new Set<string>();

    for (const option of property.options ?? []) {
        if (!option.label.trim()) {
            errors.push("Property option label is required.");
        }

        if (!option.value.trim()) {
            errors.push("Property option value is required.");
        }

        if (optionValues.has(option.value)) {
            errors.push(
                "Property option values must be unique.",
            );
        }

        optionValues.add(option.value);
    }

    return errors;
}


export function validateDynamicProperties(
    properties: ConfigureDynamicPropertyDto[],
): string[] {
    const errors: string[] = [];

    properties.forEach((property, index) => {
        const propertyErrors = validateDynamicProperty(property);

        propertyErrors.forEach((error) => {
            errors.push(`Property ${index + 1}: ${error}`);
        });
    });

    const propertyKeys = new Set<string>();

    properties.forEach((property, index) => {
        const key = property.propertyId
            ? `id:${property.propertyId}`
            : `slug:${property.slug?.trim().toLowerCase()}`;

        if (propertyKeys.has(key)) {
            errors.push(
                `Property ${index + 1}: Duplicate property configuration.`,
            );
        }

        propertyKeys.add(key);
    });

    return errors;
}