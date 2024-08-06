"use client";

import { Match } from "@/lib/types";
import { DataTable } from "./matches-table/data-table";
import { columns } from "./matches-table/columns";

interface MatchesListProps {
  matches: Match[];
}

export function MatchesList({ matches }: MatchesListProps) {
  return (
    <div className="bg-extra_background p-6 h-full overflow-auto">
      <DataTable columns={columns} data={matches} />
    </div>
  );
}
