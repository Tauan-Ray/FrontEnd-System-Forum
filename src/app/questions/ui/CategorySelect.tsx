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

type CategorySelectProps =
  | {
      search: searchParams;
      setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
      value?: never;
      onChange?: never;
    }
  | {
      value?: string;
      onChange?: (value: string) => void;
      search?: never;
      setSearch?: never;
    };

export default function CategorySelect(props: CategorySelectProps) {
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

  const handleChange = (value: string) => {
    if (props?.setSearch) {
      props.setSearch((prev) => ({ ...prev, ID_CT: value }));
    } else if (props.onChange) {
      props.onChange(value);
    }
  };

  const currentValue =
    props?.search
      ? props.search.ID_CT || ""
      : props.value || "";

  return (
    <Select
      onValueChange={handleChange}
      value={currentValue}
      disabled={isLoading}
    >
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
