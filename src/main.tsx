import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.tsx";
import { store } from "./store";
import Toaster from "@/components/atoms/Toaster";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </StrictMode>,
);