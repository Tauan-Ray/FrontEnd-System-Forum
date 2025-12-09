"use client";

import { ParamsRequest } from "@/lib/type";
import { useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { RefreshCw } from "lucide-react";
import { searchParams } from "@/app/questions/lib/types";
import { ResAllAnswers } from "@/app/_answers/lib/sessions";
import { SkeletonAnswers, SkeletonAnswersAdmin } from "@/components/SkeletonModel";
import OneAnswerAdmin from "./OneAnswerAdmin";
import AnswerNotFoundAdmin from "./AnswerNotFoundAdmin";

type AllAnswersAdminProps = {
  search: searchParams;
  setSearch: React.Dispatch<React.SetStateAction<searchParams>>;
  debouncedSearch: searchParams;
  setDebouncedSearch: React.Dispatch<React.SetStateAction<searchParams>>;
};

export default function AllAnswersAdmin({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: AllAnswersAdminProps) {
  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      const params = new URLSearchParams();

      params.set("page", pgIndx.toString());

      if (debouncedSearch?.ID_CT) params.set("ID_CT", debouncedSearch?.ID_CT);
      if (debouncedSearch?.search) params.set("search", debouncedSearch.search)
      if (debouncedSearch?.registerStart)
        params.set("DT_IN", debouncedSearch?.registerStart);
      if (debouncedSearch?.registerEnd)
        params.set("DT_FM", debouncedSearch?.registerEnd);

      return `/answers/all?${params.toString()}`;
    },
    [debouncedSearch]
  );

  const {
    data: answers,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorAnswer,
  } = useSWRInfinite<ParamsRequest<ResAllAnswers[]>>(getParams, fetcher, {
    revalidateOnFocus: true,
    onErrorRetry(err, key, config, revalidate, revalidateOpts) {
      if (err.status == 401) return;
    },
  });

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
        <div id="scroll-area" className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <SkeletonAnswersAdmin quantity={3} />
          ) : size >= 0 && !errorAnswer ? (
            answers?.length && answers[0]._data?.length ? (
              answers?.map(({ _data }, _index) => {
                if (_data?.length) {
                  return _data?.map((answer, index: number) => {
                    return (
                      <OneAnswerAdmin
                        key={answer.ID_AN}
                        ID_AN={answer.ID_AN}
                        ID_USER={answer.ID_USER}
                        username={answer.USERNAME}
                        DT_CR={answer.DT_CR}
                        DT_UP={answer.DT_UP}
                        DEL_AT={answer.DEL_AT}
                        response={answer.RESPONSE}
                        likes={answer.likes}
                        dislikes={answer.dislikes}
                        userVote={answer.user_vote}
                        redirect={true}
                        ID_QT={answer.ID_QT}
                        TITLE={answer.TITLE}
                        DT_UP_USER={answer.dt_up_user}
                      />
                    );
                  });
                }
              })
            ) : (
                <AnswerNotFoundAdmin
                type="normal"
                    setSearch={setSearch}
                    message="Parece que ainda não existem perguntas que correspondam aos filtros aplicados.
                                Que tal explorar outras categorias ou criar uma nova resposta"
                />
            )
          ) : (
            <AnswerNotFoundAdmin
                type='error'
                setSearch={setSearch}
                message={errorAnswer?.data?.message || "Falha ao carregar perguntas" }
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
