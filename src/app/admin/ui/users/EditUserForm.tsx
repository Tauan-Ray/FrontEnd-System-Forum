"use client";

import FormError from "@/app/auth/ui/FormError";
import { UpdateUserFormSchema } from "@/app/perfil/lib/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateInfosUserAction } from "@/app/perfil/actions/UpdateUserActions";
import { Label } from "@/components/ui/label";
import ForgotPasswordDialog from "@/app/auth/ui/ForgotPasswordDialog";
import ButtonChangeEmail from "@/app/perfil/ui/profile/ButtonChangeEmail";

type EditUserFormProps = {
  ID_USER: string;
  name: string;
  username: string;
  email: string;
  handleCloseDialog: (reloadUsers: boolean) => void;
};

export default function EditUserForm({
  ID_USER,
  name,
  username,
  email,
  handleCloseDialog: closeDialog,
}: EditUserFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      name: name ?? "",
      username: username ?? "",
      actualPassword: "password10",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateUserFormSchema>) {
    setIsLoading(true);
    const res = await UpdateInfosUserAction(values, ID_USER ?? "");
    setIsLoading(false);

    if (res.ok) {
      form.reset();
      closeDialog(true);
    }
  }

  const handleCloseDialog = () => {
    form.reset();
    closeDialog(false);
  };
  return (
    <Form {...form}>
      <form
        id="form-update-user-admin"
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
              <FormError message={form.formState.errors.username?.message} />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <Label>E-mail</Label>
            <ButtonChangeEmail
              email={email}
              isLoading={isLoading}
              setIsLoading={(value: boolean) => setIsLoading(value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Senha</Label>
            <ForgotPasswordDialog showTrigger={"button"} email={email} />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-6 pt-4">
          <Button
            id="form-edit-user-admin"
            disabled={isLoading}
            className="font-medium"
          >
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
  );
}
