import type {
    // CategoryConfigurationPropertyDto,
    ConfigureCoreFieldDto,
    ConfigureDynamicPropertyDto,
} from "./categoryConfiguration.types";

export interface CategoryConfigurationEditorState {
    draftId: string | null;

    category: {
        name: string;
        description: string | null;
        parentId: string | null;
    };

    coreFields: ConfigureCoreFieldDto[];

    properties: ConfigureDynamicPropertyDto[];

    persistence: {
        dirtySections: {
            category: boolean;
            coreFields: boolean;
            properties: boolean;
        };

        saveStatus: "idle" | "saving" | "saved" | "error";

        lastSavedAt: string | null;
    };
}