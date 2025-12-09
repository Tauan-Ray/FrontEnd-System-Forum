"use client";

import { useState } from "react";
import AllAnswersAdmin from "../answers/AllAnswersAdmin";
import FilterAnswers from "../answers/FilterAnswers";
import { defaultAnswerParams, searchAnswerParams } from "../../lib/types";


export default function TabAnswers() {
  const [search, setSearch] = useState<searchAnswerParams>(defaultAnswerParams);
  const [debouncedSearch, setDebouncedSearch] =
    useState<searchAnswerParams>(defaultAnswerParams);

  return (
    <div className="flex w-full flex-col items-center gap-5 pt-10">
      <FilterAnswers search={search} setSearch={setSearch} />

      <div className="w-full">
        <AllAnswersAdmin search={search} setSearch={setSearch} debouncedSearch={debouncedSearch} setDebouncedSearch={setDebouncedSearch} />
      </div>
    </div>
  );
}
