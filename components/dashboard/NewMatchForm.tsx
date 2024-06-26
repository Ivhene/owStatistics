"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Trash } from "lucide-react";
import { NewMatchupForm } from "./NewMatchupForm";
import { selectMaps, selectResult } from "@/functions/selectMapper";
import { useState } from "react";
import { MatchToSave, MatchupToSave } from "@/lib/types";
import React from "react";
import { addNewGame } from "@/lib/API";
import { Table, TableCell, TableRow } from "../ui/table";

interface NewMatchFormProps {
  close: () => void;
}

const formSchema = z.object({
  map: z
    .string({
      required_error: "Please select a map",
    })
    .min(1, "Please select a map"),
  result: z
    .string({
      required_error: "Please select a result",
    })
    .min(1, "Please select a result"),
  role: z
    .string({
      required_error: "Please select a role",
    })
    .min(1, "Please select a role"),
});

export function NewMatchForm({ close }: NewMatchFormProps) {
  const [matchups, setMatchups] = useState<MatchupToSave[]>([]);
  const [open, setOpen] = useState(false);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      map: "",
      result: "",
      role: "",
    },
  });

  function CloseDialog() {
    setOpen(false);
  }

  function AddMatchup(matchup: MatchupToSave) {
    setMatchups((prevMatchups) => [...prevMatchups, matchup]);
    CloseDialog();
  }

  function DeleteMatchup(matchup: MatchupToSave) {
    setMatchups((prevMatchups) => prevMatchups.filter((m) => m !== matchup));
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (matchups.length > 0) {
      const match: MatchToSave = {
        map: values.map,
        result: values.result,
        role: values.role,
        matchup: matchups,
      };

      close();
      await addNewGame(match);
      window.location.reload();
    }
  }

  function checkValues() {
    const values = form.getValues();
    return values.map !== "" && values.result !== "" && values.role !== "";
  }

  return (
    <div className="flex flex-col h-fit max-h-screen ">
      <div className="h-auto">
        <Dialog open={open}>
          <DialogTrigger
            onClick={() => setOpen(!open)}
            disabled={!checkValues()}
            className="h-10 flex w-fit p-2 disabled:bg-opacity-75 disabled:border-neutral-900 bg-amber-600 gap-1 text-white rounded-md items-center justify-center mt-4"
          >
            <Plus className="w-5" /> New Matchup
          </DialogTrigger>
          <DialogContent className="min-w-fit bg-slate-50 border-none">
            <DialogHeader>
              <DialogTitle>New Matchup</DialogTitle>
            </DialogHeader>
            <NewMatchupForm
              close={CloseDialog}
              addMatchup={AddMatchup}
              lastMatchup={
                matchups.length === 0 ? null : matchups[matchups.length - 1]
              }
              role={form.getValues().role}
            />
          </DialogContent>
        </Dialog>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="map"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Map</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select map" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        {selectMaps("")}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={matchups.length > 0}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        <SelectItem value="tank">Tank</SelectItem>
                        <SelectItem value="damage">Damage</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-64">
                        {selectResult()}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4 mt-6">
              <Button className=" bg-orange-600" type="submit">
                Submit
              </Button>
              <Button onClick={close} type="button">
                Close
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex-grow overflow-y-auto mt-6 mb-16">
        <Table>
          {matchups.map((matchup, index) => (
            <TableRow className="text-sm text-white" key={index}>
              {matchup.win ? (
                <TableCell className="font-light bg-blue-600">Win</TableCell>
              ) : (
                <TableCell className="font-light bg-red-600">Loss</TableCell>
              )}
              <TableCell className="bg-green-600">
                {matchup.heroPlayed}
              </TableCell>
              <TableCell className="bg-cyan-400">{matchup.ally1}</TableCell>
              <TableCell className="bg-cyan-400">{matchup.ally2}</TableCell>
              <TableCell className="bg-cyan-400">{matchup.ally3}</TableCell>
              <TableCell className="bg-cyan-400">{matchup.ally4}</TableCell>
              <TableCell className="bg-red-900">{matchup.enemy1}</TableCell>
              <TableCell className="bg-red-900">{matchup.enemy2}</TableCell>
              <TableCell className="bg-red-900">{matchup.enemy3}</TableCell>
              <TableCell className="bg-red-900">{matchup.enemy4}</TableCell>
              <TableCell className="bg-red-900">{matchup.enemy5}</TableCell>
              <TableCell
                onClick={() => DeleteMatchup(matchup)}
                className="bg-red-600 cursor-pointer"
              >
                <Trash />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}
