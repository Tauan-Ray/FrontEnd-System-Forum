import { z } from "@/components/pt-zod";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { UpdatePasswordFormSchema, UpdateUserFormSchema } from "../lib/definitions";
import { UpdateUserInfos, UpdateUserPassword } from "../lib/sessions";
import { useAuthStore } from "@/store/useAuthStore";

export async function UpdateInfosUserAction(
  value: z.infer<typeof UpdateUserFormSchema>,
  userId: string
) {
  const res = await UpdateUserInfos(value, userId);

  if (res?.message == "Usuário atualizado com sucesso") {
    toast.success(res.message, {
      description: "Suas informações foram atualizadas com sucesso!",
    });

    const { checkAuth } = useAuthStore.getState();
    await checkAuth();

    return {
      ok: true,
    }
  } else {
    switch (res.status) {
      case HttpStatusCode.BadRequest:
        const messages = res.message;
        for (const message of messages) {
          toast.warning("Dados inválidos", {
            description: message,
          });
        }
        break;

      case HttpStatusCode.Unauthorized:
        toast.warning("Ação não autorizada", {
          description: res.message,
        });
        break;

      case HttpStatusCode.Forbidden:
        toast.error(res.message, {
          description: "Sua senha atual está incorreta",
        });
        break;

      case HttpStatusCode.NotFound:
        toast.error(res.message, {
          description: "Não foi encontrado nenhum usuário com o ID fornecido",
        });
        break;

      case HttpStatusCode.Conflict:
        toast.error("Username em uso", {
          description: "O username escolhido já esta em uso",
        });
        break;

      case HttpStatusCode.TooManyRequests:
        toast.warning("Muitas tentativas!", {
          description: "Aguarde alguns segundos e tente novamente.",
        });
        break;

      default:
        toast.error("Erro interno", {
          description: res.message || "Erro inesperado no servidor.",
        });
        break;
    }

    return {
      ok: false
    }
  }
}


export async function UpdatePasswordUserAction(
  value: z.infer<typeof UpdatePasswordFormSchema>,
  userId: string
) {
  const res = await UpdateUserPassword(value, userId);

  if (res?.message == "Senha atualizada com sucesso") {
    toast.success(res.message, {
      description: "Sua senha foi alterada com sucesso!",
    });

    return {
      ok: true,
    }
  } else {
    switch (res.status) {
      case HttpStatusCode.BadRequest:
        const messages = res.message;
        for (const message of messages) {
          toast.warning("Dados inválidos", {
            description: message,
          });
        }
        break;

      case HttpStatusCode.Unauthorized:
        toast.warning("Ação não autorizada", {
          description: res.message,
        });
        break;

      case HttpStatusCode.Forbidden:
        toast.error(res.message, {
          description: "Sua senha atual está incorreta",
        });
        break;

      case HttpStatusCode.NotFound:
        toast.error(res.message, {
          description: "Não foi encontrado nenhum usuário com o ID fornecido",
        });
        break;

      case HttpStatusCode.TooManyRequests:
        toast.warning("Muitas tentativas!", {
          description: "Aguarde alguns segundos e tente novamente.",
        });
        break;

      default:
        toast.error("Erro interno", {
          description: res.message || "Erro inesperado no servidor.",
        });
        break;
    }

    return {
      ok: false
    }
  }
}
