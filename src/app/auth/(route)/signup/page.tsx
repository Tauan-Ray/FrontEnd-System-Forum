"use client";

import { z } from "@/components/pt-zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "../../lib/definitions";
import { AuthenticateNewUser } from "../../actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import FormError from "../../ui/FormError";
import PasswordInput from "../../ui/PasswordInput";

type showPasswordType = {
  password: boolean;
  confirm: boolean
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<showPasswordType>({ password: false, confirm: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      password_remember: true,
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    setIsLoading(true);
    await AuthenticateNewUser(values);
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
            Cadastrar
          </h1>

          <Form {...form}>
            <form
              id="form-signup"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
            >
              <div className="flex flex-col items-center w-full px-4 md:px-0">
                <div className="flex flex-col gap-5 w-full text-sm md:text-md">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pl-2">Nome</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              placeholder="Digite seu nome"
                              className="w-full font-mono font-bold text-md"
                              autoFocus
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormError message={form.formState.errors.name?.message} />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pl-2">Nome de usuário</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              placeholder="Digite seu username"
                              className="w-full font-mono font-bold text-md"
                              autoFocus
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormError message={form.formState.errors.username?.message} />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pl-2">E-mail</FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              placeholder="Digite seu e-mail"
                              className="w-full font-mono font-bold text-md"
                              autoFocus
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
                        show={showPassword.password}
                        toggle={() => setShowPassword((prev) => ({ ...prev, password: !showPassword.password }))}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <FormError message={form.formState.errors.password?.message} />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <PasswordInput
                        field={field}
                        label="Confirmar senha"
                        placeholder="Confirme sua senha"
                        show={showPassword.confirm}
                        toggle={() => setShowPassword((prev) => ({ ...prev, confirm: !showPassword.password }))}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <FormError message={form.formState.errors.confirmPassword?.message} />

                  <FormField
                    control={form.control}
                    name="password_remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between pl-1 mb-3 md:mb-0">
                        <div className="flex items-center space-x-2">
                        <FormControl >
                          <Switch
                            className="w-11 h-6"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                            id="remember"
                            disabled={isLoading}
                          />
                        </FormControl>
                          <Label className="text-zinc-600" htmlFor="remember">Lembrar-me</Label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full items-center mt-5">
                <Button type="submit" form="form-signup" className="text-white py-5 w-4/5 md:w-2/5 text-md md:text-lg md:py-6">
                  {isLoading && (<Spinner/>)}Cadastrar
                </Button>

                <div className="flex flex-col md:flex-row text-md font-sans font-bold gap-2 mt-3 text-center">
                  <span>Já possui uma conta?</span>
                  <Link href="/auth/signin" className="text-blue-primary hover:underline">
                    Entre Agora!
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
