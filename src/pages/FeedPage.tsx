import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth/auth.service";

function FeedPage() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="min-h-screen bg-reach-surface">
            {/* Header */}
            <header className="border-b border-reach-text/10 bg-reach-card">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                    <h1 className="text-xl font-bold text-reach-text">
                        REACH
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-reach-text/20 px-4 py-2 text-sm font-medium text-reach-text hover:bg-reach-text/5"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Feed */}
            <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 lg:grid-cols-[180px_minmax(0,1fr)_240px]">

                {/* Left Sidebar */}
                <aside className="hidden lg:block">
                    <div className="rounded-xl bg-reach-card p-4">
                        <h2 className="mb-5 text-lg font-bold text-reach-text">
                            REACH
                        </h2>

                        <nav className="space-y-2 text-sm">
                            <div className="rounded-lg bg-reach-primary/10 px-3 py-2">
                                Home
                            </div>

                            <div className="px-3 py-2">
                                Discover
                            </div>

                            <div className="px-3 py-2">
                                Saved
                            </div>

                            <div className="px-3 py-2">
                                Notifications
                            </div>

                            <div className="px-3 py-2">
                                Profile
                            </div>
                        </nav>

                        <button className="mt-6 w-full rounded-lg bg-reach-primary px-3 py-2 text-sm text-white">
                            + Create Post
                        </button>
                    </div>
                </aside>

                {/* Main Feed */}
                <section>
                    <h2 className="text-2xl font-bold text-reach-text">
                        Your Reach
                    </h2>

                    <p className="mt-1 text-sm text-reach-text/60">
                        Discover ways to help and connect with your community.
                    </p>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search for needs, offers..."
                        className="mt-5 w-full rounded-lg border border-reach-text/10 bg-reach-card px-4 py-3 text-sm outline-none"
                    />

                    {/* Filters */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {["All", "Nearby", "Needs", "Offers", "Urgent"].map(
                            (filter) => (
                                <button
                                    key={filter}
                                    className="rounded-full border border-reach-text/10 bg-reach-card px-4 py-2 text-xs"
                                >
                                    {filter}
                                </button>
                            ),
                        )}
                    </div>

                    {/* Create Post */}
                    <div className="mt-5 rounded-xl bg-reach-card p-4">
                        <p className="text-sm text-reach-text/60">
                            Share something that could help your community...
                        </p>

                        <button className="mt-4 rounded-lg bg-reach-primary px-4 py-2 text-sm text-white">
                            Create Post
                        </button>
                    </div>

                    {/* Temporary Post */}
                    <div className="mt-5 rounded-xl bg-reach-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-reach-primary/20" />

                            <div>
                                <p className="text-sm font-semibold">
                                    Community Member
                                </p>

                                <p className="text-xs text-reach-text/50">
                                    2 hours ago
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-reach-text">
                            Looking for someone who can help with a community
                            activity.
                        </p>

                        <div className="mt-4 flex gap-4 text-xs text-reach-text/60">
                            <button>♡ Appreciate</button>
                            <button>Comment</button>
                            <button>Save</button>
                        </div>
                    </div>

                    {/* Another Temporary Post */}
                    <div className="mt-4 rounded-xl bg-reach-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-reach-primary/20" />

                            <div>
                                <p className="text-sm font-semibold">
                                    Community Member
                                </p>

                                <p className="text-xs text-reach-text/50">
                                    5 hours ago
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-reach-text">
                            I can offer help with groceries and local
                            deliveries.
                        </p>

                        <div className="mt-4 flex gap-4 text-xs text-reach-text/60">
                            <button>♡ Appreciate</button>
                            <button>Comment</button>
                            <button>Save</button>
                        </div>
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="hidden lg:block">
                    <div className="rounded-xl bg-reach-card p-4">
                        <h3 className="font-semibold text-reach-text">
                            Nearby Opportunities
                        </h3>

                        <div className="mt-4 space-y-3">
                            <div className="rounded-lg bg-reach-surface p-3">
                                <p className="text-sm font-medium">
                                    Grocery Support
                                </p>

                                <p className="mt-1 text-xs text-reach-text/50">
                                    2 km away
                                </p>
                            </div>

                            <div className="rounded-lg bg-reach-surface p-3">
                                <p className="text-sm font-medium">
                                    Community Event
                                </p>

                                <p className="mt-1 text-xs text-reach-text/50">
                                    3 km away
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-reach-card p-4">
                        <h3 className="font-semibold text-reach-text">
                            Local Activity
                        </h3>

                        <p className="mt-3 text-xs text-reach-text/60">
                            Explore what is happening around your community.
                        </p>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default FeedPage;