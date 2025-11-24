import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteQuestionAction } from "../actions/DeleteQuestionAction";
import { redirect, usePathname } from "next/navigation";

type DeleteQuestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idQuestion: string;
};

export default function DeleteQuestionDialog({
  open,
  onOpenChange,
  idQuestion,
}: DeleteQuestionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleDelete = async () => {
    setIsLoading(true);
    await DeleteQuestionAction(idQuestion);

    setTimeout(() => {
      if (pathname.startsWith("/questions/") && pathname !== "/questions") {
        redirect('/questions')
      }
      window.location.reload();
    }, 800)

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
            Tem certeza de que deseja deletar esta pergunta?
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
            Excluir pergunta
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
