"use client";

import { ParamsRequest } from "@/lib/type";
import { useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { RefreshCw } from "lucide-react";
import { searchCategoriesParams } from "../../lib/types";
import { ResCategory } from "@/app/questions/lib/sessions";
import { SkeletonCategories } from "@/components/SkeletonModel";
import OneCategory from "./OneCategory";
import CategoriesNotfound from "./CategoryNotFound";

type AllQuestionsAdminProps = {
  search: searchCategoriesParams;
  setSearch: React.Dispatch<React.SetStateAction<searchCategoriesParams>>;
  debouncedSearch: searchCategoriesParams;
  setDebouncedSearch: React.Dispatch<
    React.SetStateAction<searchCategoriesParams>
  >;
};

export default function AllCategories({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: AllQuestionsAdminProps) {
  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      const params = new URLSearchParams();

      params.set("page", pgIndx.toString());

      if (debouncedSearch?.ID_CT) params.set("ID_CT", debouncedSearch?.ID_CT);
      if (debouncedSearch?.CATEGORY)
        params.set("CATEGORY", debouncedSearch.CATEGORY);
      if (debouncedSearch?.registerStart)
        params.set("DT_IN", debouncedSearch?.registerStart);
      if (debouncedSearch?.registerEnd)
        params.set("DT_FM", debouncedSearch?.registerEnd);

      return `/category/all?${params.toString()}`;
    },
    [debouncedSearch],
  );

  const {
    data: categories,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorCategory,
  } = useSWRInfinite<ParamsRequest<ResCategory[]>>(getParams, fetcher, {
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
    const meta = categories?.at(-1)?._meta;

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
          !errorCategory
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
  }, [categories, setSize, errorCategory, isValidating]);
  return (
    <div className="pb-14">
      <div
        id="scroll-area"
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {isLoading ? (
          <SkeletonCategories quantity={3} />
        ) : size >= 0 && !errorCategory ? (
          categories?.length && categories[0]._data?.length ? (
            categories?.map(({ _data }, _index) => {
              if (_data?.length) {
                return _data?.map((category, index: number) => {
                  return (
                    <OneCategory
                      key={category.ID_CT}
                      ID_CT={category.ID_CT}
                      CATEGORY={category.CATEGORY}
                      DT_CR={category.DT_CR}
                      DT_UP={category.DT_UP}
                      DEL_AT={category.DEL_AT}
                      mutate={mutate}
                    />
                  );
                });
              }
            })
          ) : (
            <CategoriesNotfound
              type="normal"
              setSearch={setSearch}
              message="Ops! Parece que não existe nenhuma pergunta para os filtros aplicados.
                            Que tal explorar outras categorias ou criar uma nova?"
            />
          )
        ) : (
          <CategoriesNotfound
            type="error"
            setSearch={setSearch}
            message={
              errorCategory?.data?.message || "Falha ao carregar perguntas..."
            }
          />
        )}
      </div>
      {isValidating && (
        <div className="flex w-full flex-1 flex-row items-center justify-center gap-5 py-10 text-lg text-zinc-400">
          &nbsp; Carregando mais dados
          <RefreshCw className="h-5 w-5 animate-spin text-blue-primary" />
        </div>
      )}
    </div>
  );
}
