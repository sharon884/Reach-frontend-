import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-reach-plum/10 bg-reach-card">
            <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">

                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link
                            to="/"
                            className="text-xl font-bold text-reach-plum"
                        >
                            Reach
                        </Link>

                        <p className="mt-3 text-sm leading-6 text-reach-text/60">
                            Connecting people through community support,
                            one small act at a time.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-3 text-sm">
                        <Link
                            to="/"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            Home
                        </Link>

                        <Link
                            to="/feed"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            Explore
                        </Link>

                        <a
                            href="#how-it-works"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            How it works
                        </a>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-3 text-sm">
                        <a
                            href="#"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            Terms of Service
                        </a>

                        <a
                            href="#"
                            className="text-reach-text/70 transition hover:text-reach-plum"
                        >
                            Community Guidelines
                        </a>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-reach-plum/10 pt-6">
                    <p className="text-xs text-reach-text/50">
                        © 2026 Reach. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;