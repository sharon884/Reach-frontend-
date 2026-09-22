import { useNavigate } from "react-router-dom";


import { notification } from "@/services/notification";

import {
    useCreateDraftMutation,
} from "@/features/admin/catalog/category-configuration/services/categoryConfigurationApi";

export function useCreateCategoryConfigurationDraft() {
    const navigate = useNavigate();

    const [
    createDraft,
    {
        isLoading,
    },
] = useCreateDraftMutation();

   async function handleCreateDraft() {
    try {
        const draft = await createDraft().unwrap();

        navigate(
            `/admin/catalog/category-configuration/${draft.draftId}`,
        );
    } catch (error) {
        console.error(
            "Failed to create category configuration:",
            error,
        );

        if (
            error &&
            typeof error === "object" &&
            "data" in error &&
            error.data &&
            typeof error.data === "object" &&
            "message" in error.data &&
            typeof error.data.message === "string"
        ) {
            notification.error(error.data.message);
            return;
        }

        notification.error(
            "Failed to create category configuration. Please try again.",
        );
    }
}
    return {
        handleCreateDraft,
        isLoading,
    };
}