"use client";

import { defaultParams, searchParams } from "@/app/questions/lib/types";
import FilterQuestions from "@/app/questions/ui/FilterQuestions";
import { useState } from "react";
import AllAnswersAdmin from "../answers/AllAnswersAdmin";


export default function TabAnswers() {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);

  return (
    <div className="flex w-full flex-col items-center gap-5 pt-10">
      <FilterQuestions search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllAnswersAdmin search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
}
