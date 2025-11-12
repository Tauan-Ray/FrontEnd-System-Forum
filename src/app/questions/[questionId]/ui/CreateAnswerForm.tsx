import { useState } from "react";
import RichTextEditor from "../../ui/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { CreateAnswer } from "../actions/CreateAnswer";
import { toast } from "sonner";

type AnswerFormProps = {
  closeResponseBox: () => void;
  questionId: string;
  mutate: () => void;
}

export default function AnswerForm({ questionId, closeResponseBox, mutate }: AnswerFormProps) {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isEmptyResponse = (response: string) => {
  const text = response.replace(/<[^>]*>/g, "").trim();

  return text === "";

  }

  async function onSubmit() {
    setIsLoading(true);
    if (isEmptyResponse(response)) {
      toast.warning("Resposta vazia", {
        description: "Atenção, você não pode enviar uma resposta vazia!"
      })
    } else {
      await CreateAnswer({ ID_QT: questionId, response });
      closeResponseBox()
      mutate()
    }

    setIsLoading(false);
    setResponse("");
  }


  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-mono font-bold text-xl text-gray-dark">Responda</h2>

      <RichTextEditor value={response} onChange={setResponse} />

      <div className="mb-5">
        <Button disabled={isLoading} onClick={onSubmit} className="w-36 p-3">Enviar</Button>
      </div>
    </div>
  );
}
