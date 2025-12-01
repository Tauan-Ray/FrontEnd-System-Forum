"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import MenuMobile from "./menuMobile";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { webConfig } from "@/lib/settings";

export default function Header() {
  const { user, logout, loading } = useAuthStore();

  const handleLogoutUser = async () => {
    await logout();

    toast.info("Logout", {
      description: "Sua sessão foi encerrada com sucesso!",
    });

    redirect("/");
  };

  const handleRedirectToProfile = () => {
    if (!user) return;

    redirect(`/perfil`);
  };

  return (
    <header className="w-full bg-white/80 border-b border-b-gray-300 p-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 flex-row-reverse md:flex-row">
          <Link
            href="/"
            title="Página inicial"
            className="flex items-center shrink-0"
          >
            <Image src="/logo.svg" alt="Logo" width={100} height={32} />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {loading && (
              <>
                <Skeleton className="h-10 w-24 rounded-md bg-gray-300" />
                <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
              </>
            )}

            {!loading && !user && (
              <>
                <Link href="/auth/signin">
                  <Button className="rounded-md px-5 py-3 text-sm bg-blue-medium hover:bg-blue-hover">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button className="rounded-md px-5 py-3 text-sm bg-blue-medium hover:bg-blue-hover">
                    Cadastro
                  </Button>
                </Link>

                <UserCircle2
                  size={32}
                  className="text-blue-light cursor-pointer"
                  onClick={() => redirect("/auth/signin")}
                />
              </>
            )}

            {!loading && user && (
              <>
                <Button
                  onClick={handleLogoutUser}
                  className="rounded-md px-5 py-3 text-sm bg-blue-medium hover:bg-blue-hover"
                >
                  Logout
                </Button>

                <Image
                  width={38}
                  height={38}
                  src={`${webConfig.url}:${webConfig.port}/storage/${user.ID_USER}/avatar?q=${user.DT_UP}`}
                  alt={`${user.USERNAME} avatar`}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={handleRedirectToProfile}
                />
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="flex md:hidden items-center">
            <MenuMobile />
          </div>
        </div>
      </div>
    </header>
  );
}
