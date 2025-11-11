import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";

type OneQuestionProps = {
  username: string;
  DT_CR: Date;
  title: string;
  category: string;
  description: string;
};

export default function OneQuestion({
  username,
  DT_CR,
  title,
  category,
  description,
}: OneQuestionProps) {
  return (
    <div className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4 hover:border-blue-hover">
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

      <div className="text-justify">
        <p className="font-sans text-sm sm:text-base text-gray-dark text-justify" dangerouslySetInnerHTML={{ __html: description }} />
      </div>

      <div className="flex justify-end">
        <Button className="p-4 text-sm sm:text-base w-full sm:w-auto">
          Responder
        </Button>
      </div>
    </div>
  );
}
