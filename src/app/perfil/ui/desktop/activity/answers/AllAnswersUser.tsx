"use client";

import { ParamsRequest } from "@/lib/type";
import React, { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { SkeletonAnswers } from "@/components/SkeletonModel";
import { RefreshCw } from "lucide-react";
import { ResAnswer } from "@/app/questions/lib/sessions";
import OneAnswer from "@/app/questions/[questionId]/ui/OneAnswer";
import { useAuthStore } from "@/store/useAuthStore";
import { FiltersProps } from "@/app/perfil/lib/types";
import EmptyAnswers from "./EmptyAnswers";

export default function AllAnswersUser({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: FiltersProps) {
  const { user, loading } = useAuthStore();

  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      if (!user) return;
      const params = new URLSearchParams();
      params.set("page", pgIndx.toString());
      params.set("id", user.ID_USER);

      if (debouncedSearch?.ID_CT) params.set("ID_CT", debouncedSearch?.ID_CT);
      if (debouncedSearch?.search) params.set("search", debouncedSearch.search);
      if (debouncedSearch?.registerStart)
        params.set("DT_IN", debouncedSearch?.registerStart);
      if (debouncedSearch?.registerEnd)
        params.set("DT_FM", debouncedSearch?.registerEnd);

      return `/answers/user?${params.toString()}`;
    },
    [user, debouncedSearch]
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);

    return () => clearTimeout(handler);
  }, [search]);

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

  const isFirstLoad = isLoading || !answers || !answers.length;

  return (
    <div className="pb-14">
      <div id="scroll-area" className="flex flex-col gap-6">
        {isFirstLoad ? (
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
                  response={answer.RESPONSE}
                  likes={answer.likes}
                  dislikes={answer.dislikes}
                  userVote={answer.user_vote}
                  redirect={true}
                  ID_QT={answer.ID_QT}
                  TITLE={answer.TITLE}
                />
              ))
            )
          ) : (
            <EmptyAnswers
              setSearch={setSearch}
              message="Parece que ainda não há respostas que correspondam aos filtros aplicados.
                            Que tal explorar outras opções?"
            />
          )
        ) : (
          <EmptyAnswers
            setSearch={setSearch}
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
