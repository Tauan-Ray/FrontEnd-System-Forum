"use client";

import { defaultUserParams, searchUserParams } from "../../lib/types";
import { useState } from "react";
import AllUsers from "../users/AllUsers";
import FilterUsers from "../users/FilterUsers";

export default function TabUser() {
  const [search, setSearch] = useState<searchUserParams>(defaultUserParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchUserParams>(defaultUserParams);

  return (
    <div className="flex w-full flex-col items-center gap-5 pt-10">
      <FilterUsers search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllUsers search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
}
