"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateQuestionFormSchema } from "../lib/definitions";
import React, { useState } from "react";
import { z } from "@/components/pt-zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/app/auth/ui/FormError";
import CategorySelect from "./CategorySelect";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { CreateQuestion } from "../actions/CreateQuestion";
import { EditQuestionAction } from "../actions/EditQuestionAction";

type CreateQuestionDialogProps = {
  type: "edit" | "create";
  title?: string;
  description?: string;
  category?: string;
  ID_QT?: string;
  children: (open: () => void ) => React.ReactNode;
};

export default function CreateQuestionDialog({
  type,
  title,
  description,
  category,
  ID_QT,
  children,
}: CreateQuestionDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<z.infer<typeof CreateQuestionFormSchema>>({
    resolver: zodResolver(CreateQuestionFormSchema),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
      ID_CT: category ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateQuestionFormSchema>) {
    setIsLoading(true);

    if (type === "create") {
      await CreateQuestion(values);
    } else {
      await EditQuestionAction(values, ID_QT ?? "");
    }

    setIsLoading(false);
    form.reset();
    setOpen(false);

    if (type === "edit") {
      window.location.reload();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      {children(() => setOpen(true))}
      <DialogContent
        className="mx-auto max-h-[90vh] w-full overflow-auto sm:max-w-md md:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-lg md:text-2xl">
            Qual sua dúvida?
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Solucione ela agora mesmo!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 w-full">
            <div className="flex flex-col gap-7">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-3 text-base md:text-lg">
                      Título
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua dúvida"
                        className="w-full font-mono text-xs font-bold md:text-base"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormError message={form.formState.errors.title?.message} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ID_CT"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                      <FormLabel className="pl-3 text-base md:text-lg">
                        Categoria:
                      </FormLabel>
                      <FormControl>
                        <CategorySelect
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          setSearch={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormError message={form.formState.errors.ID_CT?.message} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-3 text-base md:text-lg">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormError
                      message={form.formState.errors.description?.message}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                className="text-md flex w-4/5 justify-center py-5 md:w-2/5 md:py-6 md:text-lg"
              >
                {isLoading && <Spinner />}
                {type === "edit" ? "Editar pergunta" : "Criar pergunta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
