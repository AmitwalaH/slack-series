"use client";

import { useworkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

const WorkspaceIdPage = () => {
    const workspaceId = useworkspaceId();
    const { data } = useGetWorkspace({ id: workspaceId });

    return (
        <div>
           Data: {JSON.stringify(data)}
        </div>
    );
}; 

export default WorkspaceIdPage;