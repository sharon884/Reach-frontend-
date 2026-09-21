import { useNavigate } from "react-router-dom";

import {
    useCreateDraftMutation,
} from "@/features/admin/catalog/category-configuration/services/categoryConfigurationApi";

export function useCreateCategoryConfigurationDraft() {
    const navigate = useNavigate();

    const [
        createDraft,
        {
            isLoading,
            isError,
            error,
        },
    ] = useCreateDraftMutation();

    async function handleCreateDraft() {
        const draft = await createDraft().unwrap();

        navigate(
            `/admin/catalog/category-configuration/${draft.draftId}`,
        );
    }

    return {
        handleCreateDraft,
        isLoading,
        isError,
        error,
    };
}