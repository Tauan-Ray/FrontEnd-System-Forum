"use client";

import FormError from "@/app/auth/ui/FormError";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCategoryFormSchema } from "../../lib/definitions";
import { EditCategoryAction } from "../../actions/EditCategoryAction";

type EditCategoryForm = {
  ID_CT: string;
  CATEGORY: string;
  handleCloseDialog: (reloadCategories: boolean) => void;
};

export default function EditCategoryForm({
  ID_CT,
  CATEGORY,
  handleCloseDialog: closeDialog,
}: EditCategoryForm) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateCategoryFormSchema>>({
    resolver: zodResolver(UpdateCategoryFormSchema),
    defaultValues: {
      name: CATEGORY ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateCategoryFormSchema>) {
    setIsLoading(true);
    const res = await EditCategoryAction(values, ID_CT)
    setIsLoading(false);

    if (res.ok) {
      form.reset()
      closeDialog(true)
    }
  }

  const handleCloseDialog = () => {
    form.reset();
    closeDialog(false);
  };
  return (
    <Form {...form}>
      <form
        id="form-update-category"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a categoria"
                  className="font-mono font-semibold"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormError message={form.formState.errors.name?.message} />
            </FormItem>
          )}
        />

        <DialogFooter className="flex flex-col gap-6 pt-4">
          <Button
            id="form-edit-category"
            disabled={isLoading}
            className="font-medium"
          >
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="font-medium"
            onClick={handleCloseDialog}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
