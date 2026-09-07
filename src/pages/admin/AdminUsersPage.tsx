import { useEffect, useState } from "react";

import {
    getUsers,
    updateUserStatus,
    type AdminUser,
} from "../../services/admin/user.service";
import AdminUsersTable from "../../components/admin/AdminUsersTable";
import AdminUsersControls from "../../components/admin/AdminUsersControls";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [sortBy, setSortBy] = useState<
        "fullName" | "email" | "role" | "status" | "createdAt"
    >("createdAt");

    const [sortOrder, setSortOrder] =
        useState<"asc" | "desc">("desc");


    const [error, setError] = useState("");
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
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
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [page, debouncedSearch, sortBy, sortOrder]);

    async function handleStatusChange(
        userId: string,
        status: "ACTIVE" | "BLOCKED",
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

    if (loading) {
        return (
            <div className="p-6">
                Loading users...
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold text-reach-text">
                Users
            </h1>

            <AdminUsersControls
                search={search}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSearchChange={(value) => {
                    setSearch(value);
                }}
                onSortChange={(value) => {
                    setSortBy(value);
                    setPage(1);
                }}
                onSortOrderChange={(value) => {
                    setSortOrder(value);
                    setPage(1);
                }}


            />
            {statusError && (
                <p className="mb-4 text-sm text-red-600">
                    {statusError}
                </p>
            )}
            {/* Users Table */}
            <AdminUsersTable
                users={users}
                updatingUserId={updatingUserId}
                onStatusChange={handleStatusChange}
            />

            {/* Pagination */}
            <div className="mt-6 flex items-center gap-4">
                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(
                            (current) =>
                                current - 1,
                        )
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-reach-text">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage(
                            (current) =>
                                current + 1,
                        )
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}