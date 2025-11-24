import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { deleteQuestion } from "../lib/sessions";

export async function DeleteQuestionAction(idQuestion: string) {
  const res = await deleteQuestion(idQuestion);

  if (res?.message == "Pergunta deletada com sucesso") {
    toast.success(res.message, {
      description: "Sua pergunta foi engolida por um buraco negro",
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
