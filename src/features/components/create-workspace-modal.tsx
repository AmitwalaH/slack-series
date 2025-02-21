"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../workspaces/store/use-create-workspace-madal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "../workspaces/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate, isPending } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false);
        //TODO: clear here
    };

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        mutate ({ name }, {
            onSuccess(id) {
                toast.success("Workspace created");
                router.push(`/workspace/${id}`);
                handleClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Workspace name e.g. 'Work', 'Home', 'Project'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};