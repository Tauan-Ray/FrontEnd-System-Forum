import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="hidden md:flex flex-1 items-center space-x-2 relative max-w-md mx-4">
      <Input
        placeholder="Pesquise..."
        className="w-full rounded-lg border border-blue-primary bg-white px-4 py-2 text-base focus:outline-none"
      />
      <Search className="absolute right-4 text-slate-400" size={20} />
    </div>
  );
};

export default SearchInput;
