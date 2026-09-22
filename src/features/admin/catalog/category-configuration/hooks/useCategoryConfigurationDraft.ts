import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
    hydrateFromDraft,
} from "@/features/admin/catalog/category-configuration/store/categoryConfigurationSlice";
import { useGetDraftQuery } from "@/features/admin/catalog/category-configuration/services/categoryConfigurationApi";

export function useCategoryConfigurationDraft(draftId: string | null) {
    const dispatch = useAppDispatch();

    const hasHydratedRef = useRef(false);

    const {
        data: draft,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetDraftQuery(draftId ?? "", {
        skip: !draftId,
    });

    useEffect(() => {
        if (!draft || hasHydratedRef.current) {
            return;
        }

        dispatch(hydrateFromDraft(draft));
        hasHydratedRef.current = true;
    }, [draft, dispatch]);

    return {
        draft,
        isLoading,
        isFetching,
        isError,
        error,
    };
}


