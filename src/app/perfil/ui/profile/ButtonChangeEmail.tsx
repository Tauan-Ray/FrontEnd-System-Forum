import { sendChangeEmail } from "@/app/auth/lib/sessions";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

type ButtonChangeEmailProps = {
  email: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export default function ButtonChangeEmail({
  email,
  isLoading,
  setIsLoading,
}: ButtonChangeEmailProps) {
  const onSubmit = async () => {
    if (!email) {
      toast.warning("Erro no email", {
        description:
          "O seu email não está disponível. Por favor, tente novamente em instantes.",
      });
    }

    setIsLoading(true);
    const res = await sendChangeEmail(email);

    if (res.status === 400) {
      toast.warning("Erro ao enviar email", {
        description: res.message,
      });

      setIsLoading(false);

      return;
    }

    toast.success("Email enviado!", {
      description: "Verifique sua caixa de entrada para alterar seu email.",
    });
    setIsLoading(false);
  };
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 px-12 py-5"
      onClick={onSubmit}
      disabled={isLoading}
    >
      <Mail className="h-4 w-4" />
      Alterar e-mail
    </Button>
  );
}
