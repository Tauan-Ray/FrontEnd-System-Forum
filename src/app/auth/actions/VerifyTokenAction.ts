import { HttpStatusCode } from "axios";
import { verifyToken } from "../lib/sessions";
import { toast } from "sonner";

export async function VerifyTokenAction(token: string) {
  const res = await verifyToken(token);

  if (!res?.message) {
    return {
      ok: true,
    };
  } else {
    switch (res.status) {
      case HttpStatusCode.BadRequest:
        toast.warning("Erro ao verificar token", {
          description: res.message,
        });
        break;

      default:
        toast.error("Erro interno", {
          description: "Erro ao se comunicar com serviço externo",
        });
        console.error(res);
        break;
    }

    return {
      ok: false,
    };
  }
}
