import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import {
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { signIn } from "../../../../convex/auth";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}


export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignIn = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        setPending(true);
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {  
                setError("Invalid email or password");
            })
            .finally(() => {
                setPending(false);
            });
    };

    const onProviderSignIn = (value:"github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false);
            })
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to Continue
                </CardTitle>
                <CardDescription className="">
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && ( 
                <div className="bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive gap-x-2">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-x-5 px-0 pt-0">
                <form onSubmit={onPasswordSignIn} className="space-x-0 space-y-5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                        />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button 
                        disabled={pending}
                        onClick={() =>onProviderSignIn("google")}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                        >
                        <FcGoogle className="size-5 absolute top-3.5 left-3.5" />  
                            Continue with Google
                    </Button>
                    <Button 
                        disabled={pending}
                        onClick={() => onProviderSignIn("github")}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative"
                        >
                        <FaGithub className="size-5 absolute top-3.5 left-3.5" />  
                            Continue with Github
                    </Button>
                </div>  
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?
                     <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign up</span>
                </p>   
                </form>
            </CardContent>
        </Card>
    );
};