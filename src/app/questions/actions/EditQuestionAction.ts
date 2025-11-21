import { z } from "@/components/pt-zod";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { CreateQuestionFormSchema } from "../lib/definitions";
import { editQuestion } from "../lib/sessions";

export async function EditQuestionAction(
  values: z.infer<typeof CreateQuestionFormSchema>,
  idQuestion: string
) {
  const res = await editQuestion(values, idQuestion);

  if (res?.message == "Pergunta editada com sucesso") {
    toast.success(res.message, {
      description: "Sua dúvida será esclarecida em breve!",
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
            description: "Categoria selecionada não encontrada",
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
