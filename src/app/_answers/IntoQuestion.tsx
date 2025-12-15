"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getQuestionById, ResQuestion } from "../questions/lib/sessions";
import { SkeletonQuestions } from "@/components/SkeletonModel";
import AllAnswers from "./ui/AllAnswers";
import OneQuestion from "../questions/ui/OneQuestion";
import QuestionsNotFound from "../questions/ui/QuestionsNotFound";

type IntoQuestionProps = {
  questionId: string;
};

export default function IntoQuestion({ questionId }: IntoQuestionProps) {
  const [openResponseBox, setOpenResponseBox] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<ResQuestion | null>(null);

  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const openBox = searchParams.get("response");
    if (openBox) {
      setOpenResponseBox(true);
      route.replace(pathname);
    }
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
    <div className="flex w-full flex-col gap-8">
      <OneQuestion
        ID_USER={question.ID_USER}
        username={question.User.USERNAME}
        DT_CR={question.DT_CR}
        DT_UP={question.DT_UP}
        title={question.TITLE}
        category={question.Category.CATEGORY}
        description={question.DESCRIPTION}
        ID_QT={questionId}
        onOpenResponseModal={handleOpenModal}
        ID_CT={question.ID_CT}
        DT_UP_USER={question.User.DT_UP}
        DEL_AT_USER={question.User.DEL_AT}
      />

      <AllAnswers
        openResponseBox={openResponseBox}
        setOpenResponseBox={setOpenResponseBox}
        onChangeModal={setOpenResponseBox}
        questionId={questionId}
      />
    </div>
  );
}
