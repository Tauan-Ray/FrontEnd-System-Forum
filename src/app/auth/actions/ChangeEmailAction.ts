import { z } from "@/components/pt-zod";
import { changeEmail } from "../lib/sessions";
import { toast } from "sonner";
import { ChangeEmailFormSchema } from "../lib/definitions";

export async function ChangeEmailAction(
  values: z.infer<typeof ChangeEmailFormSchema>,
) {
  const res = await changeEmail(values);

  if (res.message === "Email atualizado com sucesso!") {
    toast.success(res.message, {
      description: "Seu e-mail foi alterado com sucesso! Efetue login",
    });

    return {
      ok: true,
    };
  } else {
    switch (res.cause) {
      case "INVALID_TOKEN":
        toast.warning("Erro ao verificar token", {
          description: res.message,
        });
        break;
      case "INVALID_EMAIL":
        toast.warning("Email inválido", {
          description: res.message,
        });
        break;
      case "SAME_EMAIL":
        toast.warning("Email igual ao atual", {
          description: res.message,
        });
        break;
      case "EMAIL_IN_USE":
        toast.warning("Email já está em uso", {
          description: res.message,
        });
        break;
      default:
        toast.error("Erro interno", {
          description: "Erro ao se comunicar com serviço externo",
        });
        console.error(res);
        break;
    }

    return {
      ok: false,
    };
  }
}
