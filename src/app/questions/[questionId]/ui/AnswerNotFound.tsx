"use client";

import { Button } from "@/components/ui/button";
import { MessageCircleOff, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { getUser } from "@/app/auth/lib/sessions";
import CreateQuestionDialog from "../../ui/CreateQuestionDialog";

type AnswersNotFoundProps = {
  message: string;
  onChangeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AnswersNotFound({ message, onChangeModal }: AnswersNotFoundProps) {
  async function handleOpenDialog() {
    const user = await getUser();
    if (user?.message) {
      toast.warning("Você precisa estar logado para responder uma pergunta", {
        description: "Faça login para continuar.",
      });
      return;
    }
    onChangeModal(true);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in">
      <div className="bg-blue-primary/10 p-6 rounded-full shadow-md mb-6">
        <MessageCircleOff size={56} className="text-blue-primary" />
      </div>

      <h2 className="font-mono font-bold text-2xl sm:text-3xl text-gray-dark mb-2">
        Nenhuma resposta encontrada
      </h2>
      <p className="text-gray-medium max-w-md mb-8">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleOpenDialog}
          className="px-8 py-6 text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
        >
          <PlusCircle size={18} />
          Responder pergunta
        </Button>
      </div>
    </div>
  );
}
