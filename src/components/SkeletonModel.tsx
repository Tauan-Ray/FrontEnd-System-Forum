"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle2, ThumbsUp, ThumbsDown, Fingerprint } from "lucide-react";

export function SkeletonAnswers({ quantity }: { quantity: number }) {
  const skeletons = Array.from({ length: quantity });

  return (
    <div className="flex w-full animate-fadeIn flex-col gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-md sm:p-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-1">
                <UserCircle2
                  size={32}
                  className="animate-pulse text-gray-300"
                />
              </div>
              <Skeleton className="h-5 w-28 animate-pulse rounded-md bg-gray-300 sm:w-36" />
            </div>

            <Skeleton className="h-4 w-40 animate-pulse rounded-md bg-gray-300 sm:w-48" />
          </div>

          {/* Corpo da resposta (texto formatado) */}
          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-3 w-full animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-11/12 animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-10/12 animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-8/12 animate-pulse rounded-md bg-gray-300" />
          </div>

          {/* Rodapé (botões de voto) */}
          <div className="mt-2 flex flex-row justify-end gap-6">
            <div className="flex items-center gap-2">
              <ThumbsUp size={26} className="animate-pulse text-gray-300" />
              <Skeleton className="h-5 w-8 animate-pulse rounded-md bg-gray-300" />
            </div>

            <div className="flex items-center gap-2">
              <ThumbsDown size={26} className="animate-pulse text-gray-300" />
              <Skeleton className="h-5 w-8 animate-pulse rounded-md bg-gray-300" />
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
    <div className="flex w-full animate-fadeIn flex-col gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-md sm:p-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-1">
                <UserCircle2
                  size={36}
                  className="animate-pulse text-gray-300"
                />
              </div>
              <Skeleton className="h-5 w-28 animate-pulse rounded-md bg-gray-300 sm:w-36" />
            </div>
            <Skeleton className="h-4 w-40 animate-pulse rounded-md bg-gray-300 sm:w-48" />
          </div>

          {/* Title + category */}
          <div className="mt-1 flex flex-col gap-2">
            <Skeleton className="h-5 w-3/4 animate-pulse rounded-md bg-gray-300 sm:w-2/3" />
            <Skeleton className="h-4 w-32 animate-pulse rounded-md bg-gray-300 sm:w-40" />
          </div>

          {/* Body (texto) */}
          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-3 w-full animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-11/12 animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-9/12 animate-pulse rounded-md bg-gray-300" />
            <Skeleton className="h-3 w-10/12 animate-pulse rounded-md bg-gray-300" />
          </div>

          {/* Footer (botão) */}
          <div className="mt-2 flex justify-end">
            <Skeleton className="h-10 w-full animate-pulse rounded-lg bg-gray-300 sm:w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonUserProfile() {
  return (
    <div className="flex w-full flex-col items-center gap-14 px-6 py-10">
      {/* FOTO */}
      <Skeleton className="h-36 w-36 animate-pulse rounded-full border bg-gray-200 shadow-md" />

      {/* NOME + EMAIL + USERNAME + DATA CRIAÇÃO */}
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Skeleton className="h-6 w-40 animate-pulse rounded-md bg-gray-300" />

        <div className="flex flex-row justify-center gap-3">
          <Skeleton className="h-4 w-32 animate-pulse rounded-md bg-gray-300" />
          <Skeleton className="h-4 w-4 animate-pulse rounded-md bg-gray-300" />
          <Skeleton className="h-4 w-28 animate-pulse rounded-md bg-gray-300" />
        </div>

        <Skeleton className="h-4 w-28 animate-pulse rounded-md bg-gray-300" />
      </div>

      {/* BOTÃO EDITAR PERFIL / TROCAR SENHA */}
      <Skeleton className="h-12 w-44 animate-pulse rounded-lg bg-gray-300" />

      {/* SEÇÃO USER INFO */}
      <div className="mt-4 flex w-full max-w-xl flex-col items-center">
        {/* TÍTULO */}
        <Skeleton className="mb-8 h-5 w-60 animate-pulse rounded-md bg-gray-300" />

        {/* CARDS INFOS */}
        <div className="grid grid-cols-2 justify-items-center gap-6">
          {/* CARD PERGUNTAS */}
          <div className="flex w-40 items-center gap-4 rounded-xl border border-gray-200 bg-gray-100 px-6 py-5 shadow-sm">
            <Skeleton className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-12 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-6 animate-pulse rounded bg-gray-300" />
            </div>
          </div>

          {/* CARD RESPOSTAS */}
          <div className="flex w-40 items-center gap-4 rounded-xl border border-gray-200 bg-gray-100 px-6 py-5 shadow-sm">
            <Skeleton className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-6 animate-pulse rounded bg-gray-300" />
            </div>
          </div>

          {/* CARD LIKE */}
          <div className="flex w-40 items-center gap-4 rounded-xl border border-gray-200 bg-gray-100 px-6 py-5 shadow-sm">
            <Skeleton className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-6 animate-pulse rounded bg-gray-300" />
            </div>
          </div>

          {/* CARD DISLIKE */}
          <div className="flex w-40 items-center gap-4 rounded-xl border border-gray-200 bg-gray-100 px-6 py-5 shadow-sm">
            <Skeleton className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-6 animate-pulse rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonUsers({ quantity }: { quantity: number }) {
  const skeletons = Array.from({ length: quantity });
  return (
    <>
      {skeletons.map((_, index) => (
        <div
          className="flex h-full animate-fadeIn flex-col gap-4 rounded-xl border border-gray-300 bg-gray-100 p-5 shadow-sm"
          key={index}
        >
          {/* === TOPO — Avatar + Username + UUID + Badge === */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Skeleton className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />

              <div className="flex flex-col gap-2">
                {/* Username */}
                <Skeleton className="h-5 w-32 animate-pulse rounded-md bg-gray-300" />

                {/* Botão UUID */}
                <div className="flex items-center gap-2">
                  {/* Botão */}
                  <Skeleton className="h-8 w-20 animate-pulse rounded-md bg-gray-300" />
                </div>

                {/* Badge */}
                <Skeleton className="h-5 w-20 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </div>

          {/* === CARD DE DATAS === */}
          <div className="space-y-3 rounded-lg bg-gray-200 p-3 shadow-inner">
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-20 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-3 w-32 animate-pulse rounded bg-gray-300" />
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-24 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-3 w-32 animate-pulse rounded bg-gray-300" />
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-20 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-3 w-28 animate-pulse rounded bg-gray-300" />
            </div>
          </div>

          {/* === Nome / Email === */}
          <div className="flex-1 space-y-4">
            {/* Nome */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-12 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-48 animate-pulse rounded bg-gray-300" />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-12 animate-pulse rounded bg-gray-300" />
              <Skeleton className="h-5 w-full animate-pulse rounded bg-gray-300" />
            </div>
          </div>

          {/* === Botões inferiores === */}
          <div className="mt-4 flex flex-row justify-center gap-3">
            <Skeleton className="h-10 w-28 animate-pulse rounded-lg bg-gray-300" />
            <Skeleton className="h-10 w-28 animate-pulse rounded-lg bg-gray-300" />
          </div>
        </div>
      ))}
    </>
  );
}
