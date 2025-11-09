"use client";

import { useState } from "react";
import FilterQuestions from "./ui/FilterQuestions";
import { defaultParams, searchParams } from "./lib/types";
import AllQuestions from "./ui/AllQuestions";

export default function PageAllQuestions () {
  const [search, setSearch] = useState<searchParams>(defaultParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchParams>(defaultParams);


  return (
    <div className="pt-10 flex flex-col gap-5 items-center">
      <h1 className="font-mono font-bold text-2xl sm:text-3xl text-center">
        Filtrar perguntas
      </h1>
      <FilterQuestions search={search} setSearch={setSearch} />

      <div className="w-full sm:w-8/12">
        <AllQuestions search={search} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
};