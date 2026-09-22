import { useCreateCategoryConfigurationDraft } from "@/features/admin/catalog/category-configuration/hooks/useCreateCategoryConfigurationDraft";

import { Button } from "@/components/atoms";

function CategoryConfigurationsPage() {
    const {
        handleCreateDraft,
        isLoading,
        isError,
    } = useCreateCategoryConfigurationDraft();

    return (
        <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
                <div>

                    <h1 className="text-2xl font-semibold text-reach-text">
                        Category Configurations
                    </h1>


                    <p className="mt-1 text-sm text-reach-text/60">
                        Create and manage category configurations.
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={handleCreateDraft}
                    loading={isLoading}
                >
                    + Create Category Configuration
                </Button>
            </div>

            {isError && (
                <p className="text-sm text-red-600">
                    Failed to create category configuration.
                </p>
            )}

            <div className="rounded-xl bg-reach-card p-8">
                <p className="text-sm text-reach-text/60">
                    No category configurations to display yet.
                </p>
            </div>
        </div>
    );
}

export default CategoryConfigurationsPage;