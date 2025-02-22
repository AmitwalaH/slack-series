import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { SidebarButton } from "./sidebar-button";
import { useParams, usePathname } from "next/navigation";


export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-9 pb-10">
            <WorkspaceSwitcher /> 
            <SidebarButton Icon={Home} label="Home" isActive={pathname.includes("/workspace")} /> 
            <SidebarButton Icon={MessageSquare} label="DMs" /> 
            <SidebarButton Icon={Bell} label="Activity"  /> 
            <SidebarButton Icon={MoreHorizontal} label="more"  /> 
                <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                    <UserButton />
                </div>
        </aside>
    )
}