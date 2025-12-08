import { UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ResponseButton from "./ResponseButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateQuestionDialog from "./CreateQuestionDialog";
import { useAuthStore } from "@/store/useAuthStore";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import { webConfig } from "@/lib/settings";

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
  mutate?: () => void;
};

export default function OneQuestion({
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
  mutate,
}: OneQuestionProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const formatDescription =
    description && redirect && description.length > 250
      ? `${description.slice(0, description.slice(0, 250).lastIndexOf(" "))}...`
      : description || "";

  const handleRedirectToQuestion = (idQuestion: string) => {
    if (redirect) router.push(`/questions/${idQuestion}`);
  };

  const showActions = ID_USER === user?.ID_USER || user?.ROLE === "ADMIN";

  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-md border border-gray-dark p-4 transition-colors hover:border-blue-hover sm:p-5">
      <div
        className="flex flex-col gap-6"
        onClick={() => handleRedirectToQuestion(ID_QT)}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between md:gap-12">
          <div className="flex flex-row items-center gap-3">
            {ID_USER && !DEL_AT_USER ? (
              <Image
                width={32}
                height={32}
                src={`${webConfig.url}:${webConfig.port}/storage/${ID_USER}/avatar?q=${DT_UP_USER}`}
                alt={`${username} avatar`}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <UserCircle2
                size={32}
                className="text-blue-light transition hover:text-blue-hover"
              />
            )}
            <p className="font-sans text-base text-gray-dark sm:text-lg">
              {DEL_AT_USER ? "Autor Desconhecido" : username}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="sm:text-md font-sans text-sm text-gray-dark">
              Pergunta feita em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
            </p>

            {!(DT_CR === DT_UP) && (
              <p className="sm:text-md flex font-sans text-sm text-gray-dark sm:justify-end">
                Editada: {new Date(DT_UP).toLocaleDateString("pt-BR")}
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
        className={`w-full items-center gap-8 ${
          showActions
            ? "flex flex-col-reverse justify-between sm:flex-row"
            : "flex justify-end"
        } `}
      >
        {showActions && (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
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
                  onClick={() => open()}
                >
                  Editar
                </Button>
              )}
            </CreateQuestionDialog>

            <DeleteQuestionDialog idQuestion={ID_QT} handleReloadQuestions={() => mutate ? mutate : window.location.reload}>
              <Button
                variant="destructive"
                className="w-full p-4 text-sm sm:w-auto sm:text-base"
              >
                Deletar
              </Button>
            </DeleteQuestionDialog>
          </div>
        )}

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
