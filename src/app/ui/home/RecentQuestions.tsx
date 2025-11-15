"use client";

import useSWR from "swr";
import { SkeletonQuestions } from "@/components/SkeletonModel";
import OneQuestion from "@/app/questions/ui/OneQuestion";
import { ParamsRequest } from "@/lib/type";
import { ResQuestion } from "@/app/questions/lib/sessions";
import ErrorState from "./ErrorState";

const localFetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
};

export default function RecentQuestions() {
  const { data: questions, error, isLoading, mutate } = useSWR<ParamsRequest<ResQuestion[]>>(
    "/api/questions/recent",
    localFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 2,
    }
  );

  if (isLoading) return <SkeletonQuestions quantity={5} />;
  if (error)
    return (
      <ErrorState
        title="Erro ao carregar perguntas recentes"
        message="Ocorreu um problema ao tentar buscar as últimas perguntas. Verifique sua conexão e tente novamente."
        onRetry={() => mutate()}
      />
    );

  return (
    <div className="pb-14">
      <div className="flex flex-col gap-6">
        {questions?._data?.map((question) => (
          <OneQuestion
            key={question.ID_QT}
            ID_USER={question.ID_USER}
            ID_QT={question.ID_QT}
            username={question.User.USERNAME}
            DT_CR={question.DT_CR}
            title={question.TITLE}
            category={question.Category.CATEGORY}
            description={question.DESCRIPTION}
            redirect={true}
          />
        ))}
      </div>
    </div>
  );
}
