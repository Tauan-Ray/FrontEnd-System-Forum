import { UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ResponseButton from "./ResponseButton";
import { useAvatar } from "@/hooks/useAvatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateQuestionDialog from "./CreateQuestionDialog";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

type OneQuestionProps = {
  ID_QT: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  title: string;
  ID_CT: string;
  category: string;
  description: string;
  redirect?: boolean;
  onOpenResponseModal?: () => void;
};

export default function OneQuestion({
  ID_QT,
  ID_USER,
  username,
  DT_CR,
  title,
  ID_CT,
  category,
  description,
  redirect,
  onOpenResponseModal,
}: OneQuestionProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const avatar = useAvatar(ID_USER);

  const formatDescription =
    description && redirect && description.length > 250
      ? `${description.slice(0, description.slice(0, 250).lastIndexOf(" "))}...`
      : description || "";

  const handleRedirectToQuestion = (idQuestion: string) => {
    if (redirect) router.push(`/questions/${idQuestion}`);
  };

  const showActions = ID_USER === user?.ID_USER || user?.ROLE === "ADMIN";

  return (
    <div className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover transition-colors cursor-pointer">
      <div
        className="flex flex-col gap-6"
        onClick={() => handleRedirectToQuestion(ID_QT)}
      >
        <div className="flex flex-col gap-3 md:gap-12 sm:flex-row sm:justify-between">
          <div className="flex flex-row gap-3 items-center">
            {avatar ? (
              <Image
                width={32}
                height={32}
                src={avatar}
                alt={`${username} avatar`}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <UserCircle2
                size={32}
                className="text-blue-light hover:text-blue-hover transition"
              />
            )}
            <p className="font-sans text-base sm:text-lg text-gray-dark">
              {username}
            </p>
          </div>

          <p className="font-sans text-sm sm:text-md text-gray-dark">
            Pergunta feita em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-mono font-bold text-base sm:text-lg text-blue-primary">
            {title}
          </h3>
          <p className="font-mono text-sm text-blue-primary">
            Categoria: {category}
          </p>
        </div>

        <div
          className="prose prose-sm sm:prose-base max-w-none text-gray-dark prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto prose-code:text-blue-700 prose-code:font-mono prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: formatDescription }}
        />
      </div>

      <div
        className={`
          w-full gap-8 items-center
          ${
            showActions
              ? "flex flex-col-reverse sm:flex-row justify-between"
              : "flex justify-end"
          }
        `}
      >
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setOpenCreateDialog(true)}
              className="p-4 text-sm sm:text-base w-full sm:w-auto bg-blue-light"
            >
              Editar
            </Button>

            <Button
              variant="destructive"
              className="p-4 text-sm sm:text-base w-full sm:w-auto"
            >
              Deletar
            </Button>

            <CreateQuestionDialog
              type="edit"
              open={openCreateDialog}
              onOpenChange={setOpenCreateDialog}
              title={title}
              category={ID_CT}
              description={description}
              ID_QT={ID_QT}
            />
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
