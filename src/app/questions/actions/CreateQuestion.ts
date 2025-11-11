import { z } from "@/components/pt-zod";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { CreateQuestionFormSchema } from "../lib/definitions";
import { createQuestion } from "../lib/sessions";

export async function CreateQuestion(
  values: z.infer<typeof CreateQuestionFormSchema>
) {
  const res = await createQuestion(values);

  if (res?.message == "Pergunta criada com sucesso") {
    toast.success(res.message, {
      description: "Sua dúvida será esclarecida em breve!",
    });
  } else {
    if (res.message) {
      if (res.status === HttpStatusCode.BadRequest) {
        const messages = res.message;
        for (const message of messages) {
          toast.warning("Dados inválidos", {
            description: message,
          });
        }
      } else if (res.status == HttpStatusCode.TooManyRequests) {
        toast.warning(res.message, {
          description:
            "Muitas solicitações requisitadas! Aguarde alguns segundos",
        });
      } else if (res.status === HttpStatusCode.NotFound) {
        toast.warning(res.message, {
          description: "Categoria selecionada não encontrada",
        });
      } else {
        console.log(res);

        toast.error(res.message, {
          description: "Falha na requisição, serviço indisponível.",
        });
      }
    }
  }
}
