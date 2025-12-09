import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { DeleteAnswerAction } from "../actions/DeleteAnswerAction";

type DeleteAnswerDialogProps = {
  idAnswer: string;
  children: React.ReactNode;
  handleReloadAnswers: () => void;
};

export default function DeleteAnswerDialog({
  children,
  idAnswer,
  handleReloadAnswers
}: DeleteAnswerDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await DeleteAnswerAction(idAnswer);
    setIsLoading(false);

    handleReloadAnswers()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-8 shadow-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl font-semibold text-red-600">
            Esta ação é irreversível
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm">
            Tem certeza de que deseja deletar esta resposta? Esta operação não
            poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="destructive"
            className="w-full py-3 text-base"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir resposta
          </Button>

          <Button
            variant="outline"
            className="w-full py-3 text-base"
            disabled={isLoading}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
