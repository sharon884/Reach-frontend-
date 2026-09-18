import { baseApi } from "@/services/baseApi";
import type {
    CategoryConfigurationDraftDto,
    ConfigureCoreFieldsDto,
    CreateCategoryConfigurationDraftDto,
    ConfigureDynamicPropertiesDto,
    PublishCategoryConfigurationDto,
} from "../types/categoryConfiguration.types";

export const categoryConfigurationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDraft: builder.mutation<
            CategoryConfigurationDraftDto,
            CreateCategoryConfigurationDraftDto
        >({
            query: (body) => ({
                url: "/category-configurations/drafts",
                method: "POST",
                body,
            }),
        }),

        updateCategory: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: CreateCategoryConfigurationDraftDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/category-configurations/drafts/${draftId}/category`,
                method: "PATCH",
                body,
            }),
        }),


        configureCoreFields: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: ConfigureCoreFieldsDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/category-configurations/drafts/${draftId}/core-fields`,
                method: "PATCH",
                body,
            }),
        }),


        configureDynamicProperties: builder.mutation<
            CategoryConfigurationDraftDto,
            {
                draftId: string;
                body: ConfigureDynamicPropertiesDto;
            }
        >({
            query: ({ draftId, body }) => ({
                url: `/category-configurations/drafts/${draftId}/properties`,
                method: "PATCH",
                body,
            }),
        }),


        publishConfiguration: builder.mutation<
            null,
            PublishCategoryConfigurationDto
        >({
            query: ({ draftId }) => ({
                url: `/category-configurations/drafts/${draftId}/publish`,
                method: "POST",
            }),
        }),

        
    }),
});

export const {
    useCreateDraftMutation,
    useUpdateCategoryMutation,
} = categoryConfigurationApi;