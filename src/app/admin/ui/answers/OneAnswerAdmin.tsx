"use client";

import {
  ThumbsUp,
  ThumbsDown,
  Fingerprint,
  CornerDownRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { webConfig } from "@/lib/settings";
import DeleteAnswerDialog from "@/app/_answers/ui/DeleteAnswerDialog";
import EditAnswerDialog from "@/app/_answers/ui/EditAnswerDialog";
import UpdateVotesButton from "@/app/_answers/ui/UpdateVotesButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RestoreAnswerDialog from "./RestoreAnswerDialog";
import { toast } from "sonner";

type OneAnswerProps = {
  ID_AN: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  DT_UP_USER: Date;
  response: string;
  likes: number;
  dislikes: number;
  userVote: "LIKE" | "DESLIKE" | null;
  redirect?: true;
  ID_QT: string;
  TITLE: string;
  mutate: () => void;
};

export default function OneAnswerAdmin({
  ID_AN,
  ID_USER,
  username,
  DT_CR,
  DT_UP,
  DEL_AT,
  DT_UP_USER,
  response,
  likes: initialLikes,
  dislikes: initialDislikes,
  userVote,
  redirect,
  ID_QT,
  TITLE,
  mutate,
}: OneAnswerProps) {
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

  const formatResponse =
    response && response.length > 250
      ? `${response.slice(0, response.slice(0, 250).lastIndexOf(" "))}...`
      : response || "";

  const handleRedirectQuestion = () => {
    if (!redirect) return;
    router.push(`/questions/${ID_QT}`);
  };

  return (
    <div className="flex flex-col gap-3">
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
      <div className="flex h-full flex-col gap-5 rounded-2xl border bg-white p-6 shadow-sm transition-all hover:border-blue-300/70 hover:shadow-lg">
        <div className="flex items-start gap-4">
          <Image
            width={42}
            height={42}
            src={`${webConfig.url}:${webConfig.port}/storage/${ID_USER}/avatar?q=${DT_UP_USER}`}
            alt={`avatar ${username}`}
            className="h-12 w-12 rounded-full object-cover shadow-sm"
          />

          <div className="flex flex-col gap-1.5">
            <p className="text-base font-semibold text-gray-900">{username}</p>

            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm ${
                DEL_AT
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {DEL_AT ? "Deletada" : "Ativa"}
            </span>

            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 bg-gray-50 px-2 text-xs text-gray-700 hover:text-blue-600"
                    onClick={() => {
                      navigator.clipboard.writeText(ID_AN);
                      toast.info("UUID copiado com sucesso!", {
                        description:
                          "O UUID foi copiado para sua área de transferência!",
                      });
                    }}
                  >
                    <Fingerprint size={14} /> UUID
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="rounded-md border bg-white p-2 text-xs text-gray-700 shadow-md">
                  <div className="flex items-center gap-2 font-mono">
                    <Fingerprint size={14} className="text-gray-500" />
                    {ID_AN}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 shadow-inner">
          <p>
            <span className="font-semibold text-gray-700">Criada em:</span>{" "}
            {new Date(DT_CR).toLocaleDateString("pt-BR")}
          </p>

          <p>
            <span className="font-semibold text-gray-700">Atualizada em:</span>{" "}
            {new Date(DT_UP).toLocaleDateString("pt-BR")}
          </p>

          {DEL_AT && (
            <p className="font-medium text-red-600">
              <span className="font-semibold">Deletada em:</span>{" "}
              {new Date(DEL_AT).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div
            className="prose prose-sm max-w-none whitespace-pre-wrap break-words leading-relaxed text-gray-800 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5"
            dangerouslySetInnerHTML={{ __html: formatResponse }}
          />
        </div>

        <div className="mt-2 flex flex-col items-center justify-between gap-5">
          <div className="flex gap-3">
            <EditAnswerDialog
              ID_AN={ID_AN}
              actualResponse={response}
              handleReloadAnswers={mutate}
            >
              <Button
                disabled={DEL_AT !== null}
                variant={"outline"}
                className="flex-1 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Editar
              </Button>
            </EditAnswerDialog>

            {DEL_AT ? (
              <RestoreAnswerDialog
                idAnswer={ID_AN}
                handleReloadQuestions={mutate}
              />
            ) : (
              <DeleteAnswerDialog idAnswer={ID_AN} handleReloadAnswers={mutate}>
                <Button variant="destructive" className="px-4 py-2">
                  Deletar
                </Button>
              </DeleteAnswerDialog>
            )}
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <UpdateVotesButton
                idAnswer={ID_AN}
                type="LIKE"
                isActive={actualVote === "LIKE"}
                setNewVote={handleVote}
                disabled={DEL_AT !== null}
              >
                <ThumbsUp
                  size={26}
                  className={`transition-transform ${
                    actualVote === "LIKE"
                      ? "scale-110 text-blue-primary"
                      : "text-gray-500 hover:scale-105 hover:text-blue-primary"
                  }`}
                />
              </UpdateVotesButton>
              <span className="text-sm font-semibold text-gray-700">
                {likes}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <UpdateVotesButton
                idAnswer={ID_AN}
                type="DESLIKE"
                isActive={actualVote === "DESLIKE"}
                setNewVote={handleVote}
                disabled={DEL_AT !== null}
              >
                <ThumbsDown
                  size={26}
                  className={`transition-transform ${
                    actualVote === "DESLIKE"
                      ? "scale-110 text-red-500"
                      : "text-gray-500 hover:scale-105 hover:text-red-500"
                  }`}
                />
              </UpdateVotesButton>
              <span className="text-sm font-semibold text-gray-700">
                {dislikes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
