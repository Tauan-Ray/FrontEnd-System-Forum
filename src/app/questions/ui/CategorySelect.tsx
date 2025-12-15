"use client";

import { useEffect, useState } from "react";
import { getCategories, ResCategory } from "../lib/sessions";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CategorySelectProps = {
  setSelectedCategory: (value: string | null) => void;
  selectedCategory: string | null;
  setSearch: (value: string) => void;
};

export default function CategorySelect({
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectProps) {
  const [allCategories, setAllCategories] = useState<ResCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getCategories()
      .then((res) => {
        if (res?.data) {
          const categories = res.data._data;
          setAllCategories(categories);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Button
        variant={"outline"}
        className="flex w-full items-start justify-start text-gray-medium hover:bg-white"
        onClick={() => setOpen(true)}
        disabled={isLoading}
        type="button"
      >
        {selectedCategory ?? "Selecione uma categoria"}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <CommandInput placeholder="Procure por uma categoria..." />
        <CommandList>
          <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
          <CommandGroup heading="Categorias">
            {allCategories.map((category) => (
              <CommandItem
                key={category.ID_CT}
                onSelect={() => {
                  setSelectedCategory(category.CATEGORY);
                  setSearch(category.ID_CT);
                  setOpen(false);
                }}
              >
                <span>{category.CATEGORY}</span>
                {selectedCategory === category.CATEGORY && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
