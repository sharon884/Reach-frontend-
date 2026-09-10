import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthTemplateProps {
    title: string;
    description: ReactNode;
    children: ReactNode;
    backLink?: {
        label: string;
        to: string;
    };
}

function AuthTemplate({
    title,
    description,
    children,
    backLink,
}: AuthTemplateProps) {
    return (
        <div className="min-h-screen bg-reach-surface">
            <main className="px-5 py-10 md:py-16">
                <div className="mx-auto max-w-md">
                    <div className="text-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-reach-plum"
                        >
                            Reach
                        </Link>

                        <h1 className="mt-5 text-2xl font-bold text-reach-text md:text-3xl">
                            {title}
                        </h1>

                        <div className="mx-auto mt-2 max-w-sm text-xs leading-5 text-reach-text/60">
                            {description}
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-reach-plum/10 bg-reach-card p-6 shadow-sm md:p-8">
                        {children}
                    </div>

                    {backLink && (
                        <div className="mt-6 text-center">
                            <Link
                                to={backLink.to}
                                className="text-[10px] text-reach-text/60 transition hover:text-reach-plum"
                            >
                                {backLink.label}
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t border-reach-plum/10 bg-reach-card">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-[9px] text-reach-text/50 md:px-8">
                    <p>© 2026 Reach. All rights reserved.</p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="transition hover:text-reach-plum"
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-reach-plum"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AuthTemplate;