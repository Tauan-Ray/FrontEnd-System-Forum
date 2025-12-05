"use client";

import { useState } from "react";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";
import { defaultParams, searchParams } from "@/app/questions/lib/types";
import AllQuestionAdmin from "../questions/AllQuestionsAdmin";

export default function TabsQuestions() {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);

  return (
    <div className="flex w-full flex-col items-center gap-5 pt-10">
      <FilterQuestions search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllQuestionAdmin search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
}
