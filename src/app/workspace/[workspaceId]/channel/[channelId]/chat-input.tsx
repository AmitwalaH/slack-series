import Quill from "quill";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
 
interface ChatInputProps {
    placeholder: string;
}
export const ChatInput = ({ placeholder}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const [isPending, setIsPending] = useState(false);

  const workspaceId = useworkspaceId();
  const channelId = useChannelId();
  const {mutate: createMessage } = useCreateMessage();
  const handleSubmit = async ({
    body,
    image
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
    await createMessage({
      workspaceId,
      channelId,
      body,
    }, {throwError: true});

    setEditorKey((prevKey) => prevKey + 1);
    } catch(error) {
      toast.error("Failed to send message");

    } finally {
      setIsPending(false);

    }
  };
  
  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
        // imageElementRef={}
      />
    </div>
  );
};
