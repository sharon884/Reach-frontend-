interface AdminPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function AdminPagination({
    page,
    totalPages,
    onPageChange,
}: AdminPaginationProps) {
    return (
        <div className="mt-6 flex items-center gap-4">
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span className="text-reach-text">
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}