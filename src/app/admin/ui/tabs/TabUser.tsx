"use client";

import { useAuthStore } from "@/store/useAuthStore";
import OneUser from "../users/OneUser";
import { defaultUserParams, searchUserParams } from "../../lib/types";
import { useState } from "react";
import AllUsers from "../users/AllUsers";

export default function TabUser() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState<searchUserParams>(defaultUserParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchUserParams>(defaultUserParams);

  return (
    <div className="pt-10 flex flex-col gap-5 items-center">
        {/* <FilterQuestions search={search} setSearch={setSearch} /> */}

        <div className="w-full ">
            <AllUsers search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
        </div>
    </div>
  );
}
