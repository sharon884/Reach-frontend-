import { useParams } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";
import { useCategoryConfigurationDraft } from "@/features/admin/catalog/category-configuration/hooks/useCategoryConfigurationDraft";
import { selectCategory } from "@/features/admin/catalog/category-configuration/store/categoryConfigurationSelectors";

function CategoryConfigurationPage() {
    const { draftId } = useParams<{ draftId: string }>();

    const {
        isLoading,
        isError,
    } = useCategoryConfigurationDraft(draftId ?? null);

    const category = useAppSelector(selectCategory);

    if (isLoading) {
        return <div>Loading category configuration...</div>;
    }

    if (isError) {
        return <div>Failed to load category configuration.</div>;
    }

    return (
        <div>
            <h1>Category Configuration</h1>

            <p>Draft ID: {draftId}</p>

            <p>
                Category Name: {category.name || "Unnamed"}
            </p>
        </div>
    );
}

export default CategoryConfigurationPage;