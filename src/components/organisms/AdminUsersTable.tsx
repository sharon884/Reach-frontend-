import type { AdminUser } from "../../services/admin/user.service";

interface AdminUsersTableProps {
    users: AdminUser[];
    updatingUserId: string | null;
    onStatusChange: (
        userId: string,
        status: "ACTIVE" | "BLOCKED",
    ) => void;
}

export default function AdminUsersTable({
    users,
    updatingUserId,
    onStatusChange,
}: AdminUsersTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg bg-reach-card">
            <table className="w-full border-collapse">
                <thead className="bg-reach-beige">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            Name
                        </th>
                        <th className="px-4 py-3 text-left">
                            Email
                        </th>
                        <th className="px-4 py-3 text-left">
                            Role
                        </th>
                        <th className="px-4 py-3 text-left">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left">
                            Email Verified
                        </th>
                        <th className="px-4 py-3 text-left">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200"
                            >
                                <td className="px-4 py-3">
                                    {user.fullName}
                                </td>

                                <td className="px-4 py-3">
                                    {user.email}
                                </td>

                                <td className="px-4 py-3">
                                    {user.role}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            user.status ===
                                            "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {user.isEmailVerified
                                        ? "Yes"
                                        : "No"}
                                </td>

                                <td className="px-4 py-3">
                                    <button
                                        disabled={
                                            updatingUserId ===
                                            user.id
                                        }
                                        onClick={() =>
                                            onStatusChange(
                                                user.id,
                                                user.status ===
                                                    "ACTIVE"
                                                    ? "BLOCKED"
                                                    : "ACTIVE",
                                            )
                                        }
                                        className={`rounded-lg px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                                            user.status ===
                                            "ACTIVE"
                                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                        }`}
                                    >
                                        {updatingUserId ===
                                        user.id
                                            ? "Updating..."
                                            : user.status ===
                                                "ACTIVE"
                                              ? "Block"
                                              : "Unblock"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}