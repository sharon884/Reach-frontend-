function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-reach-beige px-6 py-6 md:px-8">
            {/* Header */}
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-reach-plum/60">
                    Management Portal
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-reach-text">
                    Overview
                </h1>

                <p className="mt-1 text-sm text-reach-text/60">
                    Monitor platform activity and pending actions.
                </p>
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-reach-plum/10 bg-reach-card p-5">
                    <p className="text-xs text-reach-text/60">
                        Total Users
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-reach-plum">
                        24,592
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        +4.2% this month
                    </p>
                </div>

                <div className="rounded-xl border border-reach-plum/10 bg-reach-card p-5">
                    <p className="text-xs text-reach-text/60">
                        Active Users
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-reach-plum">
                        18,204
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        +3.8% this month
                    </p>
                </div>

                <div className="rounded-xl border border-reach-plum/10 bg-reach-card p-5">
                    <p className="text-xs text-reach-text/60">
                        Total Posts
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-reach-plum">
                        142.5k
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        +12.4% this month
                    </p>
                </div>

                <div className="rounded-xl border border-reach-plum/10 bg-reach-card p-5">
                    <p className="text-xs text-reach-text/60">
                        Pending Reviews
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-reach-plum">
                        48
                    </p>

                    <p className="mt-1 text-xs text-amber-600">
                        Requires attention
                    </p>
                </div>
            </div>

            {/* Activity + Actions */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Recent Activity */}
                <section className="rounded-xl border border-reach-plum/10 bg-reach-card xl:col-span-2">
                    <div className="flex items-center justify-between border-b border-reach-plum/10 px-5 py-4">
                        <div>
                            <h2 className="text-sm font-semibold text-reach-text">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-xs text-reach-text/50">
                                Latest activity across the platform
                            </p>
                        </div>

                        <span className="text-xs text-reach-plum">
                            View all
                        </span>
                    </div>

                    <div className="divide-y divide-reach-plum/10">
                        <div className="px-5 py-4">
                            <p className="text-sm text-reach-text">
                                New user registration completed.
                            </p>

                            <p className="mt-1 text-xs text-reach-text/50">
                                12 minutes ago
                            </p>
                        </div>

                        <div className="px-5 py-4">
                            <p className="text-sm text-reach-text">
                                A new category configuration draft was created.
                            </p>

                            <p className="mt-1 text-xs text-reach-text/50">
                                35 minutes ago
                            </p>
                        </div>

                        <div className="px-5 py-4">
                            <p className="text-sm text-reach-text">
                                User account status was updated.
                            </p>

                            <p className="mt-1 text-xs text-reach-text/50">
                                1 hour ago
                            </p>
                        </div>

                        <div className="px-5 py-4">
                            <p className="text-sm text-reach-text">
                                New offer post submitted for review.
                            </p>

                            <p className="mt-1 text-xs text-reach-text/50">
                                2 hours ago
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pending Actions */}
                <section className="rounded-xl border border-reach-plum/10 bg-reach-card">
                    <div className="border-b border-reach-plum/10 px-5 py-4">
                        <h2 className="text-sm font-semibold text-reach-text">
                            Pending Actions
                        </h2>

                        <p className="mt-1 text-xs text-reach-text/50">
                            Items requiring attention
                        </p>
                    </div>

                    <div className="space-y-3 p-5">
                        <div className="rounded-lg border border-reach-plum/10 bg-reach-beige/40 p-4">
                            <p className="text-xs font-semibold text-reach-plum">
                                USER VERIFICATION
                            </p>

                            <p className="mt-2 text-sm text-reach-text">
                                8 verification requests are waiting for review.
                            </p>

                            <p className="mt-2 text-[11px] text-reach-text/50">
                                2 hours ago
                            </p>
                        </div>

                        <div className="rounded-lg border border-reach-plum/10 bg-reach-beige/40 p-4">
                            <p className="text-xs font-semibold text-reach-plum">
                                CATEGORY CONFIGURATION
                            </p>

                            <p className="mt-2 text-sm text-reach-text">
                                3 category drafts are ready for review.
                            </p>

                            <p className="mt-2 text-[11px] text-reach-text/50">
                                4 hours ago
                            </p>
                        </div>

                        <div className="rounded-lg border border-reach-plum/10 bg-reach-beige/40 p-4">
                            <p className="text-xs font-semibold text-reach-plum">
                                REPORTS
                            </p>

                            <p className="mt-2 text-sm text-reach-text">
                                5 reported posts require moderation.
                            </p>

                            <p className="mt-2 text-[11px] text-reach-text/50">
                                1 day ago
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminDashboardPage;