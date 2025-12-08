"use client";

import CreateQuestionDialog from "@/app/questions/ui/CreateQuestionDialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRedirectStore } from "@/store/useRedirectStore";
import { Globe, Plus } from "lucide-react";
import Link from "next/link";

const HomeActionsSection = () => {
  const { setOpenDialog } = useRedirectStore();
  const user = useAuthStore((state) => state.user);

  async function handleOpenDialog() {
    if (!user) {
      setOpenDialog(true);
      return;
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="">
        <h1 className="font-mono text-2xl font-bold leading-tight text-gray-dark sm:text-4xl md:text-5xl">
          Selecione a tarefa
        </h1>
        <h1 className="font-mono text-2xl font-bold leading-tight text-gray-dark sm:text-4xl md:text-5xl">
          que deseja realizar
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:gap-6">
        <Button
          className="w-full gap-2 rounded-lg border border-[#808080] bg-blue-light p-5 sm:w-64"
          asChild
        >
          <Link href="/questions">
            <Globe className="h-6 w-6 text-black sm:h-7 sm:w-7" />
            <span className="font-mono text-base text-black">Navegar em</span>
            <span className="font-mono text-base text-blue-800">perguntas</span>
          </Link>
        </Button>

        <span className="self-center font-mono text-2xl font-bold text-gray-dark sm:text-3xl">
          ou
        </span>

        <CreateQuestionDialog type="create">
          {(open) => (
            <Button
              onClick={() => {
                if (!user) {
                  setOpenDialog(true);
                  return;
                }

                open();
              }}
              className="w-full gap-2 rounded-lg border border-[#808080] bg-blue-light p-5 sm:w-64"
            >
              <Plus className="h-6 w-6 text-black sm:h-7 sm:w-7" />
              <span className="font-mono text-base text-black">Criar</span>
              <span className="font-mono text-base text-blue-800">
                pergunta
              </span>
            </Button>
          )}
        </CreateQuestionDialog>
      </div>
    </div>
  );
};

export default HomeActionsSection;
