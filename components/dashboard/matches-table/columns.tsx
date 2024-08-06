"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Match } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Match>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "matchID",
    header: "MatchID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "map",
    header: "Map",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
];
