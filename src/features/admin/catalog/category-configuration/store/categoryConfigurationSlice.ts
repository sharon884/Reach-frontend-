import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    CategoryConfigurationEditorState,
} from "../types/categoryConfigurationState.types";
import type {
    ConfigureCoreFieldDto,
    ConfigureDynamicPropertyDto,
} from "../types/categoryConfiguration.types";

import type { CategoryConfigurationDraftDto } from "../types/categoryConfiguration.types";

const initialState: CategoryConfigurationEditorState = {
    draftId: null,

    category: {
        name: "",
        description: null,
        parentId: null,
    },

    coreFields: [],

    properties: [],

    persistence: {
        dirtySections: {
            category: false,
            coreFields: false,
            properties: false,
        },

        saveStatus: "idle",

        lastSavedAt: null,
    },
};

const categoryConfigurationSlice = createSlice({
    name: "categoryConfiguration",

    initialState,

    reducers: {
        setDraftId(state, action: PayloadAction<string>) {
            state.draftId = action.payload;
        },

        setCategory(
            state,
            action: PayloadAction<CategoryConfigurationEditorState["category"]>,
        ) {
            state.category = action.payload;
            state.persistence.dirtySections.category = true;
            state.persistence.saveStatus = "idle";
        },

        setCoreFields(
            state,
            action: PayloadAction<ConfigureCoreFieldDto[]>,
        ) {
            state.coreFields = action.payload;
            state.persistence.dirtySections.coreFields = true;
            state.persistence.saveStatus = "idle";
        },

        setProperties(
            state,
            action: PayloadAction<ConfigureDynamicPropertyDto[]>,
        ) {
            state.properties = action.payload;
            state.persistence.dirtySections.properties = true;
            state.persistence.saveStatus = "idle";
        },

        markSectionClean(
            state,
            action: PayloadAction<
                keyof CategoryConfigurationEditorState["persistence"]["dirtySections"]
            >,
        ) {
            state.persistence.dirtySections[action.payload] = false;
        },

        markSaving(state) {
            state.persistence.saveStatus = "saving";
        },

        markSaved(state) {
            state.persistence.saveStatus = "saved";
            state.persistence.lastSavedAt = new Date().toISOString();
        },

        markSaveError(state) {
            state.persistence.saveStatus = "error";
        },

        resetCategoryConfiguration() {
            return initialState;
        },

        hydrateFromDraft(
    state,
    action: PayloadAction<CategoryConfigurationDraftDto>,
) {
    state.draftId = action.payload.draftId;

    state.category = {
        name: action.payload.category.name,
        description: action.payload.category.description,
        parentId: action.payload.category.parentId,
    };

    state.coreFields = action.payload.coreFields;
    state.properties = action.payload.properties;

    state.persistence.dirtySections = {
        category: false,
        coreFields: false,
        properties: false,
    };

    state.persistence.saveStatus = "saved";
    state.persistence.lastSavedAt = new Date().toISOString();
},
    },
});

export const {
    setDraftId,
    setCategory,
    setCoreFields,
    setProperties,
    markSectionClean,
    markSaving,
    markSaved,
    markSaveError,
    resetCategoryConfiguration,
    hydrateFromDraft,
} = categoryConfigurationSlice.actions;

export default categoryConfigurationSlice.reducer;