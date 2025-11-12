"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OneQuestion from "../../ui/OneQuestion";
import { getQuestionById, ResQuestion } from "../../lib/sessions";
import { SkeletonQuestions } from "@/components/SkeletonModel";
import QuestionsNotFound from "../../ui/QuestionsNotFound";
import RichTextEditor from "../../ui/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import AllAnswers from "./AllAnswers";

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

      <AllAnswers onChangeModal={setOpenResponseBox} questionId={questionId} />

    </div>
  );
}
