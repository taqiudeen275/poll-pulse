"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusIcon, Triangle } from "lucide-react"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {cn} from "@/utils/cn";
import { setFips } from "crypto";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addCandidate, getPositions } from "../action";
import { setSourceMapsEnabled } from "process";
import { RecordModel } from "pocketbase";
import {useRouter} from "next/navigation";

export function AddCandidate() {

  const [email, setEmail] = useState('');
  const [full_name, setFullname] = useState('');
  const [photo, setPhoto] = useState('');
  const [positions, setPositions] = useState<RecordModel[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('')
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
   
      await addCandidate(full_name, selectedPosition, email);
      setSuccess('Candidate added successfully')
      route.forward();
    setIsLoading(false)
  }
  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getPositions()
        setPositions(response)
        console.log(response)
      } catch (error) {
      }
    };

    fetchCandidates();
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><PlusIcon /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-4/5">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Candidate</AlertDialogTitle>
          <AlertDialogDescription>
            <form className="my-8" onSubmit={handleSubmit}>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address / Username</Label>
                <Input id="email" placeholder="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="full_name ">Full Name</Label>
                <Input id="full_name" placeholder="full Name" type="text" value={full_name} onChange={(e) => setFullname(e.target.value)} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" placeholder="Photo" type="file" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              </LabelInputContainer>
           
              <LabelInputContainer className="my-4">
                <Label htmlFor="position">Position</Label>
    <Select onValueChange={(value) => setSelectedPosition(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue  placeholder="Select a Position" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Positions</SelectLabel>
         {positions.map((item)=>(
          <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
         ))}
        </SelectGroup>
      </SelectContent>
    </Select>
              </LabelInputContainer>
                 <LabelInputContainer className="my-4">
                <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
                <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                {isloading ? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> : <span>Add &rarr;</span>}
                <BottomGradient />
              </button>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
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
