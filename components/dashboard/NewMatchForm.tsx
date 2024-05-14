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
import { Plus } from "lucide-react";
import { NewMatchupForm } from "./NewMatchupForm";
import { selectMaps } from "@/functions/selectMapper";
import { useState } from "react";
import { MatchToSave, MatchupToSave } from "@/lib/types";
import React from "react";

const formSchema = z.object({
  map: z
    .string({
      required_error: "Please select a map",
    })
    .min(1, "Please select a hero"),
  win: z.boolean().default(false).optional(),
});

export function NewMatchForm() {
  const [matchups, setMatchups] = useState<MatchupToSave[]>([]);
  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      map: "",
      win: false,
    },
  });

  function AddMatchup(matchup: MatchupToSave) {
    const copy = matchups;
    copy.push(matchup);
    setMatchups(copy);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const match: MatchToSave = {
      map: values.map,
      win: values.win ?? false,
      matchup: matchups,
    };
    console.log(match);
  }

  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger className="h-10 flex w-fit p-2 bg-amber-600 gap-1 text-white rounded-md items-center justify-center mt-4">
          <Plus className="w-5" /> New Matchup
        </DialogTrigger>
        <DialogContent className="min-w-fit bg-slate-50 border-none">
          <DialogHeader>
            <DialogTitle>New Matchup</DialogTitle>
          </DialogHeader>
          <NewMatchupForm addMatchup={AddMatchup} />
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                      {selectMaps()}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="win"
              render={({ field }) => (
                <FormItem className="flex flex-col p-2 rounded gap-[2px]">
                  <FormLabel>Win</FormLabel>
                  <FormControl>
                    <div className="h-10 bg-white border flex justify-center items-center p-3 rounded-sm">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="w-5 h-5"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-6 bg-orange-600" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
