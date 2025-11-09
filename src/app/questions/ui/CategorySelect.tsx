"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getCategories, ResCategory } from "../lib/sessions";
import { searchParams } from "../lib/types";

type CategorySelectProps = {
  search: searchParams
  setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
};

export default function CategorySelect({ search, setSearch }: CategorySelectProps) {
  const [allCategories, setAllCategories] = useState<ResCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getCategories()
      .then((res) => {
        if (res?.data) {
          setAllCategories(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectCategory = (value: string) => {
    setSearch((prev) => ({ ...prev, ID_CT: value }));
  };

  return (
    <Select onValueChange={handleSelectCategory} disabled={isLoading} value={search.ID_CT || ""}>
      <SelectTrigger>
        <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          {allCategories.map((category) => (
            <SelectItem key={category.ID_CT} value={category.ID_CT}>
              {category.CATEGORY}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
