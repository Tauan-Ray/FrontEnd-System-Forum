"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LockKeyhole } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type DialogRedirectToLoginProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DialogRedirectToLogin({
  open,
  onOpenChange,
}: DialogRedirectToLoginProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    onOpenChange(false);
    router.push(`/auth/signin?redirect=${pathname}`);
  };

  const handleRegister = () => {
    onOpenChange(false);
    router.push(`/auth/signup?redirect=${pathname}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-md rounded-3xl border border-gray-100
          bg-white p-8 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)]
          transition-all duration-300 ease-out
          flex flex-col items-center
        "
      >
        <DialogHeader className="flex flex-col items-center text-center space-y-5 w-full">
          <div
            className="
              relative w-16 h-16 flex items-center justify-center
              rounded-2xl bg-gradient-to-br from-blue-primary/15 to-blue-primary/5
              text-blue-medium shadow-[inset_0_0_10px_rgba(79,134,198,0.15)]
            "
          >
            <div className="absolute inset-0 rounded-2xl border border-blue-primary/20" />
            <LockKeyhole className="w-7 h-7 relative z-10" />
          </div>

          <DialogTitle className="text-[22px] font-semibold text-gray-800 tracking-tight">
            Faça login para continuar
          </DialogTitle>

          <DialogDescription className="text-[15px] text-gray-medium leading-relaxed max-w-sm text-center">
            Entre na sua conta para participar da comunidade, responder perguntas
            e interagir com outros usuários.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 w-full">
          <Button
            onClick={handleLogin}
            className="
              flex items-center justify-center gap-2 w-full sm:w-auto
              font-medium px-6 py-2.5 rounded-lg
              bg-gradient-to-r from-blue-medium to-blue-primary
              hover:from-blue-hover hover:to-blue-medium text-white
              shadow-[0_4px_15px_rgba(79,134,198,0.3)]
              transition-all duration-200 hover:scale-[1.02]
            "
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </Button>

          <Button
            variant="outline"
            onClick={handleRegister}
            className="
              flex items-center justify-center gap-2 w-full sm:w-auto
              font-medium px-6 py-2.5 rounded-lg
              border border-blue-primary/40 text-blue-dark
              hover:bg-blue-primary/5 hover:border-blue-primary/60
              transition-all duration-200 hover:scale-[1.02]
            "
          >
            <UserPlus className="w-4 h-4" />
            Criar conta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
