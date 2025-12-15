import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { webConfig } from "@/lib/settings";
import DeleteQuestionDialog from "@/app/questions/ui/DeleteQuestionDialog";
import CreateQuestionDialog from "@/app/questions/ui/CreateQuestionDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fingerprint } from "lucide-react";
import RestoreQuestionDialog from "./RestoreQuestionDialog";
import { toast } from "sonner";

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
  mutate,
}: OneQuestionAdminProps) {
  const router = useRouter();

  const handleRedirectToQuestion = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    router.push(`/questions/${ID_QT}`);
  };

  return (
    <>
      <div className="flex h-full flex-col gap-4 rounded-xl border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
        <div
          className="flex items-start gap-4"
          onClick={(e) => handleRedirectToQuestion(e)}
        >
          <div className="flex items-center gap-3">
            <Image
              width={42}
              height={42}
              src={`${webConfig.url}:${webConfig.port}/storage/${ID_USER}/avatar?q=${DT_UP_USER}`}
              alt={`avatar ${username}`}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-gray-800">
                {username}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-17 gap-1"
                      onClick={() => {
                        navigator.clipboard.writeText(ID_QT);
                        toast.info("UUID copiado com sucesso!", {
                          description:
                            "O UUID foi copiado para sua área de transferência!",
                        });
                      }}
                    >
                      <Fingerprint size={16} />
                      UUID
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700 shadow-md">
                    <div className="flex items-center gap-2">
                      <Fingerprint size={14} className="text-gray-500" />
                      <span className="font-mono">{ID_QT}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span
                className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${
                  DEL_AT
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {DEL_AT ? "Deletado" : "Ativo"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 shadow-inner">
          <p>
            <span className="font-semibold text-gray-700">Criado em:</span>{" "}
            {new Date(DT_CR).toLocaleDateString("pt-BR")}
          </p>

          <p>
            <span className="font-semibold text-gray-700">Atualizado em:</span>{" "}
            {new Date(DT_UP).toLocaleDateString("pt-BR")}
          </p>

          {DEL_AT && (
            <p className="text-red-600">
              <span className="font-semibold">Deletado em:</span>{" "}
              {new Date(DEL_AT).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Título</p>
            <p className="font-mono text-base text-blue-700">{title}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Categoria</p>
            <p className="break-all font-mono text-blue-700">{category}</p>
          </div>
        </div>

        <div
          className={`mt-4 flex w-full flex-col-reverse items-center justify-center gap-8 sm:flex-row`}
        >
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {DEL_AT ? (
              <RestoreQuestionDialog
                idQuestion={ID_QT}
                handleReloadQuestions={mutate}
              />
            ) : (
              <DeleteQuestionDialog
                idQuestion={ID_QT}
                handleReloadQuestions={mutate}
              >
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
                  disabled={!!DEL_AT}
                >
                  Editar
                </Button>
              )}
            </CreateQuestionDialog>
          </div>
        </div>
      </div>
    </>
  );
}
