"use client";

import { Button } from "@/components/ui/button";
import { Globe, MessageSquareOff, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultParams, searchParams } from "../lib/types";
import { useState } from "react";
import { toast } from "sonner";
import CreateQuestionDialog from "./CreateQuestionDialog";
import { getUser } from "@/app/auth/lib/sessions";

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  async function handleOpenDialog() {
    const user = await getUser();
    if (user?.message) {
      toast.warning("Você precisa estar logado para criar uma pergunta", {
        description: "Faça login para continuar.",
      });
      return;
    }
    setOpenDialog(true);
  }
  const router = useRouter();

  const handleResetFilters = () => {
    setSearch?.(defaultParams);
    router.push("/questions");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in">
      <div className="bg-blue-primary/10 p-6 rounded-full shadow-md mb-6">
        <MessageSquareOff size={56} className="text-blue-primary" />
      </div>

      <h2 className="font-mono font-bold text-2xl sm:text-3xl text-gray-dark mb-2">
        Nenhuma pergunta encontrada
      </h2>
      <p className="text-gray-medium max-w-md mb-8">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {type === "error" ? (
          <Button
            asChild
            variant="secondary"
            className="px-8 py-6 text-base md:text-lg hover:bg-blue-hover hover:scale-105 transition-all"
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
            className="px-8 py-6 text-base md:text-lg hover:bg-blue-hover hover:scale-105 transition-all"
          >
            <MessageSquareOff size={18} />
            Ver todas as perguntas
          </Button>
        )}

        <Button
          onClick={handleOpenDialog}
          className="px-8 py-6 text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
        >
          <PlusCircle size={18} />
          Fazer uma pergunta
        </Button>
        <CreateQuestionDialog open={openDialog} onOpenChange={setOpenDialog} />
      </div>
    </div>
  );
}
