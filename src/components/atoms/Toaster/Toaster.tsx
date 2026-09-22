import { Toaster as SonnerToaster } from "sonner";

function Toaster() {
    return (
        <SonnerToaster
            position="top-right"
            expand={false}
            richColors={false}
            closeButton
            duration={4000}
            toastOptions={{
                className:
                    "rounded-2xl border border-reach-plum/10 bg-reach-card text-reach-text shadow-lg",
                style: {
                    fontFamily: "inherit",
                },
            }}
        />
    );
}

export default Toaster;