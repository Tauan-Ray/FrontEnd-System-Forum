"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "@/app/questions/ui/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { EditAnswerAction } from "../actions/EditQuestionAction";

type EditAnswerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actualResponse: string;
  ID_AN: string;
};

export default function EditAnswerDialog({
  open,
  onOpenChange,
  actualResponse,
  ID_AN,
}: EditAnswerDialogProps) {
  const [response, setResponse] = useState<string>(actualResponse);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEmptyResponse = (response: string) => {
    const text = response.replace(/<[^>]*>/g, "").trim();

    return text === "";
  };

  async function onSubmit() {
    setIsLoading(true);
    if (isEmptyResponse(response)) {
      toast.warning("Resposta vazia", {
        description: "Atenção, você não pode enviar uma resposta vazia!",
      });
      setIsLoading(false);
      return
    }

    await EditAnswerAction(response, ID_AN)

    setIsLoading(false);
    setResponse("");
    onOpenChange(false);

    setTimeout(() => {
        window.location.reload();
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] w-full sm:max-w-md md:max-w-lg mx-auto overflow-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-lg md:text-2xl">
            Edite sua resposta
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Altere a sua resposta agora mesmo!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <h2>Responda</h2>
          <RichTextEditor value={response} onChange={setResponse} />

          <div className="mb-5">
            <Button
              disabled={isLoading}
              onClick={onSubmit}
              className="w-36 p-3"
            >
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
