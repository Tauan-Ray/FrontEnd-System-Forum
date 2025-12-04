"use client";

import { ParamsRequest } from "@/lib/type";
import React, { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/app/auth/lib/sessions";
import { SkeletonAnswers } from "@/components/SkeletonModel";
import { RefreshCw } from "lucide-react";
import { searchUserParams } from "../../lib/types";
import OneUser from "./OneUser";
import UsersNotFound from "./UsersNotFound";

type AllUsersProps = {
  search: searchUserParams;
  setSearch: React.Dispatch<React.SetStateAction<searchUserParams>>;
  debouncedSearch: searchUserParams;
  setDebouncedSearch: React.Dispatch<React.SetStateAction<searchUserParams>>;
};

type ResUsers = {
  ID_USER: string;
  EMAIL: string;
  NAME: string;
  USERNAME: string;
  ROLE: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  _count: {
    Question: number;
    Answers: number;
  };
};

export default function AllUsers({
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: AllUsersProps) {
  const getParams = useCallback(
    (pgIndx: number, prevPgIndx?: any) => {
      const params = new URLSearchParams();
      params.set("page", pgIndx.toString());

      if (debouncedSearch.ID_USER)
        params.set("ID_USER", debouncedSearch.ID_USER);
      if (debouncedSearch?.EMAIL) params.set("EMAIL", debouncedSearch.EMAIL);
      if (debouncedSearch?.NAME) params.set("NAME", debouncedSearch.NAME);
      if (debouncedSearch?.USERNAME)
        params.set("USERNAME", debouncedSearch.USERNAME);

      if (debouncedSearch?.registerStart)
        params.set("DT_IN", debouncedSearch?.registerStart);
      if (debouncedSearch?.registerEnd)
        params.set("DT_FM", debouncedSearch?.registerEnd);

      return `/user/all?${params.toString()}`;
    },
    [debouncedSearch],
  );

  const {
    data: users,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
    error: errorUsers,
  } = useSWRInfinite<ParamsRequest<ResUsers[]>>(getParams, fetcher, {
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
    const meta = users?.at(-1)?._meta;

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
          !errorUsers
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
  }, [users, setSize, errorUsers, isValidating]);
  return (
    <div className="pb-14">
      <div
        id="scroll-area"
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {isLoading ? (
          <SkeletonAnswers quantity={3} />
        ) : size >= 0 && !errorUsers ? (
          users?.length && users[0]._data?.length ? (
            users?.map(({ _data }) =>
              _data?.map((user) => (
                <OneUser
                  key={user.ID_USER}
                  ID_USER={user.ID_USER}
                  name={user.NAME}
                  username={user.USERNAME}
                  email={user.EMAIL}
                  DT_CR={user.DT_CR}
                  DEL_AT={user.DEL_AT}
                  DT_UP={user.DT_UP}
                />
              )),
            )
          ) : (
            <UsersNotFound
              message="Nenhum usuário encontrado. Que tal limpar os filtros?"
              setSearch={setSearch}
            />
          )
        ) : (
          <UsersNotFound
            message={
              errorUsers?.data?.message || "Falha ao carregar usuários..."
            }
            type="error"
            setSearch={setSearch}
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
