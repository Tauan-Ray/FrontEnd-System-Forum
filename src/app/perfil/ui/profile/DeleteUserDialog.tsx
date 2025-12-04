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
import { EyeIcon, EyeOffIcon, Trash } from "lucide-react";

type DeleteUserDialogProps = {
  userId?: string;
};

export default function DeleteUserDialog({ userId }: DeleteUserDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(userId ? "password10" : "");
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
    const res = await DeleteUserAction(
      userId ? userId : user.ID_USER,
      password,
    );

    if (res.ok) {
      if (!userId) {
        logout();
        redirect("/");
      } else {
        window.location.reload();
      }
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {userId ? (
          <Button
            variant={"destructive"}
            className="flex-1 rounded-lg"
          >
            <>
              <Trash size={16} />
              Deletar
            </>
          </Button>
        ) : (
          <Button variant={"destructive"} className="p-5 text-base font-bold">
            Excluir conta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-8 shadow-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl font-semibold text-red-600">
            Esta ação é irreversível
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm">
            Tem certeza de que deseja deletar sua conta? Esta operação não
            poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-6">
          {!userId && (
            <div className="flex flex-col">
              <Label className="p-2">Senha atual</Label>
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirma a sua senha"
                  className="text-md w-full pr-12 font-mono font-bold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex w-full flex-col gap-3">
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
