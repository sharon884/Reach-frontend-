import { baseApi } from "@/services/baseApi";
import type {
    CategoryConfigurationDraftDto,
    ConfigureCoreFieldsDto,
    CreateCategoryConfigurationDraftDto,
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
                body: CreateCategoryConfigurationDraftDto;
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
    useGetDraftQuery,
    useUpdateCategoryMutation,
    useConfigureCoreFieldsMutation,
    useConfigureDynamicPropertiesMutation,
    usePublishConfigurationMutation,
} = categoryConfigurationApi;