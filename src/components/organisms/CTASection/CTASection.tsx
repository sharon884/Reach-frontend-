import { Link } from "react-router-dom";

function CTASection() {
    return (
        <section className="bg-reach-plum">
            <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-20">

                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    Ready to make a difference?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                    Join your community, share what you can offer,
                    or reach out when you need support.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        to="/signup"
                        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-reach-plum transition hover:bg-white/90"
                    >
                        Sign up
                    </Link>

                    <Link
                        to="/feed"
                        className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                        Explore feed
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default CTASection;