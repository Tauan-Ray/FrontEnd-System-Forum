"use client";

import { Button } from "@/components/ui/button";
import { Globe, MessageSquareOff, PlusCircle } from "lucide-react";
import Link from "next/link";
import { defaultParams, searchParams } from "../lib/types";
import { toast } from "sonner";
import CreateQuestionDialog from "./CreateQuestionDialog";
import { useAuthStore } from "@/store/useAuthStore";
import { useRedirectStore } from "@/store/useRedirectStore";

type QuestionsNotFoundProps = {
  message: string;
  type?: "error" | "normal";
  setSearch?: React.Dispatch<React.SetStateAction<searchParams>>;
};

export default function QuestionsNotFound({
  message,
  type,
  setSearch,
}: QuestionsNotFoundProps) {
  const user = useAuthStore((state) => state.user);
  const { setOpenDialog } = useRedirectStore();

  const handleResetFilters = () => {
    setSearch?.(defaultParams);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in">
      <div className="mb-6 rounded-full bg-blue-primary/10 p-6 shadow-md">
        <MessageSquareOff size={56} className="text-blue-primary" />
      </div>

      <h2 className="mb-2 font-mono text-2xl font-bold text-gray-dark sm:text-3xl">
        Nenhuma pergunta encontrada
      </h2>
      <p className="mb-8 max-w-md text-gray-medium">{message}</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        {type === "error" ? (
          <Button
            asChild
            variant="secondary"
            className="px-8 py-6 text-base transition-all hover:scale-105 hover:bg-blue-hover md:text-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <Globe size={18} />
              Voltar para início
            </Link>
          </Button>
        ) : (
          <Button
            onClick={handleResetFilters}
            variant="secondary"
            className="px-8 py-6 text-base transition-all hover:scale-105 hover:bg-blue-hover md:text-lg"
          >
            <MessageSquareOff size={18} />
            Limpar filtros
          </Button>
        )}

        <CreateQuestionDialog type="create">
          {() => (
            <Button
              onClick={() => {
                if (!user) {
                  setOpenDialog(true);
                  return;
                }

                open();
              }}
              className="px-8 py-6 text-base shadow-lg transition-transform hover:scale-105 md:text-lg"
            >
              <PlusCircle size={18} />
              Fazer uma pergunta
            </Button>
          )}
        </CreateQuestionDialog>
      </div>
    </div>
  );
}
