"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { defaultParams, searchParams } from "@/app/questions/lib/types";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";
import AnswersUser from "./answers/AnswersUser";
import QuestionsUser from "./questions/QuestionsUser";

export default function TabsActivity() {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);

  return (
    <div>
      <FilterQuestions search={search} setSearch={setSearch} />
      <Tabs
        defaultValue="questions"
        className="p-6 rounded-2xl bg-white max-w-full"
      >
        <TabsList className="flex w-full bg-blue-primary/20 p-1 rounded-xl h-auto">
          <TabsTrigger
            value="questions"
            className="flex-1 text-sm rounded-lg px-4 py-2 transition-all
        data-[state=active]:bg-blue-primary data-[state=active]:text-white
        data-[state=active]:shadow
        hover:bg-blue-primary/10 p-2"
          >
            Perguntas
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            className="flex-1 text-sm rounded-lg px-4 py-2 transition-all
        data-[state=active]:bg-blue-primary data-[state=active]:text-white
        data-[state=active]:shadow
        hover:bg-blue-primary/10 p-2"
          >
            Respostas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-4">
          <div className="space-y-4">
            <QuestionsUser
              search={search}
              setSearch={setSearch}
              debouncedSearch={debouncedSearch}
              setDebouncedSearch={setDebouncedSearch}
            />
          </div>
        </TabsContent>

        <TabsContent value="answers" className="mt-4">
          <div className="space-y-4">
            <AnswersUser
              search={search}
              setSearch={setSearch}
              debouncedSearch={debouncedSearch}
              setDebouncedSearch={setDebouncedSearch}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
