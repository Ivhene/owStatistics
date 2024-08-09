import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full h-16 p-2 flex">
      <img src="/Overwatch_2_logo.png" className="h-full" />
      <SignedIn>
        <Button className="mr-3 ml-auto mt-auto mb-auto bg-orange_highlighter hover:bg-orange-400 active:bg-orange_highlighter font-bold">
          <Link href="/mypage">My page</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button className="mr-3 ml-auto mt-auto mb-auto bg-orange_highlighter hover:bg-orange-400 active:bg-orange_highlighter font-bold">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button className="mt-auto mb-auto w-24 mr-1 bg-overwatch_blue_main hover:bg-overwatch_gray_main active:bg-overwatch_blue_main">
          <Link href="sign-up">Sign Up</Link>
        </Button>
      </SignedOut>
    </nav>
  );
}
