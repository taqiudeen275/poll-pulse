"use client"

import { Button } from "@/components/ui/button";
import { BallotTabs } from "./compontents/ballot-tabs";
import { LogOut } from "lucide-react";
import pb from "@/utils/my_pb";
import {useRouter} from "next/navigation";


export default function VotePage({ params }: { params: { id: string } }){
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await pb.logoutUser();
            router.replace('/');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };
    return (
        <>
        <div className="flex justify-between items-center px-6 py-2 border-b">
          <h1 className="text-xl ">Poll <span className="text-blue-600">  Pulse</span></h1>  
         <Button variant="ghost" className="mx-1" onClick={handleLogout}><LogOut/> Logout</Button>

        </div>
        <div className="h-screen">

        <BallotTabs id={params.id} />
        </div>
        </>
    )
}