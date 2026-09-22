import "./ReachLogo.css";

interface ReachLogoProps {
    animated?: boolean;
    className?: string;
}

function ReachLogo({
    animated = false,
    className = "",
}: ReachLogoProps) {
    return (
        <div
            className={[
                "reach-logo",
                animated ? "reach-logo--animated" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            aria-label="Reach - More Connected Tomorrow"
        >
            <svg
                className="reach-logo__mark"
                viewBox="0 0 320 150"
                role="img"
                aria-hidden="true"
            >
                {/* Left person */}
                <g className="reach-logo__person reach-logo__person--left">
                    <circle
                        className="reach-logo__head reach-logo__head--left"
                        cx="105"
                        cy="36"
                        r="17"
                    />

                    <path
                        className="reach-logo__body reach-logo__body--left"
                        d="
                            M105 57
                            C91 67 72 78 48 82
                            C66 103 96 112 126 103
                            C143 98 157 90 169 78
                            C147 84 125 76 105 57
                            Z
                        "
                    />
                </g>

                {/* Right person */}
                <g className="reach-logo__person reach-logo__person--right">
                    <circle
                        className="reach-logo__head reach-logo__head--right"
                        cx="215"
                        cy="36"
                        r="17"
                    />

                    <path
                        className="reach-logo__body reach-logo__body--right"
                        d="
                            M215 57
                            C229 67 248 78 272 82
                            C254 103 224 112 194 103
                            C177 98 163 90 151 78
                            C173 84 195 76 215 57
                            Z
                        "
                    />
                </g>

                {/* Connection between the two people */}
                <path
                    className="reach-logo__connection"
                    d="
                        M72 88
                        C112 119 208 119 248 88
                    "
                />
            </svg>

            <div className="reach-logo__wordmark">
                <span className="reach-logo__name">
                    Reach
                </span>

                <span className="reach-logo__tagline">
                    More Connected Tomorrow
                </span>
            </div>
        </div>
    );
}

export default ReachLogo;  