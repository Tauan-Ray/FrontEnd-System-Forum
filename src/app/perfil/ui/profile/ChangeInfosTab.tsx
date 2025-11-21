"use client";

import FormError from "@/app/auth/ui/FormError";
import PasswordInput from "@/app/auth/ui/PasswordInput";
import { UpdateUserFormSchema } from "@/app/perfil/lib/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";
import { z } from "@/components/pt-zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { UpdateInfosUserAction } from "@/app/perfil/actions/UpdateUserActions";

type ChangeInfosTabProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  onChange: (open: boolean) => void;
};

export default function ChangeInfosTab({
  isLoading,
  setIsLoading,
  onChange,
}: ChangeInfosTabProps) {
  const { user } = useAuthStore();
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
      handleCloseDialog();
    }
  }

  const handleCloseDialog = () => {
    form.reset();
    onChange(false);
  };
  return (
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
              <FormError message={form.formState.errors.username?.message} />
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

        <DialogFooter className="pt-4 flex flex-col gap-6">
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
  );
}
