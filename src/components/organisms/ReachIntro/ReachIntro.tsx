import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button";
import ReachLogo from "@/components/atoms/ReachLogo";

function ReachIntro() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-reach-beige px-6">
            <div className="flex w-full max-w-md flex-col items-center text-center">
                <ReachLogo animated />

                <div className="mt-10">
                    <Link to="/signup">
                        <Button>
                            Get Started
                        </Button>
                    </Link>
                </div>

                <Link
                    to="/landing"
                    className="mt-6 text-sm font-medium text-reach-plum transition hover:opacity-70"
                >
                    Learn more about Reach →
                </Link>

                <p className="mt-4 text-sm text-reach-text/60">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-reach-plum hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default ReachIntro;