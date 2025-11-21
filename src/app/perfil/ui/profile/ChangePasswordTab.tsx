"use client";

import FormError from "@/app/auth/ui/FormError";
import PasswordInput from "@/app/auth/ui/PasswordInput";
import { UpdatePasswordFormSchema } from "@/app/perfil/lib/definitions";
import { Form, FormField } from "@/components/ui/form";
import { SetStateAction, useState } from "react";
import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordChecklist from "@/app/auth/ui/PasswordCheckList";
import { useAuthStore } from "@/store/useAuthStore";
import { UpdatePasswordUserAction } from "@/app/perfil/actions/UpdateUserActions";
import { redirect } from "next/navigation";

type ChangeInfosTabProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  onChange: (open: boolean) => void;
};

export default function ChangePasswordTab({
  isLoading,
  setIsLoading,
  onChange,
}: ChangeInfosTabProps) {
  const { user, logout } = useAuthStore();
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
    actual: boolean;
  }>({ password: false, confirm: false, actual: false });

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      actualPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdatePasswordFormSchema>) {
    setIsLoading(true);
    const res = await UpdatePasswordUserAction(values, user?.ID_USER ?? "");
    setIsLoading(false);

    if (res.ok) {
      handleCloseDialog();
      logout();
      redirect('/auth/signin')
    }
  }

  const handleCloseDialog = () => {
    form.reset();
    onChange(false);
  };
  return (
    <Form {...form}>
      <form
        id="form-update-password"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <>
              <PasswordInput
                field={field}
                label="Senha"
                placeholder="Digite sua senha"
                show={showPassword.password}
                toggle={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !showPassword.password,
                  }))
                }
                disabled={isLoading}
              />
              <PasswordChecklist password={field.value} />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              show={showPassword.confirm}
              toggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirm: !showPassword.confirm,
                }))
              }
              disabled={isLoading}
            />
          )}
        />

        <FormError
          message={form.formState.errors.confirmNewPassword?.message}
        />

        <FormField
          control={form.control}
          name="actualPassword"
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Senha atual"
              placeholder="Confirme sua senha atual"
              show={showPassword.actual}
              toggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  actual: !showPassword.actual,
                }))
              }
              disabled={isLoading}
            />
          )}
        />

        <FormError
          message={form.formState.errors.actualPassword?.message}
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
