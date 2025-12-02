"use client";

import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ResetPasswordFormSchema } from "../lib/definitions";
import PasswordInput from "./PasswordInput";
import PasswordChecklist from "./PasswordCheckList";
import FormError from "./FormError";
import { redirect } from "next/navigation";
import { VerifyTokenAction } from "../actions/VerifyTokenAction";
import { Loader2 } from "lucide-react";
import { ResetPasswordAction } from "../actions/ResetPasswordAction";

export default function FormResetPassword({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [validToken, setValidToken] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      token: token,
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    setIsLoading(true);
    await ResetPasswordAction(values);
    setIsLoading(false);
  }

  useEffect(() => {
    setValidating(true);

    VerifyTokenAction(token)
      .then((res) => {
        if (res.ok) {
          setValidToken(true);
        } else {
          redirect("/");
        }
      })
      .finally(() => {
        setValidating(false);
      });
  }, [token]);

  if (validating) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="relative">
            <Loader2 className="h-14 w-14 text-primary animate-spin drop-shadow-lg" />
            <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse" />
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-foreground/90 tracking-tight">
              Validando token…
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              Aguarde alguns instantes
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!validToken) return null;

  return (
    <Form {...form}>
      <form
        id="form-reset"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <h2 className="text-center text-xl font-semibold mb-4">
          Redefinir Senha
        </h2>

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
                  setShowPassword((p) => ({
                    ...p,
                    password: !p.password,
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
          name="confirmPassword"
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              show={showPassword.confirm}
              toggle={() =>
                setShowPassword((p) => ({
                  ...p,
                  confirm: !p.confirm,
                }))
              }
              disabled={isLoading}
            />
          )}
        />

        <FormError message={form.formState.errors.confirmPassword?.message} />

        <div className="flex justify-center">
          <Button
            type="submit"
            form="form-reset"
            className="py-5 w-2/5 text-md md:text-lg flex justify-center items-center"
          >
            {isLoading && <Spinner className="mr-2" />}Nova Senha
          </Button>
        </div>
      </form>
    </Form>
  );
}
