"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { defaultParams, searchParams } from "../lib/types";
import CategorySelect from "./CategorySelect";
import { XCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

type FilterQuestionsProps = {
  search: searchParams;
  setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
};

export default function FilterQuestions({
  search,
  setSearch,
}: FilterQuestionsProps) {
  const today = new Date().toLocaleDateString("en-CA");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const hasFiltersApplied =
    search.registerStart || search.registerEnd || search.search || search.ID_CT;

  const handleClearFilters = () => {
    setSearch(defaultParams);
    setSelectedCategory(null);
  };
  return (
    <div className="w-full space-y-6 rounded-xl bg-white p-4 shadow-sm sm:p-6">
      <Accordion type="single" collapsible defaultValue="filters-accordion">
        <AccordionItem value="filters-accordion">
          <div className="grid grid-cols-12 gap-2">
            <div
              className={`${
                hasFiltersApplied
                  ? "col-span-8 pr-4 sm:pr-0 md:col-span-11 md:pr-12"
                  : "col-span-12"
              }`}
            >
              <AccordionTrigger className="col-span-2 p-1 text-2xl font-bold">
                Filtros
              </AccordionTrigger>
            </div>
            {hasFiltersApplied && (
              <div className="col-span-4 flex items-center justify-end gap-3 md:col-span-1">
                <Button
                  variant="link"
                  onClick={handleClearFilters}
                  className="rounded-full"
                >
                  <XCircle size={18} />
                  Limpar
                </Button>
              </div>
            )}
          </div>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-6 px-1 pt-2 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="content">Conteúdo</Label>
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
                  className="h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Categoria</Label>
                <CategorySelect
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  setSearch={(value) =>  setSearch((prev) => ({ ...prev, ID_CT: value }))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="start_date">Data inicial</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={search.registerStart?.split("T")[0] ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      registerStart: target.value
                        ? target.value + "T00:00:00"
                        : undefined,
                    }))
                  }
                  max={today}
                  className="block h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="end_date">Data final</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={search.registerEnd?.split("T")[0] ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      registerEnd: target.value
                        ? target.value + "T00:00:00"
                        : undefined,
                    }))
                  }
                  max={today}
                  className="block h-11"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
