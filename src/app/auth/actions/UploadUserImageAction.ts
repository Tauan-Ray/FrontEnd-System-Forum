import { UploadUserImage } from '../lib/sessions';
import { toast } from "sonner";
import { HttpStatusCode } from "axios";
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAvatarStore } from '@/store/useAvatarStore';

export async function UploadUserImageAction(image: File, redirectUrl: string) {
  const res = await UploadUserImage(image);

  if (!res || Object.keys(res).length === 0) {
    toast.success("Imagem enviada com sucesso!");

    const { checkAuth, user } = useAuthStore.getState();
    await checkAuth();

    if (user?.ID_USER) {
      const { avatars, setAvatar } = useAvatarStore.getState();
      delete avatars[user.ID_USER];
      setAvatar(user.ID_USER, '', 0);
    }

    return redirect(redirectUrl);
  }

  switch (res.status) {
    case HttpStatusCode.Unauthorized:
      toast.warning("Sua sessão expirou.", {
        description: "Faça login novamente para continuar.",
      });
      break;

    case HttpStatusCode.Forbidden:
      toast.error("Sem permissão para enviar esta imagem.", {
        description: "Falha na policy do bucket.",
      });
      break;

    case HttpStatusCode.NotFound:
      toast.error("URL de upload inválida.", {
        description: "O link pré-assinado pode ter expirado.",
      });
      break;

    case HttpStatusCode.PayloadTooLarge:
      toast.error("A imagem é muito grande.", {
        description: "Envie uma imagem menor.",
      });
      break;

    case HttpStatusCode.UnsupportedMediaType:
      toast.error("Formato de imagem não permitido.", {
        description: "Use JPG ou PNG.",
      });
      break;

    case HttpStatusCode.TooManyRequests:
      toast.warning("Muitas tentativas!", {
        description: "Aguarde alguns segundos e tente novamente.",
      });
      break;

    default:
      toast.error("Falha ao enviar imagem.", {
        description: res.message || "Erro inesperado no servidor.",
      });
      break;
  }
}
