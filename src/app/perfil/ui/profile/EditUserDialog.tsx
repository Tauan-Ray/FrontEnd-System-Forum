import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import ChangeInfosTab from "./ChangeInfosTab";
import ChangePasswordTab from "./ChangePasswordTab";

type ChangeInfosDialogProps = {
  open: boolean;
  onChange: (open: boolean) => void;
};

export default function EditUserDialog({
  open,
  onChange,
}: ChangeInfosDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent
        className="max-w-sm p-10 rounded-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="text-center space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Editar perfil
          </DialogTitle>
          <DialogDescription>Altere suas informações aqui!</DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="infos"
          className="w-full h-full rounded-2xl p-4 flex flex-col items-center"
        >
          <TabsList className="flex w-full bg-blue-primary/20 p-1 rounded-xl h-auto">
            <TabsTrigger
              value="infos"
              className="
        flex-1 text-sm rounded-lg px-4 py-2 transition-all
        data-[state=active]:bg-blue-primary data-[state=active]:text-white
        data-[state=active]:shadow
        hover:bg-blue-primary/10
        p-2
      "
            >
              Editar Perfil
            </TabsTrigger>

            <TabsTrigger
              value="password"
              className="
        flex-1 text-sm rounded-lg px-4 py-2 transition-all
        data-[state=active]:bg-blue-primary data-[state=active]:text-white
        data-[state=active]:shadow
        hover:bg-blue-primary/10
        p-2
      "
            >
              Alterar Senha
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 mt-4 w-full">
            <TabsContent value="infos">
              <ChangeInfosTab
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onChange={onChange}
              />
            </TabsContent>

            <TabsContent value="password">
              <ChangePasswordTab
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onChange={onChange}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
