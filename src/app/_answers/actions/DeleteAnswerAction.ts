import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { deleteAnswer } from "../lib/sessions";

export async function DeleteAnswerAction(idAnswer: string) {
  const res = await deleteAnswer(idAnswer);

  if (res?.message == "Resposta deletada com sucesso") {
    toast.success(res.message, {
      description: "Sua resposta foi engolida por um buraco negro",
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
            description: "Resposta selecionada não encontrada",
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
