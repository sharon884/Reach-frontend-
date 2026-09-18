import { baseApi } from "@/services/baseApi";
import type {
    CategoryConfigurationDraftDto,
    CreateCategoryConfigurationDraftDto,
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
    }),
});

export const {
    useCreateDraftMutation,
    useUpdateCategoryMutation,
} = categoryConfigurationApi;