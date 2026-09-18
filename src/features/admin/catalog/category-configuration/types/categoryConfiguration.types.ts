export interface CreateCategoryConfigurationDraftDto {
    name: string;
    description: string | null;
    parentId: string | null;
}

export interface CategoryConfigurationDraftDto {
    draftId: string;

    category: {
        name: string;
        description: string | null;
        parentId: string | null;
    };

    coreFields: CategoryConfigurationCoreFieldDto[];

    properties: CategoryConfigurationPropertyDto[];
}

export interface CategoryConfigurationCoreFieldDto {
    fieldKey: string;
    required: boolean;
    isEnabled: boolean;
    displayOrder: number;
}

export interface CategoryConfigurationPropertyDto {
    propertyId?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    dataType: string;
    validationConfig?: Record<string, unknown> | null;
    required: boolean;
    filterable: boolean;
    sortable: boolean;
    displayOrder: number;
    options?: CategoryConfigurationPropertyOptionDto[];
}

export interface CategoryConfigurationPropertyOptionDto {
    label: string;
    value: string;
    displayOrder: number;
}



export interface ConfigureCoreFieldsDto {
    coreFields: ConfigureCoreFieldDto[];
}

export interface ConfigureCoreFieldDto {
    fieldKey: string;
    required: boolean;
    isEnabled: boolean;
    displayOrder: number;
}