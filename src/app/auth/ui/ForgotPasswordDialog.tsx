import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Lock } from "lucide-react";
import React, { useState } from "react";
import { sendForgotPasswordEmail } from "../lib/sessions";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

type ForgotPasswordDialogProps = {
  email?: string;
  showTrigger?: "text" | "button";
};

export default function ForgotPasswordDialog({
  email: defaultEmail,
  showTrigger = "text",
}: ForgotPasswordDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(defaultEmail ?? "");

  const onSubmit = async () => {
    if (!email.trim()) {
      toast.warning("Erro ao enviar email", {
        description: "O campo de e-mail não deve estar vazio",
      });
      return;
    }

    setIsLoading(true);
    const res = await sendForgotPasswordEmail(email);

    if (res.status === 400) {
      toast.warning("Erro ao enviar email", {
        description: res.message,
      });

      setIsLoading(false);

      return;
    }

    setEmailSended(true);

    setIsLoading(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          setEmailSended(false);
        }}
      >
        <DialogTrigger asChild>
          {showTrigger === "text" ? (
            <span className="text-md cursor-pointer pl-2 font-sans font-bold text-blue-link hover:underline">
              Esqueceu sua senha?
            </span>
          ) : (
            <Button
              variant="secondary"
              className="flex items-center gap-2 px-12 py-5"
              onClick={onSubmit}
              disabled={isLoading}
            >
              <Lock className="h-4 w-4" />
              Alterar senha
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="mx-auto max-h-[90vh] w-full overflow-auto rounded-2xl p-6 shadow-xl sm:max-w-md md:max-w-lg">
          <DialogHeader className="flex flex-col items-center space-y-2">
            <DialogTitle className="text-center text-lg font-semibold md:text-2xl">
              Recuperação de Senha
            </DialogTitle>
            <DialogDescription className="text-center text-xs opacity-80 md:text-sm">
              Esqueceu sua senha? Recupere ela agora!
            </DialogDescription>
          </DialogHeader>

          {!emailSended ? (
            <div className="mt-6 flex w-full flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label className="pl-1 text-sm font-medium">E-mail</Label>
                <Input
                  placeholder="Digite seu e-mail"
                  className="h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                disabled={isLoading}
                className="text-md w-full rounded-xl py-6 shadow-md"
                onClick={onSubmit}
              >
                {isLoading ? (
                  <>
                    <Spinner /> Enviando email...
                  </>
                ) : (
                  <span>Recuperar senha</span>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-green-600">
              <CheckCircle className="h-12 w-12" />
              <p className="text-lg font-semibold">
                E-mail enviado com sucesso!
              </p>
              <p className="max-w-[80%] text-center text-sm opacity-80">
                Verifique sua caixa de entrada e siga as instruções para
                redefinir sua senha.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
