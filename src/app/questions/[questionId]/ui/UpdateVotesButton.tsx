import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { UpdateVoteAction } from "../actions/UpdateVoteAction";
import { getUser } from "@/app/auth/lib/sessions";
import { toast } from "sonner";

type UpdateVotesButtonProps = {
  idAnswer: string;
  type: "LIKE" | "DESLIKE";
  isActive?: boolean;
  children: React.ReactNode;
  setNewVote: (type: "LIKE" | "DESLIKE") => void;
};

export default function UpdateVotesButton({
  idAnswer,
  type,
  isActive,
  children,
  setNewVote
}: UpdateVotesButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateVote = async () => {
    setIsLoading(true);

    const user = await getUser();
    if (user?.message) {
      toast.warning("Você precisa estar logado para inserir um vote", {
        description: "Faça login para continuar.",
      });
      setIsLoading(false);
      return;
    }

    await UpdateVoteAction(idAnswer, { type });
    setNewVote(type)
    setIsLoading(false);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleUpdateVote}
      variant={isActive ? "default" : "outline"}
      className={`border-none p-2 rounded-full transition-all ${
        isActive
          ? "bg-blue-100 shadow-md scale-105"
          : "hover:bg-gray-100 hover:scale-105"
      }`}
    >
      {children}
    </Button>
  );
}
