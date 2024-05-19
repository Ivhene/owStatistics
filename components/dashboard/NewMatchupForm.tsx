"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { selectHero } from "@/functions/selectMapper";
import { MatchupToSave } from "@/lib/types";
import { useEffect, useState } from "react";
import { getHeroRole } from "@/functions/getHeroRole";

interface NewMatchupFormProps {
  addMatchup: (matchup: MatchupToSave) => void;
  close: () => void;
  lastMatchup: MatchupToSave | null;
}

const formSchema = z.object({
  win: z.boolean().default(false).optional(),
  heroplayed: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  ally1: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  ally2: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  ally3: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  ally4: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  enemy1: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  enemy2: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  enemy3: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  enemy4: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
  enemy5: z
    .string({
      required_error: "Please select a hero",
    })
    .min(1, "Please select a hero"),
});

export function NewMatchupForm({
  addMatchup,
  close,
  lastMatchup,
}: NewMatchupFormProps) {
  const [rolePlayed, setRolePlayed] = useState(
    !lastMatchup ? "" : getHeroRole(lastMatchup.heroPlayed)
  );
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      win: false,
      heroplayed: !lastMatchup ? "" : lastMatchup.heroPlayed,
      ally1: !lastMatchup ? "" : lastMatchup.ally1,
      ally2: !lastMatchup ? "" : lastMatchup.ally2,
      ally3: !lastMatchup ? "" : lastMatchup.ally3,
      ally4: !lastMatchup ? "" : lastMatchup.ally4,
      enemy1: !lastMatchup ? "" : lastMatchup.enemy1,
      enemy2: !lastMatchup ? "" : lastMatchup.enemy2,
      enemy3: !lastMatchup ? "" : lastMatchup.enemy3,
      enemy4: !lastMatchup ? "" : lastMatchup.enemy4,
      enemy5: !lastMatchup ? "" : lastMatchup.enemy5,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.ally1 === values.ally2 ||
      values.ally2 === values.ally3 ||
      values.ally3 === values.ally4 ||
      values.heroplayed === values.ally1 ||
      values.heroplayed === values.ally2 ||
      values.heroplayed === values.ally3 ||
      values.heroplayed === values.ally4
    ) {
      setErrorMessage("* Duplicate allies");
      return;
    }
    if (values.enemy2 === values.enemy3 || values.enemy4 === values.enemy5) {
      setErrorMessage("* Duplicate enemies");
      return;
    }
    const matchup: MatchupToSave = {
      win: values.win ?? false,
      heroPlayed: values.heroplayed,
      ally1: values.ally1,
      ally2: values.ally2,
      ally3: values.ally3,
      ally4: values.ally4,
      enemy1: values.enemy1,
      enemy2: values.enemy2,
      enemy3: values.enemy3,
      enemy4: values.enemy4,
      enemy5: values.enemy5,
    };

    addMatchup(matchup);
  }

  return (
    <>
      <div className="text-red-600 text-lg font-semibold">{errorMessage}</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex bg-teal-100 p-6 pb-8">
            <FormField
              control={form.control}
              name="heroplayed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero played</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setRolePlayed(getHeroRole(value));
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                      {selectHero(
                        !lastMatchup ? "" : getHeroRole(lastMatchup.heroPlayed)
                      )}
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
          {rolePlayed !== "" && (
            <>
              <div className="flex flex-row gap-2 bg-blue-100 p-6 pb-8">
                <FormField
                  control={form.control}
                  name="ally1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ally 1</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero(
                            rolePlayed === "tank" ? "damage" : "tank"
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ally2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ally 2</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("damage")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ally3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ally 3</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero(
                            rolePlayed === "support" ? "damage" : "support"
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ally4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ally 4</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("support")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2 bg-rose-100 p-6 pb-8">
                <FormField
                  control={form.control}
                  name="enemy1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enemy 1</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("tank")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enemy2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enemy 2</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("damage")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enemy3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enemy 3</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("damage")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enemy4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enemy 4</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("support")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enemy5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enemy 5</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {selectHero("support")}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <div className="flex flew-row gap-4 mt-6">
            <Button className=" bg-orange-600" type="submit">
              Submit
            </Button>
            <Button onClick={close} type="button">
              Close
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
