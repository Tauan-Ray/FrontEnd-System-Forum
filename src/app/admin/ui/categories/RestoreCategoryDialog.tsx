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
import { RestoreCategoryAction } from "../../actions/RestoreAction";

type RestoreCategoryDialogProps = {
  idCategory: string;
  handleReloadQuestions: () => void;
};

export default function RestoreCategoryDialog({ idCategory, handleReloadQuestions }: RestoreCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRestore = async () => {
    setIsLoading(true);
    const res = await RestoreCategoryAction(idCategory);

    if (res.ok) {
        setTimeout(() => {
            handleReloadQuestions();
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
            Restauração de Categoria
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm text-center">
            Tem certeza de que deseja restaurar essa categoria?
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
              Restaurar categoria
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
