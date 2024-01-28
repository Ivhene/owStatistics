import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-gray-100 p-2 flex">
      <img src="/Overwatch_2_logo.png" className="h-full" />
      <SignedIn>
        <Button className="mr-3 ml-auto mt-auto mb-auto bg-orange-600 font-bold">
          <Link href="/test">My page</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button className="mr-3 ml-auto mt-auto mb-auto bg-orange-600 font-bold">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button className="mt-auto mb-auto w-24 mr-1">
          <Link href="sign-up">Sign Up</Link>
        </Button>
      </SignedOut>
    </nav>
  );
}
