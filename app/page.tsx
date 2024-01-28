"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-5/6 pt-20 pb-20 flex justify-center items-center">
      <SignedOut>
        <Button>
          <Link href="/sign-in">Login</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button>
          <Link href="/test">To restricted page</Link>
        </Button>
      </SignedIn>
    </div>
  );
}
