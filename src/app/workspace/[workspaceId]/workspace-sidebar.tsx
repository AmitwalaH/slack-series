import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader, MessageSquareText, SendHorizonal, SendHorizontal, HashIcon } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { UseGetChannels, } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { UseGetMember } from "@/features/members/api/use-get-member";
import { Item } from "@radix-ui/react-dropdown-menu";
import { UserItem } from "./user-item";



export const WorkspaceSidebar = () => {
    const workspaceId = useworkspaceId();

    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = UseGetChannels({ workspaceId });
    const { data: members, isLoading: membersLoading } = UseGetMember({ workspaceId });

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        );
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">
                    Workspcae not found
                </p>
            </div>
        );
    }


    return (
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
            <div className="flex flex-col px-2 mr-3">
                <SidebarItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="threads"
                />
                <SidebarItem
                    label="Drafts & Sent"
                    icon={SendHorizontal}
                    id="drafts"
                />
            </div>
            <WorkspaceSection
                label="Channels"
                hint="New channel"
                onNew={() => { }}
            >
                {channels?.map((item) => (
                    <SidebarItem
                        key={item._id}
                        icon={HashIcon}
                        label={item.name}
                        id={item._id}
                    />
                ))}
            </WorkspaceSection>
            <WorkspaceSection
                label="Direct messages"
                hint="New direct message"
                onNew={() => { }}
            >
                {members?.map(item) => (
                <UserItem
                    key={item._id}
                    id={item._id}
                    label={item.user.name}
                    image={item.user.name}
                />
                )}
            </WorkspaceSection>

        </div>
    )
};
