"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  UserCircle2,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  HelpCircle,
  Handshake,
} from "lucide-react";
import { useAvatar } from "@/hooks/useAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function MenuMobile() {
  const [open, setOpen] = useState(false);
  const { user, logout, loading } = useAuthStore();
  const avatar = useAvatar(user?.ID_USER ?? '');

  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    toast.info("Logout", { description: "Sessão encerrada com sucesso!" });
  };

  const NavItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
        pathname === href
          ? "bg-blue-light text-white font-semibold"
          : "hover:bg-blue-hover/10 text-gray-700"
      }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Abrir menu"
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={28} className="text-blue-medium" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="bg-white w-72 sm:w-80 p-0">
        <SheetHeader className="px-6 pt-4 pb-2 border-b">
          <SheetTitle className="flex items-center gap-3">
            {loading || avatar === undefined ? (
              <Skeleton className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
            ) : (
              <Link href="/">
                {avatar ? (
                  <Image
                    width={38}
                    height={38}
                    src={avatar}
                    alt={`${user?.USERNAME} avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <UserCircle2
                    size={32}
                    className="text-blue-medium"
                  />
                )}
              </Link>
            )}
            {user ? (
              <span className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                Olá, {user.USERNAME || "Usuário"}
                <Handshake size={20} className="text-blue-medium" />
              </span>
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                Bem-vindo
              </span>
            )}
          </SheetTitle>

          <SheetDescription className="text-sm text-gray-500">
            {user
              ? "Gerencie sua conta e explore o app"
              : "Acesse ou cadastre-se para participar"}
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <NavItem href="/" icon={Home} label="Início" />
            <NavItem href="/questions" icon={HelpCircle} label="Perguntas" />
            {user && (
              <NavItem
                href="/perfil"
                icon={UserCircle2}
                label="Perfil de usuário"
              />
            )}
          </nav>

          <hr className="border-gray-200 my-3" />

          {user ? (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Sair
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/auth/signin" onClick={() => setOpen(false)}>
                <Button className="w-full flex items-center justify-center gap-2 bg-blue-medium hover:bg-blue-hover">
                  <LogIn size={18} />
                  Login
                </Button>
              </Link>

              <Link href="/auth/signup" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Cadastrar-se
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
