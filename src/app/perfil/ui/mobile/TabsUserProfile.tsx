"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileUser from "../desktop/profile/ProfileUser";
import { useState } from "react";
import { defaultParams, searchParams } from "@/app/questions/lib/types";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";
import AllQuestionsUser from "../desktop/activity/questions/AllQuestionUser";
import AllAnswersUser from "../desktop/activity/answers/AllAnswersUser";

export default function TabsUserProfile() {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);

  return (
    <Tabs
      defaultValue="profile"
      className="w-full h-full bg-white rounded-2xl p-4 flex flex-col items-center"
    >
      <TabsList className="grid grid-cols-3 w-full bg-blue-primary p-1 rounded-xl h-auto">
        <TabsTrigger
          value="profile"
          className="data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm text-sm rounded-lg p-2"
        >
          Perfil
        </TabsTrigger>

        <TabsTrigger
          value="questions"
          className="data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm text-sm rounded-lg p-2"
        >
          Perguntas
        </TabsTrigger>

        <TabsTrigger
          value="answers"
          className="data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm text-sm rounded-lg p-2"
        >
          Respostas
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 mt-4">
        <TabsContent value="profile" className="h-full">
          <ProfileUser />
        </TabsContent>

        <TabsContent value="questions" className="h-full">
          <div className="space-y-4">
            <FilterQuestions search={search} setSearch={setSearch} />
            <AllQuestionsUser search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
            </div>
        </TabsContent>

        <TabsContent value="answers" className="h-full">
          <div className="space-y-4">
            <FilterQuestions search={search} setSearch={setSearch} />
            <AllAnswersUser search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
