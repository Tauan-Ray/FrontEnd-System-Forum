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
  type: 'create' | 'edit';
  ID_CT?: string;
  CATEGORY?: string;
  handleReloadCategories: () => void;
  children: React.ReactNode;
};

export default function EditCategoryDialog({
  ID_CT,
  CATEGORY,
  children,
  handleReloadCategories,
  type,
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
        {children}
      </DialogTrigger>
      <DialogContent
        className="max-w-sm rounded-2xl p-10"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-center text-xl font-semibold">
            {type === 'edit' ? 'Editar categoria' : 'Criar categoria'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {type === 'edit' ? 'Altere a categoria aqui!' : 'Crie uma nova categoria agora mesmo!'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <EditCategoryForm
            ID_CT={ID_CT ?? ""}
            CATEGORY={CATEGORY ?? ""}
            type={type}
            handleCloseDialog={(value) => handleCloseDialog(value)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
