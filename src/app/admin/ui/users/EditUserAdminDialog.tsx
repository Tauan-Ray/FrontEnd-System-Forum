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
import EditUserForm from "./EditUserForm";
import { useState } from "react";

type EditUserAdminDialogProps = {
  ID_USER: string;
  name: string;
  username: string;
  email: string;
  isDeleted: boolean;
};

export default function EditUserAdminDialog({
  name,
  username,
  email,
  isDeleted,
  ID_USER,
}: EditUserAdminDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
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
            Editar perfil
          </DialogTitle>
          <DialogDescription className="text-center">
            Altere suas informações aqui!
          </DialogDescription>
        </DialogHeader>
        <div>
          <EditUserForm
            ID_USER={ID_USER}
            name={name}
            username={username}
            email={email}
            handleCloseDialog={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
