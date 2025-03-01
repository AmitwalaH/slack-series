import { ImageIcon, Smile } from "lucide-react";
import Quill, {type QuillOptions} from "quill";
import {MdSend } from "react-icons/md"
import {PiTextAa} from "react-icons/pi";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Hint } from "./hint";

interface EditorProps {
    variant?: "create" | "update";
};

const Editor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow"
        };

        new Quill(editorContainer, options);

        return () => {
            if (container) {
                container.innerHTML = "";
            }
        };
    }, []);
    return (
        <div className="flex flex-col">
            <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
                <div ref={containerRef} className="h-full ql-custom"/>
                <div className="flex px-2 pb-2 z-[5]">
                    <Hint label="Hide formatting">
                    <Button 
                        disabled={false}
                        size="iconSm"
                        variant="ghost"
                        onClick={() => {}}
                    >
                        <PiTextAa className="size-4" />
                    </Button>
                    </Hint>
                    <Hint label="Emoji">
                    <Button 
                        disabled={false}
                        size="iconSm"
                        variant="ghost"
                        onClick={() => {}}
                    >
                        <Smile className="size-4" />
                    </Button>
                    </Hint>
                    <Hint label="Images">

                    <Button 
                        disabled={false}
                        size="iconSm"
                        variant="ghost"
                        onClick={() => {}}
                    >
                        <ImageIcon className="size-4"/>
                    </Button>
                    </Hint>
                    <Button
                        disabled={false}
                        size="iconSm"
                        className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80">
                        <MdSend />
                    </Button>
                </div>
            </div>   
            <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
                <strong>Shift + Return </strong> to add a new line
            </div>   
        </div>
    );
};

export default Editor;