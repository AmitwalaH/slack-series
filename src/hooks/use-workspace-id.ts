import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";
import { use } from "react";

export const useWorkspaceId = () =>{
    const params = useParams();
    return params.workspaceId as Id<"workspaces">;
}