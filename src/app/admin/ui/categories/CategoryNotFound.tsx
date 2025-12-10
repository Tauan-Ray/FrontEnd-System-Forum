"use client";

import { Button } from "@/components/ui/button";
import {
  Globe,
  MessageCircleOff,
  MessageSquareOff,
  RefreshCcw,
} from "lucide-react";
import React, { SetStateAction } from "react";
import Link from "next/link";
import {
  defaultCategoriesParams,
  searchCategoriesParams,
} from "../../lib/types";

type CategoriesNotFoundProps = {
  message: string;
  type: "error" | "normal";
  setSearch: React.Dispatch<SetStateAction<searchCategoriesParams>>;
};

export default function CategoriesNotfound({
  message,
  setSearch,
  type,
}: CategoriesNotFoundProps) {
  const handleResetFilters = () => {
    setSearch(defaultCategoriesParams);
  };

  return (
    <div className="col-span-4 flex flex-col items-center justify-center px-4 py-7 text-center animate-in fade-in">
      <div className="mb-6 rounded-full bg-blue-primary/10 p-6 shadow-md">
        <MessageCircleOff size={56} className="text-blue-primary" />
      </div>

      <h2 className="mb-2 font-mono text-2xl font-bold text-gray-dark sm:text-3xl">
        Nenhuma categoria encontrada
      </h2>
      <p className="mb-8 max-w-md text-gray-medium">{message}</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        {type === "error" ? (
          <>
            <Button
              asChild
              variant="default"
              className="px-8 py-6 text-base transition-all hover:scale-105 hover:bg-blue-hover md:text-lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Globe size={18} />
                Voltar para início
              </Link>
            </Button>

            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
              className="px-8 py-6 text-base transition-all hover:scale-105 md:text-lg"
            >
              <>
                <RefreshCcw size={18} />
                Reiniciar página
              </>
            </Button>
          </>
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
      </div>
    </div>
  );
}
