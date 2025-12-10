import { deleteCategory } from "@/app/questions/lib/sessions";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

export async function DeleteCategoryAction(ID_CT: string) {
  const res = await deleteCategory(ID_CT);

  if (res?.message == "Categoria deletada com sucesso") {
    toast.success(res.message, {
      description: "A categoria foi engolida por um buraco negro",
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

        case HttpStatusCode.Forbidden:
          toast.warning(res.message, {
            description: "Acessível apenas ADMIN",
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
