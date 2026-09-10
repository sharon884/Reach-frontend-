import Button from "../atoms/Button";

function CommunityFeed() {
    return (
        <section
            id="community"
            className="bg-reach-surface"
        >
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">

                {/* Section heading */}
                <div className="max-w-2xl">
                    <p className="text-sm font-medium text-reach-plum">
                        Community
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-reach-text md:text-4xl">
                        Small acts can make a big difference.
                    </h2>

                    <p className="mt-4 text-base leading-7 text-reach-text/70">
                        See examples of how people can offer help and
                        reach out when they need something.
                    </p>
                </div>

                {/* Demo cards */}
                <div className="mt-10 grid gap-5 md:grid-cols-3">

                    {/* Card 1 */}
                    <article className="rounded-2xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-reach-plum/10 px-3 py-1 text-xs font-medium text-reach-plum">
                                Offer
                            </span>

                            <span className="text-xs text-reach-text/50">
                                Nearby
                            </span>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-reach-text">
                            Extra study materials
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-reach-text/60">
                            I have some books and notes that could be useful
                            for someone preparing for their exams.
                        </p>

                        <div className="mt-5">
                            <Button type="button">
                                View offer
                            </Button>
                        </div>
                    </article>

                    {/* Card 2 */}
                    <article className="rounded-2xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-reach-plum/10 px-3 py-1 text-xs font-medium text-reach-plum">
                                Need
                            </span>

                            <span className="text-xs text-reach-text/50">
                                Nearby
                            </span>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-reach-text">
                            Looking for a laptop charger
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-reach-text/60">
                            Looking for a compatible charger for my laptop.
                            If someone nearby has an extra one, please reach out.
                        </p>

                        <div className="mt-5">
                            <Button type="button">
                                View need
                            </Button>
                        </div>
                    </article>

                    {/* Card 3 */}
                    <article className="rounded-2xl border border-reach-plum/10 bg-reach-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-reach-plum/10 px-3 py-1 text-xs font-medium text-reach-plum">
                                Offer
                            </span>

                            <span className="text-xs text-reach-text/50">
                                Nearby
                            </span>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-reach-text">
                            Help with moving
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-reach-text/60">
                            I can help someone nearby with small moving or
                            carrying tasks this weekend.
                        </p>

                        <div className="mt-5">
                            <Button type="button">
                                View offer
                            </Button>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
}

export default CommunityFeed;