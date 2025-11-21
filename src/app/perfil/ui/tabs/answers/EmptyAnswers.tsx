"use client";

import { Button } from "@/components/ui/button";
import { MessageCircleOff, MinusCircle } from "lucide-react";
import React, { SetStateAction } from "react";
import { defaultParams, searchParams } from "@/app/questions/lib/types";

type EmptyAnswersProps = {
  message: string;
  setSearch: React.Dispatch<SetStateAction<searchParams>>
};

export default function EmptyAnswers({ message, setSearch }: EmptyAnswersProps) {
  const handleResetFilters = () => {
      setSearch(defaultParams);
    };

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
          onClick={handleResetFilters}
          className="px-8 py-6 text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
        >
          <MinusCircle size={18} />
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
