import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const cardContent = [
    {
      title: "Played against",
      description:
        "Look at how different heroes match up against other heroes in the collected matchups",
      page: "played against",
      link: "/against",
    },
    {
      title: "Played with",
      description:
        "Look at how different heroes pair up with other heroes in the collected matchups",
      page: "played with",
      link: "/with",
    },
    {
      title: "Maps",
      description: "Take a look at your winrates across different maps",
      page: "maps",
      link: "/maps",
    },
    {
      title: "Matches",
      description: "Look through all the matches you have played",
      page: "matches",
      link: "/matches",
    },
  ];

  return (
    <div className="bg-extra_background flex w-full h-fit min-h-screen md:justify-center md:items-center">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 w-full pb-8 md:pb-0">
        {cardContent.map((card, index) => (
          <div
            key={index}
            className="text-center m-auto border-2 rounded-lg bg-main_background p-4 border-slate-200 items-center justify-center sm:w-5/6 md:w-full h-full flex flex-col gap-2"
          >
            <h2 className="font-semibold text-base sm:text-lg lg:text-2xl">
              {card.title}
            </h2>
            <p className="italic mb-4 text-sm sm:text-base lg:text-lg">
              {card.description}
            </p>
            <Link
              className="mt-auto mb-0 w-5/6 md:w-full xl:w-[90%] 2xl:w-5/6"
              href={`/mypage${card.link}`}
            >
              <Button className="bg-orange_highlighter hover:bg-orange-500 w-full text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg">
                Go to {card.page} page
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
