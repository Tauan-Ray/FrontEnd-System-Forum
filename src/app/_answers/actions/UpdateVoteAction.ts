import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { UpdateVote } from "../lib/sessions";

export async function UpdateVoteAction(idAnswer: string, type: { type: "LIKE" | "DESLIKE" }) {
  const resData = await UpdateVote(idAnswer, type);
  const res = resData.data

  if (res?.message?.includes("Voto")) {
    toast.success(res.message, {
      description: `Seu ${type.type.toLowerCase()} foi registrado. Obrigado por contribuir!`,
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
          description: "Resposta selecionada não encontrada",
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
