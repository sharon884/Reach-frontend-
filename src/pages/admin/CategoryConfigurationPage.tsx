import { useParams } from "react-router-dom";

import CategoryInformation   from "@/features/admin/catalog/category-configuration/components/CategoryInformation/CategoryInformation";
import CoreFields from "@/features/admin/catalog/category-configuration/components/CoreFields";
import { useCategoryConfigurationDraft } from "@/features/admin/catalog/category-configuration/hooks/useCategoryConfigurationDraft";
import DynamicProperties from "@/features/admin/catalog/category-configuration/components/DynamicProperties";

function CategoryConfigurationPage() {
    const { draftId } = useParams<{
        draftId: string;
    }>();

    const {
        isLoading,
        isError,
    } = useCategoryConfigurationDraft(
        draftId ?? null,
    );

    if (isLoading) {
        return (
            <div>
                Loading category configuration...
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                Failed to load category configuration.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-reach-text">
                    Category Configuration
                </h1>

                <p className="mt-1 text-sm text-reach-text/60">
                    Configure the category and its dynamic properties.
                </p>
            </div>

            <CategoryInformation />

            <CoreFields />

            <DynamicProperties />
        </div>
    );
}

export default CategoryConfigurationPage;