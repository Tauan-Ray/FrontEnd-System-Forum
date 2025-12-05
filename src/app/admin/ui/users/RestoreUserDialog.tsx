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
import { useState } from "react";
import { Undo } from "lucide-react";
import { RestoreUserAction } from "../../actions/RestoreUserAction";

type RestoreUserDialogProps = {
  userId: string;
  handleReloadUsers: () => void;
};

export default function RestoreUserDialog({ userId, handleReloadUsers }: RestoreUserDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRestore = async () => {
    setIsLoading(true);
    const res = await RestoreUserAction(userId);

    if (res.ok) {
        setTimeout(() => {
            handleReloadUsers()
        }, 800)
    };

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="flex-1 rounded-lg">
          <>
            <Undo size={16} />
            Restaurar
          </>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-8 shadow-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl font-semibold text-green-600 text-center">
            Restauração de Usuário
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm text-center">
            Tem certeza de que deseja restaurar essa conta?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex w-full flex-col gap-3">
            <Button
              variant="destructive"
              className="w-full py-3 text-base"
              disabled={isLoading}
              onClick={handleRestore}
            >
              Restaurar conta
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
