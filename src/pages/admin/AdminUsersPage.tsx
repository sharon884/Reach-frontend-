import { useAdminUsers } from "@/features/admin/users/hooks/useAdminUsers";

import AdminUsersTable from "@/features/admin/users/components/AdminUsersTable/AdminUsersTable";

import AdminUsersControls from "@/features/admin/users/components/AdminUsersControls/AdminUsersControls";

import AdminPagination from "@/features/admin/users/components/AdminPagination/AdminPagination";

import { Spinner } from "@/components/atoms";

export default function AdminUsersPage() {
    const {
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
    } = useAdminUsers();

    
if (loading) {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <Spinner label="Loading..." />
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

            <AdminUsersTable
                users={users}
                updatingUserId={updatingUserId}
                onStatusChange={handleStatusChange}
            />

            <AdminPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}