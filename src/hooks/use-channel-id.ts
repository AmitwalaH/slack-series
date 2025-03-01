import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";
import { use } from "react";

export const useChannelId = () =>{
    const params = useParams();
    return params.channelId as Id<"channels">;
}