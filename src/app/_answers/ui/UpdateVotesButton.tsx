import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { UpdateVoteAction } from "../actions/UpdateVoteAction";
import { useAuthStore } from "@/store/useAuthStore";
import { useRedirectStore } from "@/store/useRedirectStore";

type UpdateVotesButtonProps = {
  idAnswer: string;
  type: "LIKE" | "DESLIKE";
  isActive?: boolean;
  children: React.ReactNode;
  setNewVote: (type: "LIKE" | "DESLIKE") => void;
  disabled?: boolean;
};

export default function UpdateVotesButton({
  idAnswer,
  type,
  isActive,
  children,
  setNewVote,
  disabled,
}: UpdateVotesButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenDialog } = useRedirectStore();
  const user = useAuthStore((state) => state.user);

  const handleUpdateVote = async () => {
    setIsLoading(true);

    if (!user) {
      setOpenDialog(true);
      setIsLoading(false);
      return;
    }

    await UpdateVoteAction(idAnswer, { type });
    setNewVote(type)
    setIsLoading(false);
  };

  return (
    <Button
      disabled={isLoading || disabled}
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
