import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { webConfig } from "@/lib/settings";
import DeleteQuestionDialog from "@/app/questions/ui/DeleteQuestionDialog";
import CreateQuestionDialog from "@/app/questions/ui/CreateQuestionDialog";
import ResponseButton from "@/app/questions/ui/ResponseButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fingerprint } from "lucide-react";
import RestoreQuestionDialog from "./RestoreQuestionDialog";

type OneQuestionAdminProps = {
  ID_QT: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  DT_UP_USER: Date;
  title: string;
  ID_CT: string;
  category: string;
  description: string;
  redirect?: boolean;
  onOpenResponseModal?: () => void;
  mutate: () => void;
};

export default function OneQuestionAdmin({
  ID_QT,
  ID_USER,
  username,
  DT_CR,
  DT_UP,
  DEL_AT,
  DT_UP_USER,
  title,
  ID_CT,
  category,
  description,
  redirect,
  onOpenResponseModal,
  mutate,
}: OneQuestionAdminProps) {
  const router = useRouter();
  const formatDescription =
    description && redirect && description.length > 250
      ? `${description.slice(0, description.slice(0, 250).lastIndexOf(" "))}...`
      : description || "";

  const handleRedirectToQuestion = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    router.push(`/questions/${ID_QT}`);
  };

  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-md border border-gray-dark p-4 transition-colors hover:border-blue-hover sm:p-5">
      <div
        className="flex flex-col gap-6"
        onClick={(e) => handleRedirectToQuestion(e)}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between md:gap-12">
          <div className="flex flex-row items-center gap-3">
            <Image
              width={32}
              height={32}
              src={`${webConfig.url}:${webConfig.port}/storage/${ID_USER}/avatar?q=${DT_UP_USER}`}
              alt={`${username} avatar`}
              className="h-8 w-8 rounded-full"
            />
            <p className="font-sans text-base text-gray-dark sm:text-lg">
              {username}
            </p>
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${
                DEL_AT
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {DEL_AT ? "Deletada" : "Ativa"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="sm:text-md font-sans text-sm text-gray-dark">
              Pergunta feita em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
            </p>

            <p className="sm:text-md flex font-sans text-sm text-gray-dark sm:justify-end">
              Editada: {new Date(DT_UP).toLocaleDateString("pt-BR")}
            </p>

            {DEL_AT && (
              <p className="sm:text-md flex flex-row font-sans text-sm text-red-500 sm:justify-end">
                <span className="font-semibold">
                  Deletado em: {new Date(DEL_AT).toLocaleDateString("pt-BR")}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-mono text-base font-bold text-blue-primary sm:text-lg">
            {title}
          </h3>
          <p className="font-mono text-sm text-blue-primary">
            Categoria: {category}
          </p>
          <div className="mt-3">
            <TooltipProvider delayDuration={200} skipDelayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-1 rounded-md border px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                    <Fingerprint size={14} />
                    UUID
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  sideOffset={6}
                  className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Fingerprint size={14} className="text-gray-500" />
                    <span className="font-mono">{ID_QT}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div
          className="prose prose-sm max-w-none text-gray-dark sm:prose-base prose-code:font-mono prose-code:text-sm prose-code:text-blue-700 prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:bg-gray-100 prose-pre:p-3"
          dangerouslySetInnerHTML={{ __html: formatDescription }}
        />
      </div>

      <div
        className={`flex w-full flex-col-reverse items-center justify-between gap-8 sm:flex-row`}
      >
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {DEL_AT ? (
            <RestoreQuestionDialog
              idQuestion={ID_QT}
              handleReloadQuestions={mutate}
            />
          ) : (
            <DeleteQuestionDialog idQuestion={ID_QT} handleReloadQuestions={mutate}>
              <Button
                variant="destructive"
                className="w-full p-4 text-sm sm:w-auto sm:text-base"
              >
                Deletar
              </Button>
            </DeleteQuestionDialog>
          )}

          <CreateQuestionDialog
            type="edit"
            title={title}
            category={ID_CT}
            description={description}
            ID_QT={ID_QT}
          >
            {(open) => (
              <Button
                className="w-full bg-blue-light p-4 text-sm sm:w-auto sm:text-base"
                onClick={open}
              >
                Editar
              </Button>
            )}
          </CreateQuestionDialog>
        </div>

        <div className="w-full sm:w-auto">
          <ResponseButton
            onOpenModal={onOpenResponseModal}
            idQuestion={ID_QT}
          />
        </div>
      </div>
    </div>
  );
}
