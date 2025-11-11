"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "@/components/pt-zod";
import { SigninFormSchema } from "../../lib/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { AuthenticateUser } from "../../actions/auth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FormError from "../../ui/FormError";
import PasswordInput from "../../ui/PasswordInput";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
      password_remember: true,
      redirect: searchParams.get("redirect") || "/",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    setIsLoading(true);
    await AuthenticateUser(values);
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl">
        <div className="flex items-center justify-center border-b md:border-b-0 md:border-r flex-1">
          <Image
            src="/image-login.png"
            alt="Imagem de login"
            width={500}
            height={500}
            className="w-full h-auto max-w-[500px]"
          />
        </div>

        <div className="flex flex-col bg-[#E0E0E0] p-6 md:p-10 flex-1 items-center justify-center">
          <h1 className="text-3xl text-gray-dark text-center font-mono font-bold mb-12">
            Entrar
          </h1>

          <Form {...form}>
            <form
              id="form-login"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mb-8"
            >
              <div className="flex flex-col items-center w-full px-4 md:px-0">
                <div className="flex flex-col gap-5 w-full text-sm md:text-md">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pl-3">E-mail</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              placeholder="Digite seu e-mail"
                              className="w-full font-mono font-bold text-md"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormError message={form.formState.errors.email?.message} />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <PasswordInput
                        field={field}
                        label="Senha"
                        placeholder="Digite sua senha"
                        show={showPassword}
                        toggle={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <FormError
                    message={form.formState.errors.password?.message}
                  />

                  <FormField
                    control={form.control}
                    name="password_remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between pl-1 mb-3 md:mb-0">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              className="w-11 h-6"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-readonly
                              id="remember"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Label className="text-zinc-600" htmlFor="remember">
                            Lembrar-me
                          </Label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full items-center mt-5">
                <Button
                  type="submit"
                  form="form-login"
                  className="py-5 w-4/5 md:w-2/5 text-md md:text-lg md:py-6"
                >
                  {isLoading && <Spinner />}Login
                </Button>

                <div className="flex flex-col md:flex-row text-md font-sans font-bold gap-2 mt-3 text-center">
                  <span>Não tem uma conta?</span>
                  <Link
                    href={searchParams.get("redirect") ? `/auth/signup?redirect=${searchParams.get("redirect")}` : "/auth/signup"}
                    className="text-blue-primary hover:underline"
                  >
                    Crie Agora!
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
