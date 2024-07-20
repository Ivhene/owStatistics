import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NavbarLinks() {
  return (
    <React.Fragment>
      <Link
        href="/"
        className="hover:cursor-pointer h-full w-auto p-1 sm:p-2 hover:bg-overwatch_gray_main"
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
        className="h-full items-center justify-start hover:cursor-pointer hover:bg-overwatch_gray_main p-2 md:p-4 flex text-left"
      >
        Played Against
      </Link>
      <Link
        href="/mypage/with"
        className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-overwatch_gray_main p-2 md:p-4 text-left"
      >
        Played With
      </Link>
      <Link
        href="/mypage/maps"
        className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-overwatch_gray_main p-2 md:p-4 text-left"
      >
        Maps
      </Link>
      <Link
        href="/mypage/matches"
        className="h-full flex items-center justify-start hover:cursor-pointer hover:bg-overwatch_gray_main p-2 md:p-4 text-left"
      >
        Matches
      </Link>
    </React.Fragment>
  );
}
