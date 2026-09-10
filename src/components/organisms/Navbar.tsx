import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="border-b border-reach-plum/10 bg-reach-card">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold text-reach-plum"
                >
                    Reach
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="text-sm font-medium text-reach-text transition hover:text-reach-plum"
                    >
                        Home
                    </Link>

                    <Link
                        to="/feed"
                        className="text-sm font-medium text-reach-text transition hover:text-reach-plum"
                    >
                        Explore
                    </Link>

                    <a
                        href="#how-it-works"
                        className="text-sm font-medium text-reach-text transition hover:text-reach-plum"
                    >
                        How it works
                    </a>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm font-medium text-reach-text transition hover:text-reach-plum"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-full bg-reach-plum px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Sign up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-md p-2 text-reach-plum md:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <X size={22} />
                    ) : (
                        <Menu size={22} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-reach-plum/10 bg-reach-card px-5 py-4 md:hidden">
                    <div className="flex flex-col gap-4">

                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-medium text-reach-text"
                        >
                            Home
                        </Link>

                        <Link
                            to="/feed"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-medium text-reach-text"
                        >
                            Explore
                        </Link>

                        <a
                            href="#how-it-works"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-medium text-reach-text"
                        >
                            How it works
                        </a>

                        <div className="flex flex-col gap-2 border-t border-reach-plum/10 pt-4">
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-medium text-reach-text"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                onClick={() => setIsMenuOpen(false)}
                                className="rounded-full bg-reach-plum px-5 py-2 text-center text-sm font-medium text-white"
                            >
                                Sign up
                            </Link>
                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;