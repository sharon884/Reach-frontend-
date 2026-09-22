import { useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/services/auth.service";
import { notification } from "@/services/notification";

const filters = [
    "All",
    "Nearby",
    "Needs",
    "Offers",
    "Urgent",
];

const posts = [
  {
    id: 1,
    type: 'NEED',
    category: 'Food',
    title: 'Looking for someone who can help with groceries',
    description: 'I need some basic groceries for my family this week. If anyone nearby can help, it would mean a lot.',
    location: '2 km away',
    time: '2 hours ago',
    author: 'Community Member',
    initials: 'CM',
    expiry: 'Expires in 2 days',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
},
{
  id: 2,
  type: 'NEED',
  category: 'Medical',
  title: 'Urgent assistance needed for elderly medication pickup',
  description: 'Looking for a kind neighbor to help pick up a refill prescription from the local pharmacy for my grandmother.',
  location: '1.5 km away',
  time: '30 mins ago',
  author: 'Sarah Jenkins',
  initials: 'SJ',
  expiry: 'Expires in 24 hours',
  image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
},
{
    id: 3,
    type: 'OFFER',
    category: 'Books',
    title: 'Books available for students',
    description: 'A few books are available for anyone who can make use of them. Students are welcome to reach out.',
    location: '4 km away',
    time: 'Yesterday',
    author: 'Community Member',
    initials: 'CM',
    expiry: 'Available this week',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
},
{
  id: 4,
  type: 'OFFER',
  category: 'Essentials',
  title: 'Groceries available for someone who needs them',
  description: 'I have some extra groceries available and would like to share them with someone nearby.',
  location: '3 km away',
  time: '5 hours ago',
  author: 'Community Member',
  initials: 'CM',
  expiry: 'Available today',
  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
},
{
    id: 5,
    type: 'OFFER',
    category: 'Technology',
    title: 'Refurbished laptop available for a student in need',
    description: 'I have a fully working, clean laptop that can be used for online classes and schoolwork. Happy to hand it over to a deserving student.',
    location: '5 km away',
    time: '3 hours ago',
    author: 'David Vance',
    initials: 'DV',
    expiry: 'Available this week',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    type: 'NEED',
    category: 'Furniture',
    title: 'Looking for a small study desk for home schooling',
    description: 'Our young child needs a small desk setup for virtual learning. If anyone has a spare one they are willing to part with, please let me know.',
    location: '3.5 km away',
    time: '4 hours ago',
    author: 'Elena Rostova',
    initials: 'ER',
    expiry: 'Expires in 5 days',
    image: 'https://plus.unsplash.com/premium_photo-1732721751509-d487d00373be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },

  {
    id: 7,
    type: 'OFFER',
    category: 'Clothing',
    title: 'Warm winter coats and jackets (Assorted Sizes)',
    description: 'Gently used high-quality winter coats and warm layers available for families preparing for the colder season.',
    location: '2.5 km away',
    time: '6 hours ago',
    author: 'Marcus Aurelius',
    initials: 'MA',
    expiry: 'Available for 3 days',
    image: 'https://plus.unsplash.com/premium_photo-1737370659011-3de25cbb6322?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    type: 'NEED',
    category: 'Baby Care',
    title: 'In need of toddler formula and diapers (Size 4)',
    description: 'Hit a tight spot this month and running low on supplies for our 18-month-old toddler. Any contribution or guidance helps immensely.',
    location: '1 km away',
    time: '1 hour ago',
    author: 'Jessica Taylor',
    initials: 'JT',
    expiry: 'Expires in 48 hours',
    image: 'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    type: 'OFFER',
    category: 'Home & Kitchen',
    title: 'Microwave oven and toaster in good working condition',
    description: 'We recently upgraded our kitchen appliances and would love to pass on our old microwave and toaster to a local family or individual.',
    location: '4.2 km away',
    time: '8 hours ago',
    author: 'Robert Chen',
    initials: 'RC',
    expiry: 'Available today',
    image: 'https://plus.unsplash.com/premium_photo-1719521337943-63ba843e9379?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    type: 'NEED',
    category: 'Pet Care',
    title: 'Looking for dog food donations for local rescue foster',
    description: 'Fostering two rescued pups right now and currently short on dry kibble. Appreciate any extra bags anyone can spare.',
    location: '3.1 km away',
    time: '7 hours ago',
    author: 'Amanda Clark',
    initials: 'AC',
    expiry: 'Expires in 3 days',
    image: 'https://plus.unsplash.com/premium_photo-1726761692986-6bcde87fc2b8?q=80&w=1401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    type: 'OFFER',
    category: 'Education',
    title: 'Free weekend math and science tutoring sessions',
    description: 'Retired high school teacher offering free weekend tutoring sessions for middle and high school students in the neighborhood.',
    location: '1.8 km away',
    time: '12 hours ago',
    author: 'Arthur Pendelton',
    initials: 'AP',
    expiry: 'Ongoing this month',
    image: 'https://plus.unsplash.com/premium_photo-1683121152928-787ececd7359?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    type: 'NEED',
    category: 'Transport',
    title: 'Ride share assistance for weekly physical therapy',
    description: 'Seeking someone driving near the downtown medical center on Tuesday mornings who could assist with a round-trip ride.',
    location: '6 km away',
    time: '9 hours ago',
    author: 'Nadia Hassan',
    initials: 'NH',
    expiry: 'Expires tomorrow',
    image: 'https://images.unsplash.com/photo-1695654401437-993ad6fc2658?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 13,
    type: 'OFFER',
    category: 'Gardening',
    title: 'Fresh organic homegrown tomatoes and herbs',
    description: 'Our backyard garden had an abundant harvest this season. I have bags of fresh cherry tomatoes and basil ready for pickup.',
    location: '2 km away',
    time: '2 hours ago',
    author: 'Liam O Connor',
    initials: 'LC',
    expiry: 'Available today',
    image: 'https://plus.unsplash.com/premium_photo-1661827989152-6306a475e618?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 14,
    type: 'NEED',
    category: 'Tools',
    title: 'Looking to borrow a ladder for minor roof gutter cleaning',
    description: 'Need an extension ladder for about two hours this weekend to clear out autumn leaves from our gutters. Will pick up and return safely.',
    location: '1.2 km away',
    time: '14 hours ago',
    author: 'Kevin Morales',
    initials: 'KM',
    expiry: 'Expires in 4 days',
    image: 'https://images.unsplash.com/photo-1711375164857-9910e8b8901a?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 15,
    type: 'OFFER',
    category: 'Art & Hobby',
    title: 'Assorted art supplies, sketchbooks, and paints',
    description: 'Lightly used acrylic paints, brushes, and thick paper pads available for budding artists or creative workshops.',
    location: '4.5 km away',
    time: '1 day ago',
    author: 'Sophia Martinez',
    initials: 'SM',
    expiry: 'Available this week',
    image: 'https://plus.unsplash.com/premium_photo-1664303307001-2354845b2159?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
];


function FeedPage() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);

            if (
                error &&
                typeof error === "object" &&
                "data" in error &&
                error.data &&
                typeof error.data === "object" &&
                "message" in error.data &&
                typeof error.data.message === "string"
            ) {
                notification.error(error.data.message);
                return;
            }

            notification.error(
                "Failed to log out. Please try again.",
            );
        }
    }

    return (
        <div className="min-h-screen bg-reach-surface text-reach-text">
            {/* Top Header */}
            <header className="sticky top-0 z-30 border-b border-reach-plum/10 bg-reach-card/95 backdrop-blur">
                <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-10">
                        <button
                            type="button"
                            onClick={() => navigate("/feed")}
                            className="text-2xl font-bold tracking-tight text-reach-plum"
                        >
                            REACH
                        </button>

                        <div className="hidden items-center gap-2 lg:flex">
                            <span className="rounded-full bg-reach-plum px-4 py-2 text-xs font-medium text-white">
                                Community
                            </span>

                            <span className="text-xs text-reach-text/45">
                                Connect. Share. Reach.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="hidden rounded-full border border-reach-plum/10 bg-white px-4 py-2 text-xs font-medium text-reach-text transition hover:border-reach-plum/30 sm:block"
                        >
                            Help
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-full border border-reach-plum/15 bg-reach-card px-5 py-2.5 text-xs font-medium text-reach-text transition hover:border-reach-plum/30 hover:bg-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:px-10">
                {/* Left Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-26 space-y-4">
                        <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-4 shadow-sm">
                            <div className="mb-5 flex items-center gap-3 border-b border-reach-plum/10 pb-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-reach-plum/10 text-sm font-semibold text-reach-plum">
                                    CM
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        Community Member
                                    </p>

                                    <p className="text-xs text-reach-text/45">
                                        Member
                                    </p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {[
                                    "Home",
                                    "Discover",
                                    "Saved",
                                    "Chats",
                                    "Notifications",
                                    "Profile",
                                ].map((item, index) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className={`flex w-full items-center rounded-xl px-3 py-3 text-left text-sm transition ${
                                            index === 0
                                                ? "bg-reach-plum text-white"
                                                : "text-reach-text/70 hover:bg-reach-beige"
                                        }`}
                                    >
                                        <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-current/10 text-xs">
                                            {index === 0
                                                ? "⌂"
                                                : index === 1
                                                  ? "◌"
                                                  : index === 2
                                                    ? "♡"
                                                    : index === 3
                                                      ? "◍"
                                                      : index === 4
                                                        ? "◉"
                                                        : "○"}
                                        </span>

                                        {item}
                                    </button>
                                ))}
                            </nav>

                            <button
                                type="button"
                                className="mt-5 w-full rounded-xl bg-reach-plum px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                + Create Post
                            </button>
                        </div>

                        <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-reach-text/40">
                                Your activity
                            </p>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-reach-text/55">
                                        Posts
                                    </span>

                                    <span className="text-sm font-semibold">
                                        12
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-reach-text/55">
                                        Connections
                                    </span>

                                    <span className="text-sm font-semibold">
                                        28
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-reach-text/55">
                                        Help given
                                    </span>

                                    <span className="text-sm font-semibold">
                                        7
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Feed */}
                <section className="min-w-0">
                    <div className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-reach-plum">
                            Community Feed
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-reach-text">
                            Your Reach
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-reach-text/55">
                            Discover people, offers and opportunities
                            around your community.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-3 shadow-sm">
                        <div className="flex items-center gap-3 rounded-2xl bg-reach-surface px-4 py-3">
                            <span className="text-base text-reach-text/40">
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Search for needs, offers..."
                                className="w-full bg-transparent text-sm text-reach-text outline-none placeholder:text-reach-text/35"
                            />
                        </div>

                        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                            {filters.map((filter, index) => (
                                <button
                                    key={filter}
                                    type="button"
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                                        index === 0
                                            ? "bg-reach-plum text-white"
                                            : "border border-reach-plum/10 bg-white text-reach-text/60 hover:border-reach-plum/25"
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Composer */}
                    <div className="mt-5 rounded-3xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                        <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reach-plum/10 text-xs font-semibold text-reach-plum">
                                CM
                            </div>

                            <div className="flex-1">
                                <button
                                    type="button"
                                    className="w-full rounded-2xl border border-reach-plum/10 bg-white px-4 py-3 text-left text-sm text-reach-text/40 transition hover:border-reach-plum/25"
                                >
                                    Share something that could help your
                                    community...
                                </button>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="rounded-full bg-reach-beige px-3 py-2 text-xs text-reach-text/65"
                                        >
                                            Need
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded-full bg-reach-plum/10 px-3 py-2 text-xs text-reach-plum"
                                        >
                                            Offer
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-full bg-reach-plum px-5 py-2.5 text-xs font-medium text-white transition hover:opacity-90"
                                    >
                                        Create Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feed Header */}
                    <div className="mt-7 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold">
                                Recent activity
                            </h2>

                            <p className="mt-1 text-xs text-reach-text/45">
                                See what's happening around you.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="rounded-full border border-reach-plum/10 bg-reach-card px-4 py-2 text-xs text-reach-text/60"
                        >
                            Latest ▾
                        </button>
                    </div>

                    {/* Posts */}
                    <div className="mt-4 space-y-4">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-3xl border border-reach-plum/10 bg-reach-card shadow-sm"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-reach-plum/10 text-xs font-semibold text-reach-plum">
                                                {post.initials}
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {post.author}
                                                </p>

                                                <p className="mt-1 text-xs text-reach-text/45">
                                                    {post.time} ·{" "}
                                                    {post.location}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-lg text-reach-text/30"
                                        >
                                            •••
                                        </button>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                                post.type === "NEED"
                                                    ? "bg-reach-beige text-reach-text/70"
                                                    : "bg-reach-plum/10 text-reach-plum"
                                            }`}
                                        >
                                            {post.type}
                                        </span>

                                        <span className="rounded-full border border-reach-plum/10 bg-white px-3 py-1 text-[10px] font-medium text-reach-text/55">
                                            {post.category}
                                        </span>

                                        <span className="text-[10px] text-reach-text/40">
                                            {post.expiry}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold leading-7 text-reach-text">
                                        {post.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-reach-text/60">
                                        {post.description}
                                    </p>
                                </div>

                                <div className="px-5">
                                    <img
                                        src={post.image}
                                        alt=""
                                        className="h-64 w-full rounded-2xl object-cover"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                                    <div className="flex items-center gap-5">
                                        <button
                                            type="button"
                                            className="text-xs font-medium text-reach-text/55 hover:text-reach-plum"
                                        >
                                            ♡ Appreciate
                                        </button>

                                        <button
                                            type="button"
                                            className="text-xs font-medium text-reach-text/55 hover:text-reach-plum"
                                        >
                                            Comment
                                        </button>

                                        <button
                                            type="button"
                                            className="text-xs font-medium text-reach-text/55 hover:text-reach-plum"
                                        >
                                            Save
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-full bg-reach-plum px-5 py-2.5 text-xs font-medium text-white transition hover:opacity-90"
                                    >
                                        {post.type === "NEED"
                                            ? "I Can Help"
                                            : "Reach Out"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-26 space-y-5">
                        <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold">
                                        Nearby Opportunities
                                    </p>

                                    <p className="mt-1 text-xs text-reach-text/45">
                                        Around your community
                                    </p>
                                </div>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-reach-plum/10 text-xs text-reach-plum">
                                    ↗
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                {[
                                    {
                                        title: "Grocery Support",
                                        distance: "2 km away",
                                        category: "Need",
                                    },
                                    {
                                        title: "Community Event",
                                        distance: "3 km away",
                                        category: "Offer",
                                    },
                                    {
                                        title: "Books for Students",
                                        distance: "4 km away",
                                        category: "Offer",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-reach-plum/10 bg-white p-3"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-semibold">
                                                    {item.title}
                                                </p>

                                                <p className="mt-1 text-[10px] text-reach-text/45">
                                                    {item.distance}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-reach-plum/10 px-2 py-1 text-[9px] font-medium text-reach-plum">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-4 w-full rounded-xl border border-reach-plum/10 px-4 py-2.5 text-xs font-medium text-reach-plum hover:bg-reach-beige"
                            >
                                View nearby
                            </button>
                        </div>

                        <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                            <p className="text-sm font-semibold">
                                Local Activity
                            </p>

                            <p className="mt-1 text-xs leading-5 text-reach-text/45">
                                Explore what's happening around your
                                community.
                            </p>

                            <div className="relative mt-4 h-40 overflow-hidden rounded-2xl bg-reach-beige">
                                <div className="absolute left-8 top-10 h-3 w-3 rounded-full bg-reach-plum" />
                                <div className="absolute right-12 top-16 h-3 w-3 rounded-full bg-reach-plum/60" />
                                <div className="absolute bottom-8 left-1/2 h-3 w-3 rounded-full bg-reach-plum/70" />

                                <div className="absolute left-6 top-6 h-24 w-32 rotate-12 rounded-[40%] border border-reach-plum/10" />
                                <div className="absolute right-2 top-10 h-28 w-36 -rotate-12 rounded-[45%] border border-reach-plum/10" />

                                <div className="absolute inset-x-0 bottom-3 text-center text-[10px] font-medium text-reach-text/40">
                                    Nearby community activity
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-reach-plum/10 bg-reach-card p-5">
                            <p className="text-xs leading-5 text-reach-text/45">
                                Reach is built around sharing resources,
                                reducing waste and helping communities connect.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-reach-text/40">
                                <span>About</span>
                                <span>Community</span>
                                <span>Privacy</span>
                                <span>Terms</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default FeedPage;