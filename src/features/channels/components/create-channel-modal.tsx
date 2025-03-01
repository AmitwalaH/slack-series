import { useState } from "react";
import { toast } from "sonner";

import{
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useworkspaceId } from "@/hooks/use-workspace-id";

import { useCreateChannel } from "../api/use-create-channel";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { useRouter } from "next/navigation";

export const CreateChannelModal = () => {
	 const workspaceId = useworkspaceId();
	 const { mutate, isPending} = useCreateChannel();
     const [open, set0pen] = useCreateChannelModal() ;
	 const router = useRouter();

	 const {} = useCreateChannel();
     const [name, setName] = useState("");
	
	 const handleClose = () => {
		setName("");
		set0pen(false);
	};
	 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
		setName(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutate(
			{ name, workspaceId},
			{
				onSuccess: (id) => {
					//TODO: Redirect to new channel
					toast.success("channel created");
					router.push(`/workspace/${workspaceId}/channels/${id}`);
					handleClose();
				},
				onError: () => {
					toast.error("failed to create channel");
				}
			},
		);
	};

	 return( 
	 <Dialog open={open} onOpenChange={handleClose}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add a channel</DialogTitle>
			</DialogHeader>
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				value={name}
				disabled={isPending}
				onChange={handleChange}
				required
				autoFocus
				minLength={3}
				maxLength={80}
				placeholder="e.g. plan-budget"
			/>
		</form>
		<div className = "flex justify-end">
		<Button disabled={isPending}>
			Create butt
		</Button>
		</div>
		</DialogContent> 
	 </Dialog>
	 );
};

    