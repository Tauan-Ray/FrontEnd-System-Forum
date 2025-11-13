"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import MenuMobile from "./menuMobile";
import SearchInput from "./searchInput";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function Header() {
  const { user, logout } = useAuthStore();

  const handleLogoutUser = async () => {
    await logout();

    toast.info('Logout', {
      description: 'Sua sessão foi encerrada com sucesso!'
    })
  }

  return (
    <header className="w-full bg-white/80 border-b border-b-gray-300 p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 flex-row-reverse sm:flex-row">
          <Link
            href="/"
            title="Página inicial"
            className="flex items-center shrink-0"
          >
            <Image src="/logo.svg" alt="Logo" width={100} height={32} />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button onClick={handleLogoutUser} className="rounded-md px-5 py-3 text-sm font-medium bg-blue-medium hover:bg-blue-hover transition">
                Logout
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button className="rounded-md px-5 py-3 text-sm font-medium bg-blue-medium hover:bg-blue-hover transition">
                  Login
                </Button>
              </Link>
            )}

            <Link href="/auth/signin">
              <Button className="rounded-md px-5 py-3 text-sm font-medium bg-blue-medium hover:bg-blue-hover transition">
                Cadastro
              </Button>
            </Link>

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
}
