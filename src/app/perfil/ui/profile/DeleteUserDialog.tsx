"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { DeleteUserAction } from "../../actions/UpdateUserActions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function DeleteUserDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user, logout } = useAuthStore();

  const handleDelete = async () => {
    if (!password.trim()) {
      toast.warning("Senha inválida", {
        description: "O campo de senha não deve estar vazia!",
      });

      return;
    }
    if (!user) return;

    setIsLoading(true);
    const res = await DeleteUserAction(user.ID_USER, password);

    if (res.ok) {
      logout();
      redirect("/");
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="font-bold text-base p-5">
          Excluir conta
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-8 shadow-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-xl font-semibold text-red-600">
            Esta ação é irreversível
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Tem certeza de que deseja deletar sua conta? Esta operação não
            poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col">
            <Label className="p-2">Senha atual</Label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirma a sua senha"
                className="w-full pr-12 font-mono font-bold text-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Button
              variant="destructive"
              className="w-full py-3 text-base"
              disabled={isLoading}
              onClick={handleDelete}
            >
              Excluir conta
            </Button>

            <DialogClose className="w-full" asChild>
              <Button
                variant="outline"
                className="w-full py-3 text-base"
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
