"use client";

import { use, useEffect, useState } from "react";
import { CreateWorkspaceModal } from "../create-workspace-modal";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) return null;

    return (
        <>
            <CreateWorkspaceModal />
        </>
    );
};