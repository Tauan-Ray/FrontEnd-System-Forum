"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { searchParams } from "../lib/types";
import CategorySelect from "./CategorySelect";
import { XCircle } from "lucide-react";

type FilterQuestionsProps = {
  search: searchParams;
  setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
};

export default function FilterQuestions({
  search,
  setSearch,
}: FilterQuestionsProps) {
  const today = new Date().toLocaleDateString("en-CA");

  const handleClearFilters = () => {
    setSearch({
      registerStart: undefined,
      registerEnd: undefined,
      ID_CT: undefined,
    });
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="start_date"
            className="pl-1 text-sm font-medium text-gray-700"
          >
            Data inicial
          </Label>
          <Input
            id="start_date"
            type="date"
            value={
              search.registerStart ? search.registerStart.split("T")[0] : ""
            }
            onChange={({ target }) =>
              setSearch((prev) => ({
                ...prev,
                registerStart: target.value
                  ? target.value + "T00:00:00"
                  : undefined,
              }))
            }
            min="2010-01-01"
            max={today}
            className="h-12 text-base rounded-xl border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="end_date"
            className="pl-1 text-sm font-medium text-gray-700"
          >
            Data final
          </Label>
          <Input
            id="end_date"
            type="date"
            value={search.registerEnd ? search.registerEnd.split("T")[0] : ""}
            onChange={({ target }) =>
              setSearch((prev) => ({
                ...prev,
                registerEnd: target.value
                  ? target.value + "T00:00:00"
                  : undefined,
              }))
            }
            min="2010-01-01"
            max={today}
            className="h-12 text-base rounded-xl border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="category"
            className="pl-1 text-sm font-medium text-gray-700"
          >
            Categoria
          </Label>
          <div className="h-12">
            <CategorySelect search={search} setSearch={setSearch} />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="flex items-center gap-2 text-sm sm:text-base hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <XCircle size={18} />
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
