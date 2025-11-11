import { z } from '@/components/pt-zod';

export const CreateQuestionFormSchema = z.object({
  title: z.string().trim()
    .min(5, 'O titulo deve conter no mínimo 5 caracter(es)')
    .max(60, 'O titulo deve conter no máximo 60 caracteres'),

  description: z.string()
    .min(5, 'A descrição deve conter no mínimo 5 caracter(es)')
    .max(1200, 'A descrição deve conter no máximo 1200 caracteres')
    .trim()
    .refine((html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      return text.length <= 255;
    }, {
      message: 'A descrição deve conter no máximo 255 caracteres (somente texto)',
    }),

  ID_CT: z.string().min(1, 'Selecione uma categoria'),
});
