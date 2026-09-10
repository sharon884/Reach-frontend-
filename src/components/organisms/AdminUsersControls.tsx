interface AdminUsersControlsProps {
    search: string;
    sortBy:
        | "fullName"
        | "email"
        | "role"
        | "status"
        | "createdAt";
    sortOrder: "asc" | "desc";

    onSearchChange: (value: string) => void;
    onSortChange: (
        value:
            | "fullName"
            | "email"
            | "role"
            | "status"
            | "createdAt",
    ) => void;
    onSortOrderChange: (value: "asc" | "desc") => void;
}

export default function AdminUsersControls({
    search,
    sortBy,
    sortOrder,
    onSearchChange,
    onSortChange,
    onSortOrderChange,
}: AdminUsersControlsProps) {
    return (
        <div className="mb-6 flex gap-4">
            <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(event) => {
                    onSearchChange(event.target.value);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-reach-plum"
            />

            <select
                value={sortBy}
                onChange={(event) => {
                    onSortChange(
                        event.target.value as
                            | "fullName"
                            | "email"
                            | "role"
                            | "status"
                            | "createdAt",
                    );
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-reach-plum"
            >
                <option value="createdAt">Created Date</option>
                <option value="fullName">Name</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
            </select>

            <button
                onClick={() => {
                    onSortOrderChange(
                        sortOrder === "asc" ? "desc" : "asc",
                    );
                }}
                className="rounded-lg bg-reach-plum px-4 py-2 text-white"
            >
                {sortOrder === "asc"
                    ? "Ascending"
                    : "Descending"}
            </button>
        </div>
    );
}