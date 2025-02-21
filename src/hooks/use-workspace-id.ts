import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";
import { use } from "react";

export const useworkspaceId = () =>{
    const params = useParams();
    return params.workspaceId as Id<"workspaces">;
}