import { UserCircle2, ThumbsUp, ThumbsDown, CornerDownRight } from "lucide-react";
import UpdateVotesButton from "./UpdateVotesButton";
import { useState } from "react";
import { useAvatar } from "@/hooks/useAvatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

type OneAnswerProps = {
  ID_AN: string;
  ID_USER: string;
  username: string;
  DT_CR: Date;
  response: string;
  likes: number;
  dislikes: number;
  userVote: "LIKE" | "DESLIKE" | null;
  redirect?: true;
  ID_QT?: string;
  TITLE?: string;
};

export default function OneAnswer({
  ID_AN,
  ID_USER,
  username,
  DT_CR,
  response,
  likes: initialLikes,
  dislikes: initialDislikes,
  userVote,
  redirect,
  ID_QT,
  TITLE
}: OneAnswerProps) {
  const [actualVote, setActualVote] = useState<"LIKE" | "DESLIKE" | null>(
    userVote
  );
  const [_, setNewVote] = useState<"LIKE" | "DESLIKE" | null>(null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);

  const avatar = useAvatar(ID_USER);
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

  return (
    <>
      {TITLE && (
  <div
    onClick={handleRedirectQuestion}
    className="flex items-center gap-3 my-3 cursor-pointer group"
  >
    <div className="h-px flex-1 bg-gray-300" />
    <div className="flex items-center gap-2 text-blue-primary group-hover:text-blue-hover transition p-3 border rounded-lg">
      <CornerDownRight size={18} />
      <span className="font-semibold text-base">{TITLE}</span>
    </div>
    <div className="h-px flex-1 bg-gray-300" />
  </div>
)}

      <div
        className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover transition-colors"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
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

          <p className="font-sans text-sm sm:text-base text-gray-dark">
            Resposta enviada em: {new Date(DT_CR).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div
          className="prose prose-base sm:prose-lg max-w-none text-gray-dark leading-relaxed
        prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded-md prose-pre:overflow-x-auto
        prose-code:text-blue-700 prose-code:font-mono prose-code:text-base
        break-words whitespace-pre-wrap overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: response,
          }}
        />

        <div className="flex flex-row gap-4 justify-end items-center">
          <div className="flex flex-col items-center">
            <UpdateVotesButton
              idAnswer={ID_AN}
              type="LIKE"
              isActive={actualVote === "LIKE"}
              setNewVote={handleVote}
            >
              <ThumbsUp
                size={24}
                className={`transition-transform duration-200 ${
                  actualVote === "LIKE"
                    ? "text-blue-primary scale-110"
                    : "text-gray-500 hover:text-blue-primary hover:scale-105"
                }`}
              />
            </UpdateVotesButton>
            <span className="text-gray-dark font-semibold text-sm">
              {likes}
            </span>
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
                className={`transition-transform duration-200 ${
                  actualVote === "DESLIKE"
                    ? "text-red-500 scale-110"
                    : "text-gray-500 hover:text-red-500 hover:scale-105"
                }`}
              />
            </UpdateVotesButton>
            <span className="text-gray-dark font-semibold text-sm">
              {dislikes}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
