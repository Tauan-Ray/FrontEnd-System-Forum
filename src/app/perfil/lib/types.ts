import { searchParams } from "@/app/questions/lib/types";

export type FiltersProps = {
  search: searchParams;
  setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
  debouncedSearch: searchParams;
  setDebouncedSearch: React.Dispatch<React.SetStateAction<searchParams>>;
};