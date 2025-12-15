"use client";

import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChangeEmailFormSchema } from "../lib/definitions";
import FormError from "./FormError";
import { redirect } from "next/navigation";
import { VerifyTokenAction } from "../actions/VerifyTokenAction";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { ChangeEmailAction } from "../actions/ChangeEmailAction";

export default function FormChangeEmail({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [validToken, setValidToken] = useState(false);

  const { logout } = useAuthStore();

  const form = useForm<z.infer<typeof ChangeEmailFormSchema>>({
    resolver: zodResolver(ChangeEmailFormSchema),
    defaultValues: {
      newEmail: "",
      token: token,
    },
  });

  async function onSubmit(values: z.infer<typeof ChangeEmailFormSchema>) {
    setIsLoading(true);
    const res = await ChangeEmailAction(values);
    if (res.ok) {
      logout();

      setTimeout(() => {
        redirect("/auth/signin");
      }, 800);
    }
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
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="text-primary h-14 w-14 animate-spin drop-shadow-lg" />
            <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-xl" />
          </div>

          <div className="text-center">
            <p className="text-foreground/90 text-xl font-semibold tracking-tight">
              Validando token…
            </p>

            <p className="text-muted-foreground mt-1 text-sm">
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
        id="form-change"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <h2 className="mb-4 text-center text-xl font-semibold">
          Trocar E-mail
        </h2>

        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-3">E-mail</FormLabel>
              <FormControl>
                <div>
                  <Input
                    placeholder="Digite seu e-mail"
                    className="text-md w-full font-mono font-bold"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormError message={form.formState.errors.newEmail?.message} />

        <div className="flex justify-center">
          <Button
            type="submit"
            form="form-change"
            className="text-md flex w-2/5 items-center justify-center py-5 md:text-lg"
          >
            {isLoading && <Spinner className="mr-2" />}Novo E-mail
          </Button>
        </div>
      </form>
    </Form>
  );
}
