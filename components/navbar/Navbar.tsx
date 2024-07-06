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
import { AlignJustify, Plus, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { deleteData } from "@/lib/API";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function toggleMobileNavbar() {
    setMobileSidebarOpen(!mobileSidebarOpen);
  }

  // close new match dialog
  function closeDialog() {
    setOpen(!open);
  }

  return (
    <div className="flex-col">
      <div className="h-8 sm:h-12 md:h-16 flex items-center justify-between bg-slate-200 sm:p-0">
        <nav className="h-full hidden sm:flex flex-row items-center text-xs sm:text-sm lg:text-base 2xl:text-lg mr-2 sm:ml-0">
          <Link
            href="/"
            className="hover:cursor-pointer h-full w-auto p-1 sm:p-2 hover:bg-slate-600"
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
            href="/mypage/against"
            className="h-full items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r flex text-left"
          >
            Played Against
          </Link>
          <Link
            href="/mypage/with"
            className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r text-left"
          >
            Played With
          </Link>
          <Link
            href="/mypage/maps"
            className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r text-left"
          >
            Maps
          </Link>
          <Link
            href="/mypage/matches"
            className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r text-left"
          >
            Matches
          </Link>
        </nav>
        <div className="sm:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-600"
            onClick={toggleMobileNavbar}
          >
            {mobileSidebarOpen ? <X /> : <AlignJustify />}
          </button>
        </div>

        <div className="pr-2 md:pr-4 flex items-center space-x-2 md:space-x-4">
          <Dialog open={open}>
            <DialogTrigger
              onClick={() => setOpen(!open)}
              className="h-6 sm:h-8 md:h-10 flex w-16 sm:w-24 md:w-32 md:p-2 md:text-base text-[9px] sm:text-xs bg-orange-500 md:gap-1 text-white rounded-md items-center justify-center"
            >
              <Plus className="hidden sm:block sm:h-4 sm:w-4 md:h-5 md:w-5" />{" "}
              New match
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
            className="bg-red-600 w-16 h-6 sm:h-8 md:h-10 text-[9px] flex sm:w-24 md:w-32 md:p-2 md:text-base sm:text-xs md:gap-1 text-white rounded-md items-center justify-center"
          >
            Delete data
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {mobileSidebarOpen && (
        <nav className="sm:hidden text-xs justify-start">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="hover:cursor-pointer h-full w-auto p-1 sm:p-2 hover:bg-slate-600 hidden sm:block"
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
              href="/dashboard/against"
              className="h-full items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r flex text-left"
            >
              Played Against
            </Link>
            <Link
              href="/dashboard/with"
              className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r text-left"
            >
              Played With
            </Link>
            <Link
              href="/dashboard/maps"
              className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-slate-600 hover:text-white p-2 md:p-4 border-r text-left"
            >
              Maps
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
