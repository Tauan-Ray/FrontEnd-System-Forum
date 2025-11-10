import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateQuestionFormSchema } from "../lib/definitions";
import { useState } from "react";
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

type CreateQuestionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateQuestionDialog({
  open,
  onOpenChange,
}: CreateQuestionDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreateQuestionFormSchema>>({
    resolver: zodResolver(CreateQuestionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateQuestionFormSchema>) {
    setIsLoading(true);
    console.log(values)
    // await AuthenticateUser(values);
    setIsLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form
          id="form-create-question"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mb-8"
        >
          <DialogContent className="max-h-[90vh] w-full sm:max-w-md md:max-w-lg mx-auto overflow-auto">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle className="text-lg md:text-2xl">
                Qual sua dúvida?
              </DialogTitle>
              <DialogDescription className="text-xs md:text-sm">
                Solucione ela agora mesmo!
              </DialogDescription>
            </DialogHeader>
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
                      <div>
                        <Input
                          placeholder="Digite sua dúvida"
                          className="w-full font-mono font-bold text-xs md:text-base"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormError message={form.formState.errors.title?.message} />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                      <FormLabel className="pl-3 text-base md:text-lg">
                        Categoria:{" "}
                      </FormLabel>
                      <FormControl>
                        <CategorySelect
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormError message={form.formState.errors.category?.message} />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-3 text-base md:text-lg">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <div className="max-w-md">
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormError
                      message={form.formState.errors.description?.message}
                    />
                  </FormItem>
                )}
              />

              <FormError message={form.formState.errors.description?.message} />
            </div>
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                form="form-create-question"
                className="flex py-5 w-4/5 md:w-2/5 text-md md:text-lg md:py-6 justify-center"
              >
                {isLoading && <Spinner />} Criar pergunta
              </Button>
            </div>

          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
