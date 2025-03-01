"use client";
import { Loader, TriangleAlert} from "lucide-react";
import { UseGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { Header } from "./header";
import { ChatInput } from "./chat-input";

const ChannelIdPage = () => {
    const channelId = useChannelId();

    const { data: channel, isLoading: channelLoading} = UseGetChannel({ id: channelId});

    if (channelLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className="animate-spin size-5 text-muted-foreground" />
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
                <TriangleAlert className="animate-spin size-5 text-muted-foreground" />
                <span className="animate-spin text-sm text-muted-foreground" >
                    Channel not found
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <Header title = {channel.name}/>
            <div className="flex-1" />
            <ChatInput />
        </div>
    );
};

export default ChannelIdPage;