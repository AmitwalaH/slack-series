import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetChannelProps {
    workspaceId: Id<"workspaces">;
}

export const UseGetChannels = ({ workspaceId }: useGetChannelProps) => {
    const data = useQuery(api.channels.get, { workspaceId });
    const isLoading = data === undefined;

    return { data, isLoading };
}