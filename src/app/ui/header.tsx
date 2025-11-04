import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserCircle2 } from "lucide-react";
import MenuMobile from "./menuMobile";
import SearchInput from "./searchInput";

export const Header = () => {
  return (
    <header className="w-full bg-white/80 border-b border-b-gray-300 p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            title="Página inicial"
            className="flex items-center shrink-0"
          >
            <Image src="/logo.svg" alt="Logo" width={100} height={32} />
          </Link>

          <SearchInput />

          <div className="hidden md:flex items-center gap-4">
            <Button className="rounded-md px-5 py-3 text-sm font-medium text-white bg-blue-medium hover:bg-blue-hover transition">
              <Link href="/auth/signin">Login</Link>
            </Button>

            <Button className="rounded-md px-5 py-3 text-sm font-medium text-white bg-blue-medium hover:bg-blue-hover transition">
              <Link href="/auth/signup">Cadastro</Link>
            </Button>

            <Link href="/">
              <UserCircle2
                size={36}
                className="text-blue-light hover:text-blue-hover transition"
              />
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <MenuMobile />
          </div>
        </div>
      </div>
    </header>
  );
};
