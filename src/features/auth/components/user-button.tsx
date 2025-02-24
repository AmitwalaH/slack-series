"use client";   

import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/app/auth/api/use-current-user";

export const UserButton = () => {
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    if(isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground"/>;
    }

    if(!data) {
        return null;
    }

    const {image, name, email } = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image}/>
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => signOut()} className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}