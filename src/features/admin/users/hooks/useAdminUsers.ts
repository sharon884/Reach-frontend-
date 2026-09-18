import { useEffect, useState } from "react";

import {
    getUsers,
    updateUserStatus,
} from "@/features/admin/users/services/user.service";

import type {
    AdminUser,
    AdminUserSortField,
    AdminUserStatus,
} from "@/features/admin/users/types/user.types";

export function useAdminUsers() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [sortBy, setSortBy] =
        useState<AdminUserSortField>("createdAt");

    const [sortOrder, setSortOrder] =
        useState<"asc" | "desc">("desc");

    const [updatingUserId, setUpdatingUserId] =
        useState<string | null>(null);

    const [statusError, setStatusError] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                setError("");

                const response = await getUsers({
                    page,
                    limit: 10,
                    search: debouncedSearch,
                    sortBy,
                    sortOrder,
                });

                setUsers(response.users);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error(
                    "Failed to fetch users:",
                    error,
                );

                setError(
                    "Failed to load users. Please try again.",
                );
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [page, debouncedSearch, sortBy, sortOrder]);

    async function handleStatusChange(
        userId: string,
        status: AdminUserStatus,
    ) {
        try {
            setStatusError("");
            setUpdatingUserId(userId);

            const updatedUser = await updateUserStatus(
                userId,
                { status },
            );

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? updatedUser
                        : user,
                ),
            );
        } catch (error) {
            console.error(
                "Failed to update user status:",
                error,
            );

            setStatusError(
                "Failed to update user status. Please try again.",
            );
        } finally {
            setUpdatingUserId(null);
        }
    }

    return {
        users,
        loading,
        error,
        page,
        totalPages,
        search,
        sortBy,
        sortOrder,
        updatingUserId,
        statusError,
        setPage,
        setSearch,
        setSortBy,
        setSortOrder,
        handleStatusChange,
    };
}