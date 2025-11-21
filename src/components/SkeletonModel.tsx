"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle2, ThumbsUp, ThumbsDown } from "lucide-react";

export function SkeletonAnswers({ quantity }: { quantity: number }) {
  const skeletons = Array.from({ length: quantity });

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 bg-gray-100 rounded-xl p-5 sm:p-6 gap-5 shadow-md"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-1">
                <UserCircle2
                  size={32}
                  className="text-gray-300 animate-pulse"
                />
              </div>
              <Skeleton className="h-5 w-28 sm:w-36 rounded-md bg-gray-300 animate-pulse" />
            </div>

            <Skeleton className="h-4 w-40 sm:w-48 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Corpo da resposta (texto formatado) */}
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-3 w-full rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-11/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-10/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-8/12 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Rodapé (botões de voto) */}
          <div className="flex flex-row justify-end gap-6 mt-2">
            <div className="flex items-center gap-2">
              <ThumbsUp size={26} className="text-gray-300 animate-pulse" />
              <Skeleton className="h-5 w-8 rounded-md bg-gray-300 animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <ThumbsDown size={26} className="text-gray-300 animate-pulse" />
              <Skeleton className="h-5 w-8 rounded-md bg-gray-300 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export function SkeletonQuestions({ quantity }: { quantity: number }) {
  const skeletons = Array.from({ length: quantity });

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 bg-gray-100 rounded-xl p-5 sm:p-6 gap-5 shadow-md"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-1">
                <UserCircle2
                  size={36}
                  className="text-gray-300 animate-pulse"
                />
              </div>
              <Skeleton className="h-5 w-28 sm:w-36 rounded-md bg-gray-300 animate-pulse" />
            </div>
            <Skeleton className="h-4 w-40 sm:w-48 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Title + category */}
          <div className="flex flex-col gap-2 mt-1">
            <Skeleton className="h-5 w-3/4 sm:w-2/3 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-4 w-32 sm:w-40 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Body (texto) */}
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-3 w-full rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-11/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-9/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-10/12 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Footer (botão) */}
          <div className="flex justify-end mt-2">
            <Skeleton className="h-10 w-full sm:w-32 rounded-lg bg-gray-300 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonUserProfile() {
  return (
    <div className="flex flex-col w-full items-center px-6 py-10 gap-14">
      {/* FOTO */}
      <Skeleton className="h-36 w-36 rounded-full border bg-gray-200 animate-pulse shadow-md" />

      {/* NOME + EMAIL + USERNAME + DATA CRIAÇÃO */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <Skeleton className="h-6 w-40 rounded-md bg-gray-300 animate-pulse" />

        <div className="flex flex-row gap-3 justify-center">
          <Skeleton className="h-4 w-32 rounded-md bg-gray-300 animate-pulse" />
          <Skeleton className="h-4 w-4 rounded-md bg-gray-300 animate-pulse" />
          <Skeleton className="h-4 w-28 rounded-md bg-gray-300 animate-pulse" />
        </div>

        <Skeleton className="h-4 w-28 rounded-md bg-gray-300 animate-pulse" />
      </div>

      {/* BOTÃO EDITAR PERFIL / TROCAR SENHA */}
      <Skeleton className="h-12 w-44 rounded-lg bg-gray-300 animate-pulse" />

      {/* SEÇÃO USER INFO */}
      <div className="w-full max-w-xl flex flex-col items-center mt-4">
        {/* TÍTULO */}
        <Skeleton className="h-5 w-60 rounded-md bg-gray-300 animate-pulse mb-8" />

        {/* CARDS INFOS */}
        <div className="grid grid-cols-2 justify-items-center gap-6">

          {/* CARD PERGUNTAS */}
          <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 px-6 py-5 rounded-xl shadow-sm w-40">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
              <Skeleton className="h-5 w-6 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>

          {/* CARD RESPOSTAS */}
          <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 px-6 py-5 rounded-xl shadow-sm w-40">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              <Skeleton className="h-5 w-6 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>

          {/* CARD LIKE */}
          <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 px-6 py-5 rounded-xl shadow-sm w-40">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              <Skeleton className="h-5 w-6 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>

          {/* CARD DISLIKE */}
          <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 px-6 py-5 rounded-xl shadow-sm w-40">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              <Skeleton className="h-5 w-6 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
