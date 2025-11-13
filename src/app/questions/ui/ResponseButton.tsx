"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { useRedirectStore } from "@/store/useRedirectStore";

type ResponseButtonProps = {
  idQuestion: string;
  onOpenModal?: () => void;
};

export default function ResponseButton({ idQuestion, onOpenModal }: ResponseButtonProps) {
  const { setOpenDialog } = useRedirectStore();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  async function handleOpenResponseBox() {
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (pathname.includes(`/questions/${idQuestion}`)) {
      onOpenModal?.();
      return;
    }

    window.location.href = `/questions/${idQuestion}?response=true`;
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={handleOpenResponseBox}
          className="p-4 text-sm sm:text-base w-full sm:w-auto"
        >
          Responder
        </Button>
      </div>
    </>
  );
}
