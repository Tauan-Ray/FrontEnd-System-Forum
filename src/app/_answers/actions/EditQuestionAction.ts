import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { editAnswer } from "../lib/sessions";

export async function EditAnswerAction(response: string, ID_AN: string) {
  const res = await editAnswer(ID_AN, response);

  if (res?.message === "Resposta atualizada com sucesso") {
    toast.success(res.message, {
      description: "Obrigado por contribuir com o aprendizado de todos!",
    });
  } else {
    if (res.message) {
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
          toast.warning(res.message, {
            description: "Pergunta selecionada não encontrada",
          });
          break;

        case HttpStatusCode.TooManyRequests:
          toast.warning(res.message, {
            description:
              "Muitas solicitações requisitadas! Aguarde alguns segundos",
          });
          break;

        default:
          console.log(res);
          toast.error(res.message, {
            description: "Falha na requisição, serviço indisponível.",
          });
          break;
      }
    }
  }
}
