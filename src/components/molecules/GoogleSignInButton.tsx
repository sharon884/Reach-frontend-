import { useEffect, useRef } from "react";

interface GoogleSignInButtonProps {
    onCredential: (credential: string) => void;
}

function GoogleSignInButton({
    onCredential,
}: GoogleSignInButtonProps) {

    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const initializeGoogleSignIn = () => {

            if (!buttonRef.current) {
                return;
            }

            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: (response) => {
                    onCredential(response.credential);
                },
            });

            google.accounts.id.renderButton(
                buttonRef.current,
                {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                    text: "continue_with",
                    shape: "rectangular",
                    width: 320,
                },
            );
        };

        if (window.google) {
            initializeGoogleSignIn();
            return;
        }

        const script = document.createElement("script");

        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        script.onload = initializeGoogleSignIn;

        document.head.appendChild(script);

        return () => {
            script.remove();
        };

    }, [onCredential]);

    return (
        <div
            ref={buttonRef}
            className="flex justify-center"
        />
    );
}

export default GoogleSignInButton;