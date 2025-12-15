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
    <header className="sticky top-0 z-50 w-full border-b border-b-gray-300 bg-white/80 p-4 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 flex-row-reverse items-center justify-between gap-4 md:flex-row">
          <Link
            href="/"
            title="Página inicial"
            className="flex shrink-0 items-center"
          >
            <Image src="/logo.svg" alt="Logo" width={100} height={32} />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {loading && (
              <>
                <Skeleton className="h-10 w-24 rounded-md bg-gray-300" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
              </>
            )}

            {!loading && !user && (
              <>
                <Link href="/auth/signin">
                  <Button className="rounded-md bg-blue-medium px-5 py-3 text-sm hover:bg-blue-hover">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/signup">
                  <Button className="rounded-md bg-blue-medium px-5 py-3 text-sm hover:bg-blue-hover">
                    Cadastro
                  </Button>
                </Link>

                <UserCircle2
                  size={32}
                  className="cursor-pointer text-blue-light"
                  onClick={() => redirect("/auth/signin")}
                />
              </>
            )}

            {!loading && user && (
              <>
                {user?.ROLE === "ADMIN" && (
                  <Button variant={"secondary"} asChild>
                    <Link href={"/admin"}>Painel Administrativo</Link>
                  </Button>
                )}
                <Button
                  onClick={handleLogoutUser}
                  className="rounded-md bg-blue-medium px-5 py-3 text-sm hover:bg-blue-hover"
                >
                  Logout
                </Button>

                <Image
                  width={38}
                  height={38}
                  src={`${webConfig.url}:${webConfig.port}/storage/${user.ID_USER}/avatar?q=${user.DT_UP}`}
                  alt={`${user.USERNAME} avatar`}
                  className="h-10 w-10 cursor-pointer rounded-full"
                  onClick={handleRedirectToProfile}
                />
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="flex items-center md:hidden">
            <MenuMobile />
          </div>
        </div>
      </div>
    </header>
  );
}
