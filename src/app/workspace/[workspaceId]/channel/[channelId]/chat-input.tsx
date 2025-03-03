import Quill from "quill";
import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
 
interface ChatInputProps {
    placeholder: string;
}

type CreateMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image?: Id<"_storage"> | undefined;
};

export const ChatInput = ({ placeholder}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const [isPending, setIsPending] = useState(false);

  const workspaceId = useworkspaceId();
  const channelId = useChannelId();

  const { mutate: generateUploadUrl} = useGenerateUploadUrl();
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
      editorRef?.current?.enable(false);

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        body,
        image: undefined,
      };
      
      if (image) {
        const url = await generateUploadUrl({}, { throwError: true});
      
        if (!url) {
          throw new Error("Url not found");
        }
        
        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if(!result.ok){
          throw new Error("Failed to upload image")
        }

        const { storageId} = await result.json();
        values.image = storageId;
      }
            
    await createMessage(values, {throwError: true});

    setEditorKey((prevKey) => prevKey + 1);
    } catch(error) {
      toast.error("Failed to send message");

    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);


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
