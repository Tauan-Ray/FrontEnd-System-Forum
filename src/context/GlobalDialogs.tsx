"use client";

import DialogRedirectToLogin from "@/components/DialogRedirectToLogin";
import { useRedirectStore } from "@/store/useRedirectStore";

export default function GlobalDialogs() {
  const { openDialog, setOpenDialog } = useRedirectStore();

  return <DialogRedirectToLogin open={openDialog} onOpenChange={setOpenDialog} />;
}
