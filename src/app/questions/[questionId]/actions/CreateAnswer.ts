import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { createAnswer } from "../../lib/sessions";

export async function CreateAnswer(
  values: { ID_QT: string, response: string }
) {
  const res = await createAnswer(values);
  console.log(res)

  if (res?.message === "Resposta criada com sucesso") {
    toast.success(res.message, {
      description: "Obrigado por contribuir com o aprendizado de todos!",
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
          description: "Pergunta selecionada não encontrada",
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
