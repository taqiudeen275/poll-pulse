"use client";
import Image from "next/image";
import { TypewriterEffectSmooth } from "@/app/ui/typewriter-effect";
import { ModeToggle } from "@/app/theme-toggler";
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

  const words2 = [
    { text: "Your", className: "text-sm" },
    { text: "voice", className: "text-sm" },
    { text: "holds", className: "text-sm" },
    { text: "the", className: "text-sm" },
    { text: "power", className: "text-sm text-blue-500 dark:text-blue-500" },
    { text: "to", className: "text-sm ext-blue-500 dark:text-blue-500" },
    { text: "shape", className: "text-sm" },
    { text: "our", className: "text-sm ext-blue-500 dark:text-blue-500" },
    { text: "future;", className: "text-sm text-blue-500 dark:text-blue-500" },
    { text: "make", className: "text-sm " },
    { text: "it", className: "text-sm " },
    { text: "count", className: "text-sm " },
    { text: "by", className: "text-sm" },
    { text: "exercising", className: "text-sm " },
    { text: "your", className: "text-sm " },
    { text: "right", className: "text-sm " },
    { text: "to", className: "text-sm" },
    { text: "vote.", className: "text-sm text-blue-500 dark:text-blue-500" }
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="absolute top-7 right-7">
        <ModeToggle />
      </div>
      <Image width={80} alt="" className="w-12 mx-3.5 min-h-fit rounded-full mb-3 object-cover object-bottom"
        height={80} src={'/msa.jpg'} />
      <div className="flex flex-col items-center justify-center h-[40rem]  ">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          Welcome to PollPulse:
        </p>
        <TypewriterEffectSmooth words={words} />
        <TypewriterEffectSmooth className="mt-0" words={words2} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link href="/voter/permit">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              Start Voting
            </button>
          </Link>

          <Link href="/admin/login">
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">Admin Login
            </button>
          </Link>
        </div>
        <div className="flex justify-center my-6">Developed by ATS Tech</div>
      </div>
    </main>
  );
}
