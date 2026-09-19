import type { RootState } from "@/store/index";

export const selectCategoryConfiguration = (state: RootState) =>
    state.categoryConfiguration;

export const selectCategory = (state: RootState) =>
    state.categoryConfiguration.category;

export const selectCoreFields = (state: RootState) =>
    state.categoryConfiguration.coreFields;

export const selectProperties = (state: RootState) =>
    state.categoryConfiguration.properties;

export const selectDraftId = (state: RootState) =>
    state.categoryConfiguration.draftId;

export const selectDirtySections = (state: RootState) =>
    state.categoryConfiguration.persistence.dirtySections;

export const selectSaveStatus = (state: RootState) =>
    state.categoryConfiguration.persistence.saveStatus;

export const selectLastSavedAt = (state: RootState) =>
    state.categoryConfiguration.persistence.lastSavedAt;