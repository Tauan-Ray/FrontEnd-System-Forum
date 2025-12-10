"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  defaultCategoriesParams,
  searchCategoriesParams,
} from "../../lib/types";


type FilterCategoriesProps = {
  search: searchCategoriesParams;
  setSearch: React.Dispatch<React.SetStateAction<searchCategoriesParams>>;
};

export default function FilterCategories({
  search,
  setSearch,
}: FilterCategoriesProps) {
  const today = new Date().toLocaleDateString("en-CA");

  const hasFiltersApplied =
    search.CATEGORY ||
    search.ID_CT ||
    search.registerStart ||
    search.registerEnd;

  const handleClearFilters = () => setSearch(defaultCategoriesParams);
  return (
    <div className="w-full space-y-2 rounded-xl bg-white p-4 shadow-sm sm:p-6">
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
                <Label htmlFor="id-category">ID Categoria</Label>
                <Input
                  id="id-category"
                  type="search"
                  placeholder="Buscar pelo UUID da categoria"
                  maxLength={255}
                  value={search.ID_CT ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      ID_CT: target.value || undefined,
                    }))
                  }
                  className="h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  type="search"
                  placeholder="Buscar categoria pelo nome"
                  maxLength={255}
                  value={search.CATEGORY ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      CATEGORY: target.value || undefined,
                    }))
                  }
                  className="h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="start_date">Data inicial de criação</Label>
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
                <Label htmlFor="end_date">Data final de criação</Label>
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
