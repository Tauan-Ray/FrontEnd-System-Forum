"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabQuestionsUsers from "./questions/QuestionsUser";
import { useState } from "react";
import { defaultParams, searchParams } from "@/app/questions/lib/types";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";

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
        <TabsList className="grid grid-cols-2 w-full mb-4 bg-blue-primary p-1 rounded-xl h-auto">
          <TabsTrigger
            value="questions"
            className="data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm rounded-lg p-2"
          >
            Perguntas
          </TabsTrigger>
          <TabsTrigger
            value="answers"
            className="data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm rounded-lg p-2"
          >
            Respostas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-4">
          <div className="space-y-4">
            <TabQuestionsUsers search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
