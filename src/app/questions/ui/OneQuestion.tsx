import { UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ResponseButton from "./ResponseButton";

type OneQuestionProps = {
  ID_QT: string;
  username: string;
  DT_CR: Date;
  title: string;
  category: string;
  description: string;
  redirect?: boolean;
  onOpenResponseModal?: () => void;
};

export default function OneQuestion({
  ID_QT,
  username,
  DT_CR,
  title,
  category,
  description,
  redirect,
  onOpenResponseModal,
}: OneQuestionProps) {
  const router = useRouter();
  const formatDescription =
  description && redirect && description.length > 250
    ? `${description.slice(0, description.slice(0, 250).lastIndexOf(" "))}...`
    : description || "";

  const handleRedirectToQuestion = (idQuestion: string) => {
    if (redirect) router.push(`/questions/${idQuestion}`);
  }

  return (
    <div onClick={() => handleRedirectToQuestion(ID_QT)} className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover transition-colors cursor-pointer">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex flex-row gap-3 items-center">
          <UserCircle2
            size={32}
            className="text-blue-light hover:text-blue-hover transition"
          />
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

      <ResponseButton onOpenModal={onOpenResponseModal} idQuestion={ID_QT} />
    </div>
  );
}
