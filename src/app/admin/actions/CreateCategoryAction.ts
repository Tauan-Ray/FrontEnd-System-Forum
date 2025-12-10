import { z } from "@/components/pt-zod";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { UpdateCategoryFormSchema } from "../lib/definitions";
import { createCategory } from "@/app/questions/lib/sessions";

export async function CreateCategoryAction(
  values: z.infer<typeof UpdateCategoryFormSchema>,
) {
  const res = await createCategory(values);

  if (res?.message == "Categoria criada com sucesso") {
    toast.success(res.message, {
      description: "Log logo sua categoria estará cheia de vida!",
    });

    return {
      ok: true,
    };
    
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

        case HttpStatusCode.Forbidden:
          toast.error("Sem permissão para editar esta categoria.", {
            description: res.message,
          });
          break;

        case HttpStatusCode.Conflict:
          toast.warning("Categoria já existente", {
            description: res.message,
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
    return {
      ok: false,
    };
  }
}
