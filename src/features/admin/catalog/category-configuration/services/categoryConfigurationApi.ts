import { baseApi } from "@/services/baseApi";
import type {
    Category,
    CategoryConfigurationDraftDto,
    ConfigureCoreFieldsDto,
    UpdateCategoryDraftDto,
    ConfigureDynamicPropertiesDto,
    PublishCategoryConfigurationDto,
} from "../types/categoryConfiguration.types";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const categoryConfigurationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: "/admin/catalog/categories",
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<Category[]>) =>
                response.data,
        }),


        getDraft: builder.query<
            CategoryConfigurationDraftDto,
            string
        >({
            query: (draftId) => ({
                url: `/admin/catalog/category-configurations/drafts/${draftId}`,
                method: "GET",
            }),
            transformResponse: (
                response: ApiResponse<CategoryConfigurationDraftDto>,
            ) => response.data,
        }),



        updateCategory: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: UpdateCategoryDraftDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/admin/catalog/category-configurations/drafts/${draftId}/category`,
                method: "PATCH",
                body,
            }),
            transformResponse: (
                response: ApiResponse<CategoryConfigurationDraftDto>,
            ) => response.data,
        }),



        configureCoreFields: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: ConfigureCoreFieldsDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/admin/catalog/category-configurations/drafts/${draftId}/core-fields`,
                method: "PATCH",
                body,
            }),
            transformResponse: (
                response: ApiResponse<CategoryConfigurationDraftDto>,
            ) => response.data,
        }),



        configureDynamicProperties: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: ConfigureDynamicPropertiesDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/admin/catalog/category-configurations/drafts/${draftId}/properties`,
                method: "PATCH",
                body,
            }),
            transformResponse: (
                response: ApiResponse<CategoryConfigurationDraftDto>,
            ) => response.data,
        }),



        publishConfiguration: builder.mutation<
            null,
            PublishCategoryConfigurationDto
        >({
            query: ({ draftId }) => ({
                url: `/admin/catalog/category-configurations/drafts/${draftId}/publish`,
                method: "POST",
            }),
        }),


    }),
});




export const {
    useGetCategoriesQuery,
    useGetDraftQuery,
    useUpdateCategoryMutation,
    useConfigureCoreFieldsMutation,
    useConfigureDynamicPropertiesMutation,
    usePublishConfigurationMutation,
} = categoryConfigurationApi;