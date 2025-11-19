"use client";

import { FiltersProps } from "@/app/perfil/lib/types";
import AllAnswersUser from "./AllAnswersUser";
import { useEffect } from "react";
import { defaultParams } from "@/app/questions/lib/types";

export default function AnswersUser({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: FiltersProps) {
  const resetFilters = () => setSearch(defaultParams);

  useEffect(() => {
    resetFilters();
  }, []);

  return (
    <div className="pt-10 flex flex-col gap-5 items-center">
      <div className="w-full">
        <AllAnswersUser
          search={search}
          setSearch={setSearch}
          debouncedSearch={debouncedSearch}
          setDebouncedSearch={setDebouncedSearch}
        />
      </div>
    </div>
  );
}
