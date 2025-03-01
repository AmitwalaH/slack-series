"use client";

import { useEffect, useState } from "react";

import { CreateWorkspaceModal } from "@/features/components/create-workspace-modal";

export const Modals = () => {
    const[mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;
     
    return (
        <>
            <CreateWorkspaceModal />
        </>
    );
};
