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
    <div className="bg-slate-100 flex w-full h-full justify-center items-center">
      <div className="grid grid-cols-4 gap-8 p-8 w-full">
        {cardContent.map((card) => (
          <div className="text-center border-2 rounded-lg bg-slate-50 p-4 border-slate-200 items-center justify-center w-full flex flex-col gap-2">
            <h2 className="font-semibold text-2xl">{card.title}</h2>
            <p className="italic mb-4">{card.description}</p>
            <Link href={`/mypage${card.link}`}>
              <Button className="mt-auto mb-0 bg-orange-500 hover:bg-orange-700">
                Go to {card.page} page
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
