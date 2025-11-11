"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OneQuestion from "../../ui/OneQuestion";
import { getQuestionById, ResQuestion } from "../../lib/sessions";
import SkeletonQuestions from "@/components/SkeletonQuestion";
import QuestionsNotFound from "../../ui/QuestionsNotFound";
import RichTextEditor from "../../ui/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, UserCircle2 } from "lucide-react";

type IntoQuestionProps = {
  questionId: string;
};

export default function IntoQuestion({ questionId }: IntoQuestionProps) {
  const [openResponseBox, setOpenResponseBox] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<ResQuestion | null>(null);
  const [response, setResponse] = useState<string>("");

  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname()


  useEffect(() => {
    const openBox = searchParams.get("response");
    if (openBox) setOpenResponseBox(true);

    route.replace(pathname)

  }, [searchParams]);


  useEffect(() => {
    setIsLoading(true);

    getQuestionById(questionId)
      .then((res) => {
        if (res?.data) setQuestion(res.data);
        else setQuestion(null);
      })
      .finally(() => setIsLoading(false));
  }, [questionId]);

  const handleOpenModal = () => {
    setOpenResponseBox(!openResponseBox);
  };

  if (isLoading) return <SkeletonQuestions quantity={1} />;

  if (!question) {
    return (
      <QuestionsNotFound message="Nenhuma pergunta com esse ID foi encontrada" />
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <OneQuestion
        username={question.User.USERNAME}
        DT_CR={question.DT_CR}
        title={question.TITLE}
        category={question.Category.CATEGORY}
        description={question.DESCRIPTION}
        ID_QT={questionId}
        onOpenResponseModal={handleOpenModal}
      />

      {openResponseBox && (
        <div className="flex flex-col gap-3">
          <h2 className="font-mono font-bold text-xl text-gray-dark">
            Responda
          </h2>

          <RichTextEditor value={response} onChange={setResponse} />

          <div className="">
            <Button className="w-36 p-3">Enviar</Button>
          </div>
        </div>
      )}

      <h2>Respostas(2)</h2>
      <div className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover transition-colors">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex flex-row gap-3 items-center">
            <UserCircle2
              size={32}
              className="text-blue-light hover:text-blue-hover transition"
            />
            <p className="font-sans text-base sm:text-lg text-gray-dark">
              Maluzitos
            </p>
          </div>

          <p className="font-sans text-sm sm:text-md text-gray-dark">
            Resposta enviada em: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div
          className="prose prose-sm sm:prose-base max-w-none text-gray-dark prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto prose-code:text-blue-700 prose-code:font-mono prose-code:text-sm break-words whitespace-pre-wrap overflow-hidden"
          dangerouslySetInnerHTML={{
            __html:
              "Pesquisa ai como faz",
          }}
        />

        <div className="flex flex-row gap-7 justify-end">
          <Button variant={"outline"}>
            <ThumbsUp size={26} className="text-blue-primary" />
          </Button>

          <Button variant={"outline"}>
            <ThumbsDown size={26} className="text-blue-dark" />
          </Button>
        </div>
      </div>
    </div>
  );
}
