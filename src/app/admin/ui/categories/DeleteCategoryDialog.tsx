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
import { DeleteCategoryAction } from "../../actions/DeleteCategoryAction";

type DeleteQuestionDialogProps = {
  idCategory: string;
  handleReloadCategories: () => void;
};

export default function DeleteCategoryDialog({
  idCategory,
  handleReloadCategories,
}: DeleteQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await DeleteCategoryAction(idCategory);
    setIsLoading(false);

    handleReloadCategories();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full p-4 text-sm sm:w-auto sm:text-base"
        >
          Deletar
        </Button>
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
            Tem certeza de que deseja deletar esta categoria?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="destructive"
            className="w-full py-3 text-base"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir categoria
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
