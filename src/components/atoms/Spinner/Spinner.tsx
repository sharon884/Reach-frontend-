import type { HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
    label?: string;
    className?: string;
}



function Spinner({
    size = "md",
    label = "Loading...",
    className = "",
    ...props
}: SpinnerProps) {
    const sizeMap = {
        sm: {
            container: "h-16 w-16",
            planet: "h-10 w-10",
            ring: "h-14 w-14",
            moon: "h-2.5 w-2.5",
        },
        md: {
            container: "h-24 w-24",
            planet: "h-16 w-16",
            ring: "h-20 w-20",
            moon: "h-3 w-3",
        },
        lg: {
            container: "h-32 w-32",
            planet: "h-20 w-20",
            ring: "h-28 w-28",
            moon: "h-4 w-4",
        },
    };

    const currentSize = sizeMap[size];


    return (
        <div
            role="status"
            aria-label={label}
            className={`flex flex-col items-center justify-center gap-4 ${className}`}
            {...props}
        >
            {/* Planet system */}
            <div
                className={`relative flex items-center justify-center ${currentSize.container}`}
            >
                {/* Planet */}
                <div
                    className={`relative z-10 overflow-hidden rounded-full bg-gradient-to-br from-reach-plum via-reach-plum/90 to-reach-text shadow-[0_0_24px_rgba(88,55,90,0.35)] ${currentSize.planet}`}
                >
                    {/* Planet highlight */}
                    <div className="absolute -left-2 -top-2 h-1/2 w-1/2 rounded-full bg-white/10 blur-sm" />

                    {/* Craters */}
                    <div className="absolute left-[22%] top-[24%] h-[18%] w-[18%] rounded-full bg-reach-text/20" />

                    <div className="absolute right-[18%] top-[38%] h-[24%] w-[24%] rounded-full bg-reach-text/15" />

                    <div className="absolute bottom-[18%] left-[30%] h-[15%] w-[15%] rounded-full bg-reach-text/20" />

                    <div className="absolute bottom-[28%] right-[25%] h-[10%] w-[10%] rounded-full bg-white/10" />
                </div>

                {/* Orbit */}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${currentSize.ring}`}
                >
                    <div className="absolute inset-0 animate-reach-orbit">
                        {/* Orbit ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-reach-plum/40" />

                        {/* Moon */}
                        <div
                            className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-reach-plum shadow-[0_0_10px_rgba(88,55,90,0.65)] ${currentSize.moon}`}
                        />
                    </div>
                </div>
            </div>

            {/* Loading text */}
            {label && (
                <div
                    role="status"
                    aria-label={label}
                    className="text-sm font-medium tracking-wide text-reach-text/60"
                >
                    <span className="inline-flex">
                        {label.split("").map((character, index) => (
                            <span
                                key={`${character}-${index}`}
                                className="animate-reach-loading"
                                style={{
                                    animationDelay: `${index * 120}ms`,
                                }}
                            >
                                {character}
                            </span>
                        ))}
                    </span>
                </div>
            )}


            {/* {label && (
    <div
        role="status"
        aria-label={label}
        className="text-sm font-medium tracking-wide text-reach-text/60"
    >
        <span className="inline-flex">
            {loadingText.split("").map((character, index) => (
                <span
                    key={`${character}-${index}`}
                    className="animate-reach-letter"
                    style={{
                        animationDelay: `${index * 150}ms`,
                    }}
                >
                    {character}
                </span>
            ))}

            <span className="ml-1 animate-reach-dots">
                ...
            </span>
        </span>
    </div>
)} */}
        </div>
    );
}

export default Spinner;