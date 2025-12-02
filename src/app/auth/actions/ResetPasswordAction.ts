import { z } from "@/components/pt-zod";
import { ResetPasswordFormSchema } from "../lib/definitions";
import { resetPassword } from "../lib/sessions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { HttpStatusCode } from "axios";

export async function ResetPasswordAction(
  values: z.infer<typeof ResetPasswordFormSchema>
) {
  const res = await resetPassword(values);

  if (res.message === "Senha atualizada com sucesso!") {
    toast.success(res.message, {
      description: "Sua senha foi alterada com sucesso! Efetue login",
    });

    return {
      ok: true,
    }
  } else {
    switch (res.status) {
      case HttpStatusCode.BadRequest:
        if (res.message.includes("token")) {
          toast.warning("Erro ao verificar token", {
            description: res.message,
          });
        } else if (res.message.includes("senha")) {
          toast.warning("Senha inválida", {
            description: res.message,
          });
        }
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
    }
  }
}
