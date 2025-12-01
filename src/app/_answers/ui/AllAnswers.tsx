"use client";

import { ParamsRequest } from "@/lib/type";
import React, { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { SkeletonAnswers } from "@/components/SkeletonModel";
import { RefreshCw } from "lucide-react";
import OneAnswer from "./OneAnswer";
import AnswersNotFound from "./AnswerNotFound";
import CreateAnswerForm from "./CreateAnswerForm";
import { useAuthStore } from "@/store/useAuthStore";
import { ResAnswer } from "../lib/sessions";

type AllAnswersProps = {
  questionId: string;
  onChangeModal: React.Dispatch<React.SetStateAction<boolean>>;
  openResponseBox: boolean;
  setOpenResponseBox: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AllAnswers({
  questionId,
  onChangeModal,
  openResponseBox,
  setOpenResponseBox,
}: AllAnswersProps) {
  const { user, loading } = useAuthStore();

  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      const params = new URLSearchParams();
      params.set("page", pgIndx.toString());
      params.set("id", questionId);

      if (user?.ID_USER) params.set("idUser", user.ID_USER);

      return `/answers/question?${params.toString()}`;
    },
    [questionId, user]
  );

  const {
    data: answers,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorAnswer,
  } = useSWRInfinite<ParamsRequest<ResAnswer[]>>(
    (pgIndx, prevPgIndx) => {
      if (loading) return null;
      return getParams(pgIndx, prevPgIndx);
    },
    fetcher,
    {
      revalidateOnFocus: true,
      onErrorRetry(err) {
        if (err.status === 401) return;
      },
    }
  );

  const [showForm, setShowForm] = useState(openResponseBox);

  useEffect(() => {
    if (openResponseBox) {
      setShowForm(true);
    } else {
      const timeout = setTimeout(() => setShowForm(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [openResponseBox]);

  useEffect(() => {
    const scrollArea = document?.querySelector("#scroll-area");
    const meta = answers?.at(-1)?._meta;

    function handle() {
      if (scrollArea && meta && !isValidating) {
        const { scrollTop, scrollHeight, clientHeight } = scrollArea;
        if (
          scrollTop + clientHeight >= scrollHeight - 10 &&
          meta._page < meta._total_page
        ) {
          setSize((prev) => prev + 1);
        }
      }
    }

    const intervalCheckScroll: NodeJS.Timeout = setInterval(() => {
      if (scrollArea && meta && !isValidating) {
        if (
          scrollArea.scrollTop + scrollArea.clientHeight ===
            scrollArea.scrollHeight &&
          meta._page < meta._total_page &&
          !errorAnswer
        ) {
          setSize((prev) => prev + 1);
        } else {
          clearInterval(intervalCheckScroll);
        }
      }
    }, 1500);

    scrollArea?.addEventListener("scroll", handle);

    return () => {
      scrollArea?.removeEventListener("scroll", handle);
      clearInterval(intervalCheckScroll);
    };
  }, [answers, setSize, errorAnswer, isValidating]);

  if (loading) {
    return (
      <div className="py-10 text-gray-500 text-center">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <div className="pb-14">
      {showForm && (
        <div
          className={`transition-all duration-200 ${
            openResponseBox ? "animate-slideFadeIn" : "animate-slideFadeOut"
          }`}
        >
          <CreateAnswerForm
            mutate={() => mutate()}
            closeResponseBox={() => setOpenResponseBox(false)}
            questionId={questionId}
          />
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-dark mb-4">
        Respostas
        {answers && answers[0]?._meta?._total_results !== undefined && (
          <span className="text-blue-primary ml-1">
            ({answers[0]?._meta?._total_results})
          </span>
        )}
      </h2>

      <div id="scroll-area" className="flex flex-col gap-6">
        {isLoading ? (
          <SkeletonAnswers quantity={3} />
        ) : size >= 0 && !errorAnswer ? (
          answers?.length && answers[0]._data?.length ? (
            answers?.map(({ _data }) =>
              _data?.map((answer) => (
                <OneAnswer
                  key={answer.ID_AN}
                  ID_AN={answer.ID_AN}
                  ID_USER={answer.ID_USER}
                  username={answer.USERNAME}
                  DT_CR={answer.DT_CR}
                  DT_UP={answer.DT_UP}
                  DT_UP_USER={answer.dt_up_user}
                  response={answer.RESPONSE}
                  likes={answer.likes}
                  dislikes={answer.dislikes}
                  userVote={answer.user_vote}
                />
              ))
            )
          ) : (
            <AnswersNotFound
              onChangeModal={onChangeModal}
              message="Ainda não há respostas para esta pergunta. Que tal ser o primeiro a responder?"
            />
          )
        ) : (
          <AnswersNotFound
            onChangeModal={onChangeModal}
            message={
              errorAnswer?.data?.message || "Falha ao carregar respostas..."
            }
          />
        )}
      </div>

      {isValidating && (
        <div className="flex flex-1 flex-row text-lg py-10 w-full items-center justify-center text-zinc-400 gap-5">
          &nbsp; Carregando mais dados
          <RefreshCw className="h-5 w-5 animate-spin text-blue-primary" />
        </div>
      )}
    </div>
  );
}
