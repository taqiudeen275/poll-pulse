"use client";
import Image from "next/image";
import {TypewriterEffectSmooth} from "@/app/ui/typewriter-effect";
import {ModeToggle} from "@/app/theme-toggler";
import Link from "next/link";


export default function Home() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "Dynamic",
    },
    {
      text: "Voting",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Solution",
    }];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-7 right-7">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Welcome to PollPulse:
      </p>
      <TypewriterEffectSmooth words={words} />
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
    <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
      Explore Elections
    </button>

    <Link href="/admin/login">
      <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"> Login
      </button>
    </Link>
  </div>
</div>
</main>
  );
}
