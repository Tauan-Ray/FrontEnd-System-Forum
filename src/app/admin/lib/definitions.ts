import { z } from "@/components/pt-zod";

export const UpdateCategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, "A categoria deve conter pelo menos 3 caracter(es)")
    .max(45, "A categoria deve conter no máximo 45 caracteres")
    .trim(),
});