import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteQuestionAction } from "../actions/DeleteQuestionAction";
import { redirect, usePathname } from "next/navigation";

type DeleteQuestionDialogProps = {
  idQuestion: string;
  children: React.ReactNode;
};

export default function DeleteQuestionDialog({
  idQuestion,
  children,
}: DeleteQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleDelete = async () => {
    setIsLoading(true);
    await DeleteQuestionAction(idQuestion);

    setTimeout(() => {
      if (pathname.startsWith("/questions/") && pathname !== "/questions") {
        redirect("/questions");
      }
      window.location.reload();
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
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
            Tem certeza de que deseja deletar esta pergunta? Esta operação não
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
            Excluir pergunta
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
