"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NewMatchForm } from "../dashboard/NewMatchForm";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { deleteData } from "@/lib/API";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // close new match dialog
  function closeDialog() {
    setOpen(!open);
  }

  return (
    <div className="h-16 flex items-center justify-between bg-slate-200">
      <nav className="h-full flex flex-row items-center text-xs sm:text-sm lg:text-base 2xl:text-lg">
        <Link
          href="/"
          className="hover:cursor-pointer h-full w-auto p-2 hover:bg-slate-600"
        >
          <Image
            alt="Overwatch 2 logo"
            src="/Overwatch_2_logo.png"
            width={100}
            height={100}
            className="h-full w-auto"
          />
        </Link>
        <Link
          href="/dashboard"
          className="h-full flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 hover:text-white p-4 border-r"
        >
          Played Against
        </Link>
        <Link
          href="/dashboard"
          className="h-full flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 hover:text-white p-4 border-r"
        >
          Played With
        </Link>
        <Link
          href="/dashboard"
          className="h-full flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 hover:text-white p-4 border-r"
        >
          Any Player Against
        </Link>
        <Link
          href="/dashboard"
          className="h-full flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 hover:text-white p-4 border-r"
        >
          Any Player With
        </Link>
        <Link
          href="/dashboard"
          className="h-full flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 hover:text-white p-4 border-r"
        >
          Played on maps
        </Link>
      </nav>

      <div className="pr-4 flex items-center space-x-4">
        <Dialog open={open}>
          <DialogTrigger
            onClick={() => setOpen(!open)}
            className="h-10 flex w-32 p-2 bg-orange-500 gap-1 text-white rounded-md items-center justify-center"
          >
            <Plus className="w-5" /> New match
          </DialogTrigger>
          <DialogContent className="min-w-fit bg-slate-50 border-none max-h-screen">
            <DialogHeader>
              <DialogTitle>New Match</DialogTitle>
            </DialogHeader>
            <NewMatchForm close={closeDialog} />
          </DialogContent>
        </Dialog>
        <Button
          onClick={async () => {
            await deleteData();
            window.location.reload();
          }}
          className="bg-red-600"
        >
          Delete data
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
