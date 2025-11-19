"use client";

import { useState } from "react";
import { defaultParams, searchParams } from "@/app/questions/lib/types";
import AllQuestionsUser from "./AllQuestionUser";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";

export default function TabQuestionsUsers () {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);


  return (
    <div className="pt-10 flex flex-col gap-5 items-center">
      <FilterQuestions search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllQuestionsUser search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
};