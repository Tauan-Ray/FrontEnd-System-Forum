import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, UserCircle2 } from "lucide-react";

type OneAnswerProps = {
  ID_AN: string;
  username: string;
  DT_CR: Date;
  response: string;
  likes: number;
  deslikes: number;
};

export default function OneAnswer({
  username,
  DT_CR,
  response,
  likes,
  deslikes,
}: OneAnswerProps) {
  return (
    <div className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover transition-colors">
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

      <div className="flex flex-row gap-7 justify-end">
        <Button variant="outline">
          <ThumbsUp size={26} className="text-blue-primary" />
        </Button>

        <Button variant="outline">
          <ThumbsDown size={26} className="text-blue-dark" />
        </Button>
      </div>
    </div>
  );
}
