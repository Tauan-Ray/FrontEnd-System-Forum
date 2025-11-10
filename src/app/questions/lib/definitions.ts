import { z } from '@/components/pt-zod';

export const CreateQuestionFormSchema = z.object({
  title: z.string().trim()
    .min(5, 'O titulo deve conter no mínimo 5 caracter(es)')
    .max(60, 'O titulo deve conter no máximo 60 caracteres'),
  description: z.string()
    .min(5, 'A descrição deve conter no mínimo 5 caracter(es)')
    .max(255, 'A descrição deve conter no máximo 255 caracteres')
    .trim(),
  category: z.string().min(1, 'Selecione uma categoria'),
})

