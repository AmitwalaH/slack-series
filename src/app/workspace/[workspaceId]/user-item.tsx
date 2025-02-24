import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import WorkspaceIdLayout from "./layout";
import { useworkspaceId } from "@/hooks/use-workspace-id";

const UserItemVarients = cva(
    "flex item-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
    {
        variants: {
            variant: {
                default: "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

interface UserItemProps {
    id: Id<"members">;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof UserItemVarients>["variant"];
}

export const UserItem = ({
    id,
    label="Member",
    image,
    variant,
}: UserItemProps) => {

    const workspaceId = useworkspaceId();
    const avatarFallback = label.charAt(0).toUpperCase();
    return (
        <Button
            variant="transparent"
            className={cn(UserItemVarients({ variant: variant}))}
            size="sm"
            asChild
        >
            <Link href={`/workspace/${workspaceId}/member/${id}`}>
            <Avatar className="size-5 rounded-md mr-1">
                <AvatarImage className="rounded-md" src={image} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
                        {avatarFallback}
                    </AvatarFallback>
            </Avatar>
            <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    )
}