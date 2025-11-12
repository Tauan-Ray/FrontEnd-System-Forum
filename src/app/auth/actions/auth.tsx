import { z } from '@/components/pt-zod';
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { SigninFormSchema, SignUpFormSchema } from '../lib/definitions';
import { createNewUserSession, createSession, deleteSession } from '../lib/sessions';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export async function AuthenticateUser(value: z.infer<typeof SigninFormSchema>) {
  const res = await createSession(value);

  if (!res?.message) {
    const { checkAuth } = useAuthStore.getState();
    await checkAuth();

    return redirect(value.redirect)
  } else {
    if (res.status == HttpStatusCode.Unauthorized) {
      toast.warning(res.message, {
        description: "E-mail e/ou senha incorretos!",
      })
    } else if (res.status == HttpStatusCode.TooManyRequests) {
      toast.warning(res.message, {
        description: "Muitas solicitações requisitadas! Aguarde alguns segundos",
      })
    } else {
      console.log(res);

      toast.error(res.message, {
        description: 'Falha na requisição, serviço indisponível.',
      })
    }
  }
}

export async function AuthenticateNewUser(value: z.infer<typeof SignUpFormSchema>) {
  const res = await createNewUserSession(value);

  if (!res?.message) {
    const { checkAuth } = useAuthStore.getState();
    await checkAuth();
    return redirect(value.redirect)
  } else {
    if (res.status == HttpStatusCode.Conflict) {
      toast.warning(res.message, {
        description: "Email ou usuário já registrado no sistema!",
      })
    } else if (res.status == HttpStatusCode.TooManyRequests) {
      toast.warning(res.message, {
        description: "Muitas solicitações requisitadas! Aguarde alguns segundos",
      })
    } else {
        console.log(res);

        toast.error(res.message, {
          description: 'Falha na requisição, serviço indisponível.',
        })
    }
  }
}

export async function logout() {
  deleteSession()
  redirect('/auth/signin')
}
