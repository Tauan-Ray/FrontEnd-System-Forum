import { RestoreAnswer } from "@/app/_answers/lib/sessions";
import { RestoreUser } from "@/app/perfil/lib/sessions";
import { RestoreQuestion } from "@/app/questions/lib/sessions";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

export async function RestoreUserAction(ID_USER: string) {
  const res = await RestoreUser(ID_USER);

  if (res?.message == "Usuário restaurado com sucesso") {
    toast.success(res.message, {
      description: "A conta do usuário foi restaurada com sucesso!",
    });

    return {
      ok: true,
    };
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

      case HttpStatusCode.NotFound:
        toast.error(res.message, {
          description: "Não foi encontrado nenhum usuário com o ID fornecido",
        });
        break;

      case HttpStatusCode.UnprocessableEntity:
        toast.warning("Usuário existente", {
          description: res.message,
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
      ok: false,
    };
  }
}

export async function RestoreQuestionAction(ID_QT: string) {
  const res = await RestoreQuestion(ID_QT);

  if (res?.message == "Pergunta restaurada com sucesso") {
    toast.success(res.message, {
      description: "A pergunta foi restaurada com sucesso!",
    });

    return {
      ok: true,
    };
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

      case HttpStatusCode.NotFound:
        toast.error(res.message, {
          description: "Não foi encontrado nenhuma pergunta com o ID fornecido",
        });
        break;

      case HttpStatusCode.UnprocessableEntity:
        toast.warning("Pergunta existente", {
          description: res.message,
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
      ok: false,
    };
  }
}

export async function RestoreAnswerAction(ID_AN: string) {
  const res = await RestoreAnswer(ID_AN);

  if (res?.message == "Resposta restaurada com sucesso") {
    toast.success(res.message, {
      description: "A resposta foi restaurada com sucesso!",
    });

    return {
      ok: true,
    };
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

      case HttpStatusCode.NotFound:
        toast.error(res.message, {
          description: "Não foi encontrado nenhuma resposta com o ID fornecido",
        });
        break;

      case HttpStatusCode.UnprocessableEntity:
        toast.warning("Resposta existente", {
          description: res.message,
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
      ok: false,
    };
  }
}
