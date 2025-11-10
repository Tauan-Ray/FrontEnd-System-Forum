"use client"

import CreateQuestionDialog from "@/app/questions/ui/CreateQuestionDialog";
import { Button } from "@/components/ui/button";
import { Globe, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HomeActionsSection = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="">
        <h1 className="font-mono font-bold text-gray-dark text-2xl sm:text-4xl md:text-5xl leading-tight">Selecione a tarefa</h1>
        <h1 className="font-mono font-bold text-gray-dark text-2xl sm:text-4xl md:text-5xl leading-tight">que deseja realizar</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full justify-center">
        <Button className=" bg-blue-light w-full sm:w-64 p-5 rounded-lg border border-[#808080] gap-2" asChild>
          <Link href="/questions">
            <Globe className="text-black h-6 w-6 sm:h-7 sm:w-7" />
            <span className="font-mono text-base text-black">Navegar em</span>
            <span className="font-mono text-base text-blue-800">perguntas</span>
          </Link>
        </Button>

        <span className="font-mono font-bold text-2xl sm:text-3xl text-gray-dark self-center">
          ou
        </span>

        <Button  onClick={() => setOpenDialog(true)} className=" bg-blue-light w-full sm:w-64 p-5 rounded-lg border border-[#808080] gap-2">
          <Plus className="text-black h-6 w-6 sm:h-7 sm:w-7" />
          <span className="font-mono text-base text-black">Criar</span>
          <span className="font-mono text-base text-blue-800">pergunta</span>
        </Button>
      </div>
      <CreateQuestionDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

export default HomeActionsSection;
