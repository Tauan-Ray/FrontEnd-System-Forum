"use client";

import { ParamsRequest } from "@/lib/type";
import { useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { SkeletonAnswers } from "@/components/SkeletonModel";
import { RefreshCw } from "lucide-react";
import { ResAnswer } from "../../lib/sessions";
import OneAnswer from "./OneAnswer";
import AnswersNotFound from "./AnswerNotFound";

export default function AllQuestion({ questionId }: { questionId: string }) {
  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      const params = new URLSearchParams();

      params.set("page", pgIndx.toString());
      params.set("id", questionId);

      return `/answers/question?${params.toString()}`;
    },
    [questionId]
  );

  const {
    data: answers,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorAnswer,
  } = useSWRInfinite<ParamsRequest<ResAnswer[]>>(getParams, fetcher, {
    revalidateOnFocus: true,
    onErrorRetry(err, key, config, revalidate, revalidateOpts) {
      if (err.status == 401) return;
    },
  });

  useEffect(() => {
    const scrollArea = document?.querySelector("#scroll-area");
    const meta = answers?.at(-1)?._meta;

    function handle() {
      if (scrollArea && meta && !isValidating) {
        const { scrollTop, scrollHeight, clientHeight } = scrollArea;

        if (
          scrollTop + clientHeight >= scrollHeight - 10 &&
          meta?._page < meta?._total_page
        ) {
          setSize((prev) => prev + 1);
        }
      }
    }

    const intervalCheckScroll: NodeJS.Timeout = setInterval(() => {
      if (scrollArea && meta && !isValidating) {
        if (
          scrollArea?.scrollTop + scrollArea?.clientHeight ==
            scrollArea?.scrollHeight &&
          meta?._page < meta?._total_page &&
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

  return (
    <div className="pb-14">
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
            answers?.map(({ _data }, _index) => {
              if (_data?.length) {
                return _data?.map((answer) => {
                  return (
                    <OneAnswer
                      key={answer.ID_AN}
                      ID_AN={answer.ID_AN}
                      username={answer.USERNAME}
                      DT_CR={answer.DT_CR}
                      response={answer.RESPONSE}
                      likes={answer.likes}
                      deslikes={answer.dislikes}
                    />
                  );
                });
              }
            })
          ) : (
            <AnswersNotFound message="Ainda não há respostas para esta pergunta. Que tal ser o primeiro a responder?" />
          )
        ) : (
          <AnswersNotFound
            message={
              errorAnswer?.data?.message || "Falha ao carregar perguntas..."
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
