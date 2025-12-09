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
import { defaultAnswerParams, searchAnswerParams } from "../../lib/types";
import CategorySelect from "@/app/questions/ui/CategorySelect";

type FilterAnswersProps = {
  search: searchAnswerParams;
  setSearch: React.Dispatch<React.SetStateAction<searchAnswerParams>>;
};

export default function FilterAnswers({
  search,
  setSearch,
}: FilterAnswersProps) {
  const today = new Date().toLocaleDateString("en-CA");

  const hasFiltersApplied =
    search.USERNAME ||
    search.EMAIL ||
    search.search ||
    search.ID_CT ||
    search.registerStart ||
    search.registerEnd;

  const handleClearFilters = () => setSearch(defaultAnswerParams);
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
                <Label htmlFor="content">Conteúdo</Label>
                <Input
                  id="content"
                  type="search"
                  placeholder="Buscar conteúdo da resposta..."
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
                  search={search}
                  setSearch={(value: string) =>
                    setSearch((prev) => ({ ...prev, ID_CT: value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="search"
                  placeholder="Buscar pelo username do usuário..."
                  maxLength={255}
                  value={search.USERNAME ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      USERNAME: target.value || undefined,
                    }))
                  }
                  className="h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="search"
                  placeholder="Buscar pelo e-mail do usuário"
                  maxLength={255}
                  value={search.EMAIL ?? ""}
                  onChange={({ target }) =>
                    setSearch((prev) => ({
                      ...prev,
                      EMAIL: target.value || undefined,
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
