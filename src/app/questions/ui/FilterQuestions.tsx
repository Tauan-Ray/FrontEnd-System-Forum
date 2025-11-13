"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { defaultParams, searchParams } from "../lib/types";
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

  const handleClearFilters = () => setSearch(defaultParams);
  return (
    <div className="w-full rounded-xl bg-white shadow-sm p-4 sm:p-6 space-y-6">
      <h3 className="text-lg font-semibold text-blue-medium border-b pb-2">
        Filtros de Pesquisa
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">
            Data inicial
          </Label>
          <Input
            id="start_date"
            type="date"
            value={search.registerStart ? search.registerStart.split("T")[0] : ""}
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
            className="h-11 text-base rounded-lg border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">
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
            className="h-11 text-base rounded-lg border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-gray-700">
            Categoria
          </Label>
          <CategorySelect search={search} setSearch={setSearch} />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <Label htmlFor="content" className="text-sm font-medium text-gray-700">
            Conteúdo
          </Label>
          <Input
            id="content"
            type="search"
            placeholder="Buscar por título ou descrição..."
            maxLength={255}
            value={search.search ?? ""}
            onChange={({ target }) =>
              setSearch((prev) => ({
                ...prev,
                search: target.value || undefined,
              }))
            }
            className="h-11 text-base rounded-lg border-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-end">
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
