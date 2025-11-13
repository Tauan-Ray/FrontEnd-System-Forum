import { Input } from "@/components/ui/input";

export default function SearchInput() {
  return (
    <Input
      placeholder="Pesquise por titulo ou descrição..."
      className="w-full rounded-lg border border-blue-primary bg-white px-4 py-2 text-base focus:outline-none"
    />
  );
}
