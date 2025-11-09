"use client";

import { Button } from "@/components/ui/button";
import { Globe, MessageSquareOff, PlusCircle, TypeOutline } from "lucide-react";
import Link from "next/link";

export default function QuestionsNotFound({ message, type }: { message: string, type?: 'error' | 'normal' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in">
      <div className="bg-blue-primary/10 p-6 rounded-full shadow-md mb-6">
        <MessageSquareOff size={56} className="text-blue-primary" />
      </div>

      <h2 className="font-mono font-bold text-2xl sm:text-3xl text-gray-dark mb-2">
        Nenhuma pergunta encontrada
      </h2>
      <p className="text-gray-medium max-w-md mb-8">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          variant="secondary"
          className="px-8 py-6 text-base md:text-lg hover:bg-blue-hover hover:scale-105 transition-all"
        >
          {type && type === 'error' ? (
            <Link href="//" className="flex items-center gap-2">
              <Globe size={18} />
              Voltar para início
            </Link>
          ) : (
            <Link href="/questions" className="flex items-center gap-2">
              <MessageSquareOff size={18} />
              Ver todas as perguntas
            </Link>
          )}

        </Button>

        <Button
          asChild
          className="px-8 py-6 text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
        >
          <Link href="/questions/new" className="flex items-center gap-2">
            <PlusCircle size={18} />
            Fazer uma pergunta
          </Link>
        </Button>
      </div>
    </div>
  );
}
