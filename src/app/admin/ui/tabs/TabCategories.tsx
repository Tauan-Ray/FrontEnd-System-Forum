"use client";

import { useState } from "react";
import { defaultCategoriesParams, searchCategoriesParams } from "../../lib/types";
import AllCategories from "../categories/AllCategories";
import FilterCategories from "../categories/FilterCategories";

export default function TabsCategories() {
  const [search, setSearch] = useState<searchCategoriesParams>(defaultCategoriesParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchCategoriesParams>(defaultCategoriesParams);  

  return (
    <div className="flex w-full flex-col items-center gap-5 pt-10">
      <FilterCategories search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllCategories search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
}
