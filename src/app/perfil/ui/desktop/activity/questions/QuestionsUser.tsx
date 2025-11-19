"use client"

import { defaultParams } from "@/app/questions/lib/types";
import AllQuestionsUser from "./AllQuestionUser";
import { FiltersProps } from "@/app/perfil/lib/types";
import { useEffect } from "react";


export default function TabQuestionsUsers ({ search, setSearch, debouncedSearch, setDebouncedSearch }: FiltersProps) {
  const resetFilters = () => setSearch(defaultParams)

  useEffect(() => {
    resetFilters()
  }, [])

  return (
    <div className="pt-10 flex flex-col gap-5 items-center">
      <div className="w-full">
        <AllQuestionsUser search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
};