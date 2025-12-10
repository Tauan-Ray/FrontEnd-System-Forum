import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";

type EditCategoryDialogProps = {
  ID_CT: string;
  CATEGORY: string;
  isDeleted: boolean;
  handleReloadCategories: () => void;
};

export default function EditCategoryDialog({
  ID_CT,
  CATEGORY,
  isDeleted,
  handleReloadCategories,
}: EditCategoryDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseDialog = (reload: boolean) => {
    setOpen(false);
    if (reload) {
        handleReloadCategories()
    }
  }
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button
          disabled={isDeleted}
          variant="outline"
          className="flex-1 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Pencil size={16} />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-10"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-center text-xl font-semibold">
            Editar categoria
          </DialogTitle>
          <DialogDescription className="text-center">
            Altere a categoria aqui!
          </DialogDescription>
        </DialogHeader>
        <div>
          <EditCategoryForm
            ID_CT={ID_CT}
            CATEGORY={CATEGORY}
            handleCloseDialog={(value) => handleCloseDialog(value)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
