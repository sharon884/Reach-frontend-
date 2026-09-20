import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from "../../services/categoryConfigurationApi";

import {
    hydrateFromDraft,
} from "../../store/categoryConfigurationSlice";

import {
    selectCategory,
    selectSaveStatus,
} from "../../store/categoryConfigurationSelectors";

const categoryInformationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Category name is required"),

    description: z
        .string()
        .trim()
        .nullable(),

    parentId: z
        .string()
        .trim()
        .uuid("Invalid parent category ID")
        .nullable(),
});

type CategoryInformationFormValues = z.infer<
    typeof categoryInformationSchema
>;

function CategoryInformation() {
    const { draftId } = useParams<{
        draftId: string;
    }>();

    const dispatch = useAppDispatch();

    const category = useAppSelector(selectCategory);
    const saveStatus = useAppSelector(selectSaveStatus);

    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    } = useGetCategoriesQuery();

    const [
        updateCategory,
        {
            isLoading: isSaving,
            isError: isSaveError,
        },
    ] = useUpdateCategoryMutation();

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: {
            errors,
            isDirty,
        },
    } = useForm<CategoryInformationFormValues>({
        resolver: zodResolver(categoryInformationSchema),

        defaultValues: {
            name: category.name,
            description: category.description,
            parentId: category.parentId,
        },
    });

    /*
     * Redux is hydrated from the draft API.
     * Keep the form synchronized with the Redux category state.
     */
    useEffect(() => {
        reset({
            name: category.name,
            description: category.description,
            parentId: category.parentId,
        });
    }, [
        category.name,
        category.description,
        category.parentId,
        reset,
    ]);

    const onSubmit = async (
        values: CategoryInformationFormValues,
    ) => {
        if (!draftId) {
            return;
        }

        try {
            const updatedDraft =
                await updateCategory({
                    draftId,
                    body: {
                        name: values.name,
                        description: values.description,
                        parentId: values.parentId,
                    },
                }).unwrap();

            dispatch(
                hydrateFromDraft(updatedDraft),
            );

            reset({
                name: updatedDraft.category.name,
                description:
                    updatedDraft.category.description,
                parentId:
                    updatedDraft.category.parentId,
            });
        } catch {
            /*
             * RTK Query exposes the error through
             * isSaveError. No local error state is required.
             */
        }
    };

    return (
        <section className="rounded-2xl border border-reach-plum/10 bg-reach-card p-6">
            <div className="mb-6">
                <h2 className="text-base font-semibold text-reach-text">
                    Category Information
                </h2>

                <p className="mt-1 text-xs text-reach-text/60">
                    Configure the basic information for this category.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Category Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-medium text-reach-text"
                    >
                        Category Name
                    </label>

                    <Input
                        id="name"
                        placeholder="Enter category name"
                        {...register("name")}
                        className={
                            errors.name
                                ? "border-red-500"
                                : ""
                        }
                    />

                    {errors.name?.message && (
                        <p className="mt-2 text-xs text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-xs font-medium text-reach-text"
                    >
                        Description
                    </label>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                id="description"
                                rows={5}
                                placeholder="Describe this category..."
                                value={field.value ?? ""}
                                onChange={(event) => {
                                    field.onChange(
                                        event.target.value || null,
                                    );
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                className={
                                    errors.description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                        )}
                    />

                    {errors.description?.message && (
                        <p className="mt-2 text-xs text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Parent Category */}
                <div>
                    <label
                        htmlFor="parentId"
                        className="mb-2 block text-xs font-medium text-reach-text"
                    >
                        Parent Category
                    </label>

                    <Controller
                        name="parentId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                id="parentId"
                                value={field.value ?? ""}
                                onChange={(event) => {
                                    field.onChange(
                                        event.target.value || null,
                                    );
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                disabled={isCategoriesLoading}
                                className={
                                    errors.parentId
                                        ? "border-red-500"
                                        : ""
                                }
                            >
                                <option value="">
                                    {isCategoriesLoading
                                        ? "Loading categories..."
                                        : "No parent category"}
                                </option>

                                {categories?.map(
                                    (categoryOption) => (
                                        <option
                                            key={
                                                categoryOption.id
                                            }
                                            value={
                                                categoryOption.id
                                            }
                                        >
                                            {
                                                categoryOption.name
                                            }
                                        </option>
                                    ),
                                )}
                            </Select>
                        )}
                    />

                    {isCategoriesError && (
                        <p className="mt-2 text-xs text-red-600">
                            Failed to load parent categories.
                        </p>
                    )}

                    {errors.parentId?.message && (
                        <p className="mt-2 text-xs text-red-600">
                            {errors.parentId.message}
                        </p>
                    )}
                </div>

                {/* API Error */}
                {isSaveError && (
                    <p className="text-xs text-red-600">
                        Failed to save category information.
                    </p>
                )}

                {/* Save */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    {saveStatus === "saved" && !isDirty && (
                        <span className="text-xs text-green-600">
                            Saved
                        </span>
                    )}

                    <Button
                        type="submit"
                        disabled={
                            !isDirty ||
                            isSaving
                        }
                    >
                        {isSaving
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default CategoryInformation;