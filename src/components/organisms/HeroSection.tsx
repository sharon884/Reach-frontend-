import Button from "../atoms/Button";

function HeroSection() {
    return (
        <section className="bg-reach-beige">
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
                <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">

                    {/* Hero Content */}
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-bold leading-tight text-reach-plum md:text-6xl">
                            Your next scroll could help someone.
                        </h1>

                        <p className="mt-6 text-base leading-7 text-reach-text/70 md:text-lg">
                            Discover and respond to nearby offers and needs.
                            Share what you can, ask for what you need, and
                            make a difference in your community.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/signup"
                                className="rounded-full bg-reach-plum px-6 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Sign up
                            </a>

                            <a
                                href="#community"
                                className="rounded-full border border-reach-plum/30 bg-reach-card px-6 py-3 text-center text-sm font-medium text-reach-plum transition hover:bg-white"
                            >
                                Explore simple feed
                            </a>
                        </div>

                        <p className="mt-5 text-xs text-reach-text/50">
                            Community-first · Privacy-friendly
                        </p>
                    </div>

                    {/* Example Post */}
                    <div className="w-full max-w-sm self-center">
                        <div className="rounded-2xl border border-reach-plum/10 bg-reach-card p-5 shadow-lg">
                            <p className="text-sm font-semibold text-reach-plum">
                                Nearby
                            </p>

                            <div className="mt-4 rounded-xl border border-reach-plum/10 bg-white p-4">
                                <p className="text-sm font-semibold text-reach-text">
                                    Looking for a helping hand
                                </p>

                                <p className="mt-2 text-xs leading-5 text-reach-text/60">
                                    A simple example of how people can
                                    connect with nearby community needs.
                                </p>

                                <Button>
                                    Claim
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;