"use client";

import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

/* <SignedOut>
        <Button>
          <Link href="/sign-in">Login</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button>
          <Link href="/test">To restricted page</Link>
        </Button>
      </SignedIn> */

export default function Home() {
  return (
    <div className="w-5/6 flex flex-col max-w-3xl mt-16 m-auto bg-slate-100 text-center shadow-xl shadow-slate-300">
      <Navbar />
      <img src="/landingPageImage.avif" className="w-full" />
      <div className="p-4 flex flex-col gap-2">
        <h1 className="font-bold text-3xl ">Overwatch Statistics</h1>
        <p className="font-semibold text-">
          A new way of looking at statistics from your Overwatch game
        </p>
        <p className="font-light text-lg">
          See your winrate with and against all of the heroes in the game, or
          check out the winrates you have on each map. Both sets off stats can
          be filtered by which hero you played
        </p>
        <SignedOut>
          <Button className="bg-orange-600 font-bold w-48 h-16 text-xl rounded-xl m-auto mt-4 mb-4">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}
