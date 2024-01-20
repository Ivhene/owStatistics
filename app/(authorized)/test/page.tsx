import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default function TestPage() {
  const { userId } = auth();
  return (
    <div>
      Logged in as {userId} <UserButton afterSignOutUrl="/" />
      <Button>
        <Link href="/">To main page</Link>
      </Button>
    </div>
  );
}
