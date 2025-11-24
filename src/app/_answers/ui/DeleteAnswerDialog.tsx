import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteAnswerAction } from "../actions/DeleteAnswerAction";

type DeleteAnswerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idAnswer: string;
};

export default function DeleteAnswerDialog({
  open,
  onOpenChange,
  idAnswer,
}: DeleteAnswerDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await DeleteAnswerAction(idAnswer);
    setIsLoading(false)

    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="max-w-sm rounded-2xl p-8 shadow-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-xl font-semibold text-red-600">
            Esta ação é irreversível
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Tem certeza de que deseja deletar esta resposta?
            Esta operação não poderá ser desfeita.
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
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
