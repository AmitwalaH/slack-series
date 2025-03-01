import dynamic from "next/dynamic";

const Editer = dynamic(() => import("@/components/editor"));

import Editor from "@/components/editor";

export const ChatInput = () => {
    return (
        <div className="px-5 w-full">
            <Editor />
        </div>
    );
};