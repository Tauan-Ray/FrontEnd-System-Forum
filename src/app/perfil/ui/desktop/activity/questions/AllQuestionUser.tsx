"use client";

import { ParamsRequest } from "@/lib/type";
import { useCallback, useEffect } from "react";
import { ResQuestion } from "@/app/questions/lib/sessions";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { SkeletonQuestions } from "@/components/SkeletonModel";
import QuestionsNotFound from "@/app/questions/ui/QuestionsNotFound";
import OneQuestion from "@/app/questions/ui/OneQuestion";
import { RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { FiltersProps } from "@/app/perfil/lib/types";

export default function AllQuestionsUser({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: FiltersProps) {
  const user = useAuthStore((prev) => prev.user);
  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      if (!user) return;
      const params = new URLSearchParams();

      params.set("page", pgIndx.toString());
      params.set("id", user.ID_USER);

      if (debouncedSearch?.ID_CT) params.set("ID_CT", debouncedSearch?.ID_CT);
      if (debouncedSearch?.search) params.set("search", debouncedSearch.search)
      if (debouncedSearch?.registerStart)
        params.set("DT_IN", debouncedSearch?.registerStart);
      if (debouncedSearch?.registerEnd)
        params.set("DT_FM", debouncedSearch?.registerEnd);

      return `/questions/user?${params.toString()}`;
    },
    [user, debouncedSearch]
  );

  const {
    data: questions,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorQuestion,
  } = useSWRInfinite<ParamsRequest<ResQuestion[]>>(getParams, fetcher, {
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
    const meta = questions?.at(-1)?._meta;

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
          !errorQuestion
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
  }, [questions, setSize, errorQuestion, isValidating]);

  const isFirstLoad = isLoading || !questions || !questions.length;

  return (
      <div className="pb-14">
        <div id="scroll-area" className="flex flex-col gap-6">
          {isFirstLoad ? (
            <SkeletonQuestions quantity={3} />
          ) : size >= 0 && !errorQuestion ? (
            questions?.length && questions[0]._data?.length ? (
              questions?.map(({ _data }, _index) => {
                if (_data?.length) {
                  return _data?.map((question, index: number) => {
                    return (
                      <OneQuestion
                        key={question.ID_QT}
                        ID_QT={question.ID_QT}
                        ID_USER={question.ID_USER}
                        username={question.User.USERNAME}
                        DT_CR={question.DT_CR}
                        category={question.Category.CATEGORY}
                        title={question.TITLE}
                        description={question.DESCRIPTION}
                        redirect={true}
                      />
                    );
                  });
                }
              })
            ) : (
              <QuestionsNotFound
                setSearch={setSearch}
                message="Parece que ainda não há perguntas que correspondam aos filtros aplicados.
                            Que tal explorar outras categorias ou criar uma nova pergunta?"
              />
            )
          ) : (
            <QuestionsNotFound
              setSearch={setSearch}
              type="error"
              message={
                errorQuestion?.data?.message || "Falha ao carregar perguntas..."
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
