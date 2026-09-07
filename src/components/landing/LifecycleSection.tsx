function LifecycleSection() {
    return (
        <section
            id="how-it-works"
            className="bg-reach-beige"
        >
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-medium text-reach-plum">
                        How it works
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-reach-text md:text-4xl">
                        From a simple post to real community support.
                    </h2>

                    <p className="mt-4 text-base leading-7 text-reach-text/70">
                        Reach makes it simple to connect people who can help
                        with people who need support.
                    </p>
                </div>

                {/* Lifecycle */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

                    <div className="rounded-2xl bg-reach-card p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-reach-plum text-sm font-semibold text-white">
                            1
                        </div>

                        <h3 className="mt-5 font-semibold text-reach-text">
                            Offer / Need
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-reach-text/60">
                            Share something you can offer or ask for something
                            you need.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-reach-card p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-reach-plum text-sm font-semibold text-white">
                            2
                        </div>

                        <h3 className="mt-5 font-semibold text-reach-text">
                            Claim / Respond
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-reach-text/60">
                            Someone nearby can respond to an offer or need.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-reach-card p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-reach-plum text-sm font-semibold text-white">
                            3
                        </div>

                        <h3 className="mt-5 font-semibold text-reach-text">
                            Chat
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-reach-text/60">
                            Connect and discuss the details directly.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-reach-card p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-reach-plum text-sm font-semibold text-white">
                            4
                        </div>

                        <h3 className="mt-5 font-semibold text-reach-text">
                            Complete
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-reach-text/60">
                            Complete the exchange and help each other.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-reach-card p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-reach-plum text-sm font-semibold text-white">
                            5
                        </div>

                        <h3 className="mt-5 font-semibold text-reach-text">
                            Transparent Record
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-reach-text/60">
                            Keep a simple record of completed community
                            interactions.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default LifecycleSection;