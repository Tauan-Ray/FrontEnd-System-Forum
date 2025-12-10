import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fingerprint } from "lucide-react";
import { toast } from "sonner";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import RestoreCategoryDialog from "./RestoreCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";

type OneQuestionAdminProps = {
  ID_CT: string;
  CATEGORY: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  mutate: () => void;
};

export default function OneQuestionAdmin({
  ID_CT,
  CATEGORY,
  DT_CR,
  DT_UP,
  DEL_AT,
  mutate,
}: OneQuestionAdminProps) {
  return (
    <>
      <div className="flex h-full flex-col gap-4 rounded-xl border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Categoria</p>
            <p className="font-mono text-base text-blue-700">{CATEGORY}</p>
          </div>

          <div className="flex flex-col gap-2 space-y-1">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-17 gap-1"
                      onClick={() => {
                        navigator.clipboard.writeText(ID_CT);
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
                      <span className="font-mono">{ID_CT}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 shadow-inner">
          <p>
            <span className="font-semibold text-gray-700">Criada em:</span>{" "}
            {new Date(DT_CR).toLocaleDateString("pt-BR")}
          </p>

          <p>
            <span className="font-semibold text-gray-700">Atualizada em:</span>{" "}
            {new Date(DT_UP).toLocaleDateString("pt-BR")}
          </p>

          {DEL_AT && (
            <p className="text-red-600">
              <span className="font-semibold">Deletada em:</span>{" "}
              {new Date(DEL_AT).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>

        <div
          className={`mt-4 flex w-full flex-col-reverse items-center justify-center gap-8 sm:flex-row`}
        >
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {DEL_AT ? (
              <RestoreCategoryDialog
                idCategory={ID_CT}
                handleReloadQuestions={mutate}
              />
            ) : (
              <DeleteCategoryDialog
                idCategory={ID_CT}
                handleReloadCategories={mutate}
              />
            )}

            <EditCategoryDialog
              ID_CT={ID_CT}
              CATEGORY={CATEGORY}
              isDeleted={DEL_AT !== null}
              handleReloadCategories={mutate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
