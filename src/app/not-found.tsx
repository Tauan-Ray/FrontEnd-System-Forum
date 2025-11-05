"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fadeIn">
      <div className="flex flex-col items-center text-center space-y-8">

        <div className="bg-blue-primary/10 p-6 rounded-full shadow-md">
          <FileQuestion size={64} className="text-blue-primary" />
        </div>

        <div className="relative inline-block font-mono">
          <span className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-medium to-blue-primary drop-shadow-md">
            404
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-sans font-bold text-gray-dark mb-2">
            Página não encontrada
          </h2>
          <p className="text-gray-medium max-w-md">
            Parece que você se perdeu pelo caminho. Que tal voltar à página
            inicial ou explorar nossas perguntas?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Button
            asChild
            className="text-white px-8 py-6 text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
          >
            <Link href="/">Home</Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="text-white px-8 py-6 text-base md:text-lg hover:bg-blue-hover hover:scale-105 transition-all"
          >
            <Link href="/questions" className="flex items-center gap-2">
              <Search size={18} />
              Ver perguntas
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
