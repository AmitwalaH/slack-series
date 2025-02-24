"use client";

import { Provider } from "jotai";

interface jotaiProviderProps {
    children: React.ReactNode;
}

export const JotaiProvider = ({ children }: jotaiProviderProps) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}