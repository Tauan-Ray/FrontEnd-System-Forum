import { z } from '@/components/pt-zod';

export const SigninFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string()
    .min(8, 'A senha deve conter pelo menos 8 caracter(es)')
    .max(20, 'A senha deve conter no máximo 20 caracteres')
    .regex(/[a-zA-Z]/, { message: 'É esperado ao menos 1 letra' })
    .regex(/[0-9]/, { message: 'É esperado ao menos 1 número' })
    .trim(),
  password_remember: z.boolean().default(true).optional(),
  redirect: z.string().trim().default('/')
})


export const SignUpFormSchema = z.object({
  name: z.string()
    .min(3, 'O nome deve conter pelo menos 3 caracter(es)')
    .max(40, 'O nome deve conter no máximo 40 caracteres')
    .trim(),
  username: z.string()
    .min(3, 'O username deve conter pelo menos 3 caracter(es)')
    .max(12, 'O username deve conter no máximo 12 caracteres')
    .trim(),
  email: z.string().email().trim(),
  password: z.string()
    .min(8, 'A senha deve conter pelo menos 8 caracter(es)')
    .max(20, 'A senha deve conter pelo menos 8 caracter(es)')
    .regex(/[a-zA-Z]/, { message: 'É esperado ao menos 1 letra' })
    .regex(/[0-9]/, { message: 'É esperado ao menos 1 número' })
    .trim(),
  confirmPassword: z.string(),
  password_remember: z.boolean().default(true).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})
