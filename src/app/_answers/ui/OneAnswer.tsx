import {
  UserCircle2,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight,
} from "lucide-react";
import UpdateVotesButton from "./UpdateVotesButton";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import EditAnswerDialog from "./EditAnswerDialog";
import DeleteAnswerDialog from "./DeleteAnswerDialog";
import { webConfig } from "@/lib/settings";

type OneAnswerProps = {
  ID_AN: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  DT_UP: Date;
  DT_UP_USER: Date;
  DEL_AT_USER: Date | null;
  response: string;
  likes: number;
  dislikes: number;
  userVote: "LIKE" | "DESLIKE" | null;
  redirect?: true;
  ID_QT?: string;
  TITLE?: string;
  mutate: () => void;
};

export default function OneAnswer({
  ID_AN,
  ID_USER,
  username,
  DT_CR,
  DT_UP,
  DT_UP_USER,
  DEL_AT_USER,
  response,
  likes: initialLikes,
  dislikes: initialDislikes,
  userVote,
  redirect,
  ID_QT,
  TITLE,
  mutate,
}: OneAnswerProps) {
  const { user } = useAuthStore();
  const [actualVote, setActualVote] = useState<"LIKE" | "DESLIKE" | null>(
    userVote,
  );
  const [_, setNewVote] = useState<"LIKE" | "DESLIKE" | null>(null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);

  const router = useRouter();

  const handleVote = (type: "LIKE" | "DESLIKE") => {
    if (actualVote === type) {
      setActualVote(null);
      type === "LIKE"
        ? setLikes((prev) => prev - 1)
        : setDislikes((prev) => prev - 1);
    } else {
      if (type === "LIKE") {
        if (actualVote === "DESLIKE") setDislikes((prev) => prev - 1);
        setLikes((prev) => prev + 1);
      } else {
        if (actualVote === "LIKE") setLikes((prev) => prev - 1);
        setDislikes((prev) => prev + 1);
      }
      setActualVote(type);
    }

    setNewVote(type);
  };

  const handleRedirectQuestion = () => {
    if (!redirect) return;

    router.push(`/questions/${ID_QT}`);
  };

  const showActions = ID_USER === user?.ID_USER || user?.ROLE === "ADMIN";

  return (
    <>
      {TITLE && (
        <div
          onClick={handleRedirectQuestion}
          className="group my-3 flex cursor-pointer items-center gap-3"
        >
          <div className="h-px flex-1 bg-gray-300" />
          <div className="flex items-center gap-2 rounded-lg border p-3 text-blue-primary transition group-hover:text-blue-hover">
            <CornerDownRight size={18} />
            <span className="text-base font-semibold">{TITLE}</span>
          </div>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-md border border-gray-dark p-4 transition-colors hover:border-blue-hover sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
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
            <p className="font-sans text-sm text-gray-dark sm:text-base">
              Resposta enviada em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
            </p>

            {!(DT_CR === DT_UP) && (
              <p className="flex font-sans text-sm text-gray-dark sm:justify-end sm:text-base">
                Editada: {new Date(DT_UP).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
        </div>

        <div
          className="prose prose-base max-w-none overflow-hidden whitespace-pre-wrap break-words leading-relaxed text-gray-dark sm:prose-lg prose-code:font-mono prose-code:text-base prose-code:text-blue-700 prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:bg-gray-100 prose-pre:p-3"
          dangerouslySetInnerHTML={{
            __html: response,
          }}
        />

        <div className="mt-2 flex items-center justify-between">
          {showActions && (
            <div className="flex gap-2">
              <EditAnswerDialog ID_AN={ID_AN} actualResponse={response} handleReloadAnswers={mutate}>
                <Button className="bg-blue-light px-4 py-2">Editar</Button>
              </EditAnswerDialog>

              <DeleteAnswerDialog idAnswer={ID_AN} handleReloadAnswers={mutate}>
                <Button variant="destructive" className="px-4 py-2">
                  Deletar
                </Button>
              </DeleteAnswerDialog>
            </div>
          )}

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <UpdateVotesButton
                idAnswer={ID_AN}
                type="LIKE"
                isActive={actualVote === "LIKE"}
                setNewVote={handleVote}
              >
                <ThumbsUp
                  size={24}
                  className={`transition-transform ${
                    actualVote === "LIKE"
                      ? "scale-110 text-blue-primary"
                      : "text-gray-500 hover:scale-105 hover:text-blue-primary"
                  }`}
                />
              </UpdateVotesButton>
              <span className="text-sm font-semibold">{likes}</span>
            </div>

            <div className="flex flex-col items-center">
              <UpdateVotesButton
                idAnswer={ID_AN}
                type="DESLIKE"
                isActive={actualVote === "DESLIKE"}
                setNewVote={handleVote}
              >
                <ThumbsDown
                  size={24}
                  className={`transition-transform ${
                    actualVote === "DESLIKE"
                      ? "scale-110 text-red-500"
                      : "text-gray-500 hover:scale-105 hover:text-red-500"
                  }`}
                />
              </UpdateVotesButton>
              <span className="text-sm font-semibold">{dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
