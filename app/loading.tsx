import {Triangle} from "lucide-react";
import React from "react";

export default function LoadingScreen(){
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span>
        </div>
    )
}