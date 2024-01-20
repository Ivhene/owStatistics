"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
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
