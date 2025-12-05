import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { webConfig } from "@/lib/settings";
import DeleteQuestionDialog from "@/app/questions/ui/DeleteQuestionDialog";
import CreateQuestionDialog from "@/app/questions/ui/CreateQuestionDialog";
import ResponseButton from "@/app/questions/ui/ResponseButton";

type OneQuestionProps = {
  ID_QT: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  DT_UP: Date;
  DT_UP_USER: Date;
  DEL_AT_USER: Date | null;
  title: string;
  ID_CT: string;
  category: string;
  description: string;
  redirect?: boolean;
  onOpenResponseModal?: () => void;
};

export default function OneQuestionAdmin({
  ID_QT,
  ID_USER,
  username,
  DT_CR,
  DT_UP,
  DT_UP_USER,
  DEL_AT_USER,
  title,
  ID_CT,
  category,
  description,
  redirect,
  onOpenResponseModal,
}: OneQuestionProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState<{
    edit: boolean;
    delete: boolean;
  }>({ edit: false, delete: false });
  const router = useRouter();
  const formatDescription =
    description && redirect && description.length > 250
      ? `${description.slice(0, description.slice(0, 250).lastIndexOf(" "))}...`
      : description || "";

  const handleRedirectToQuestion = (idQuestion: string) => {
    router.push(`/questions/${idQuestion}`);
  };

  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-md border border-gray-dark p-4 transition-colors hover:border-blue-hover sm:p-5">
      <div
        className="flex flex-col gap-6"
        onClick={() => handleRedirectToQuestion(ID_QT)}
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
                DEL_AT_USER
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {DEL_AT_USER ? "Deletada" : "Ativa"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="sm:text-md font-sans text-sm text-gray-dark">
              Pergunta feita em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
            </p>

            <p className="sm:text-md flex font-sans text-sm text-gray-dark sm:justify-end">
                Editada: {new Date(DT_UP).toLocaleDateString("pt-BR")}
            </p>

            {DEL_AT_USER && (
                <p className="sm:text-md font-sans text-sm text-red-500 sm:justify-end flex flex-row">
                    <span className="font-semibold">Deletado em:</span>{" "}
                    {new Date(DEL_AT_USER).toLocaleDateString("pt-BR")}
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
          <Button
            onClick={() =>
              setOpenCreateDialog((prev) => ({ ...prev, edit: true }))
            }
            className="w-full bg-blue-light p-4 text-sm sm:w-auto sm:text-base"
          >
            Editar
          </Button>

          <Button
            variant="destructive"
            className="w-full p-4 text-sm sm:w-auto sm:text-base"
            onClick={() =>
              setOpenCreateDialog((prev) => ({ ...prev, delete: true }))
            }
          >
            Deletar
          </Button>

          <DeleteQuestionDialog
            idQuestion={ID_QT}
            onOpenChange={(value: boolean) =>
              setOpenCreateDialog((prev) => ({ ...prev, delete: value }))
            }
            open={openCreateDialog.delete}
          />

          <CreateQuestionDialog
            type="edit"
            open={openCreateDialog.edit}
            onOpenChange={(value: boolean) =>
              setOpenCreateDialog((prev) => ({ ...prev, edit: value }))
            }
            title={title}
            category={ID_CT}
            description={description}
            ID_QT={ID_QT}
          />
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
