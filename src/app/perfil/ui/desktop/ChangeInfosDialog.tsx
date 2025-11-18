import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateUserFormSchema } from "../../lib/definitions";
import { z } from "@/components/pt-zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/app/auth/ui/FormError";
import { UserProps } from "@/app/auth/lib/sessions";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/app/auth/ui/PasswordInput";
import { UpdateInfosUserAction } from "../../actions/UpdateUserActions";

type ChangeInfosDialogProps = {
  open: boolean;
  onChange: (open: boolean) => void;
  user: UserProps | null;
};

export default function ChangeInfosDialog({
  open,
  onChange,
  user,
}: ChangeInfosDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      name: user?.NAME ?? "",
      username: user?.USERNAME ?? "",
      actualPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateUserFormSchema>) {
    setIsLoading(true);
    const res = await UpdateInfosUserAction(values, user?.ID_USER ?? "");
    setIsLoading(false);

    if (res.ok) {
      form.reset();
      onChange(false);
    }
  }

  const handleCloseDialog = () => {
    form.reset();
    onChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent
        className="max-w-sm p-10 rounded-2xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="text-center space-y-1 mb-4">
          <DialogTitle className="text-xl font-semibold">
            Editar perfil
          </DialogTitle>
          <DialogDescription>Altere suas informações aqui!</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="form-update-user"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      className="font-mono font-semibold"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormError message={form.formState.errors.name?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu username"
                      className="font-mono font-semibold"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormError
                    message={form.formState.errors.username?.message}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualPassword"
              render={({ field }) => (
                <>
                  <PasswordInput
                    field={field}
                    label="Senha atual"
                    placeholder="Digite sua senha"
                    show={showPassword}
                    toggle={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                  />
                  <FormError
                    message={form.formState.errors.actualPassword?.message}
                  />
                </>
              )}
            />

            <DialogFooter className="pt-4">
              <Button disabled={isLoading} className="font-medium">
                Salvar
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="font-medium"
                onClick={handleCloseDialog}
              >
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
