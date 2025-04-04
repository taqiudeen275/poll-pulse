"use client";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/cn";
    import {Triangle} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ecPic from "@/public/ec.jpg"


export default function SigninForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const route = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const form = {email, password};
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                setError('Failed to authenticate user');
                setIsLoading(false)
            };
            const data = await response.json();
            if (data?.token) {
                setSuccess('Logged in successfuly')
                route.push('/admin/dashboard');
                setIsLoading(false)
            } else {
                setError('Failed to authenticate user');
                setIsLoading(false)
            }
        } catch (err) {
            setError('Failed to authenticate user');
            setIsLoading(false)
        }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <Image width={160} alt="" className="rounded-full mb-3"
        height={160} src={ecPic} />
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
                    UDS MSA Eleection with <span className="text-blue-700"> Pulse</span>
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Login to poll-pulse if you are an administrator
                </p>

                <form className="my-8" onSubmit={handleSubmit}>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address / Username</Label>
                        <Input id="email" placeholder="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password ">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password"   value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </LabelInputContainer>
                    <LabelInputContainer className="my-4">
                        <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
                        <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        {isloading? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :  <span>Sign in &rarr;</span>}
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                        <Link href={"/"} className="text-center text-blue-600">Go back to the home page</Link>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
