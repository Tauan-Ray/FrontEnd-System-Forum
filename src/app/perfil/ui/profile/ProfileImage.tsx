"use client";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChooseImageDialog from "@/app/auth/ui/ChooseImageDialog";
import { useAuthStore } from "@/store/useAuthStore";
import { webConfig } from "@/lib/settings";

export default function ProfileImage() {
  const { user } = useAuthStore();
  const [openChooseImage, setOpenChooseImage] = useState<boolean>(false);

  return (
    <div className="relative w-36 h-36">
      {user?.ID_USER ? (
        <Image
          src={`${webConfig.url}:${webConfig.port}/storage/${user.ID_USER}/avatar?q=${user.DT_UP}`}
          alt="Preview"
          width={140}
          height={140}
          className="rounded-full object-cover h-36 w-36 border shadow-md transition-all"
        />
      ) : (
        <div className="h-36 w-36 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border shadow-sm text-sm">
          Nenhuma imagem
        </div>
      )}

      <Button
        className="absolute bottom-1 right-1 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        variant={"outline"}
        onClick={() => setOpenChooseImage(true)}
      >
        <Pencil className="h-4 w-4 text-gray-700" />
      </Button>
      <ChooseImageDialog
        open={openChooseImage}
        onOpenChange={setOpenChooseImage}
        redirect={"/perfil"}
        ID_USER={user?.ID_USER ?? ""}
        DT_UP={user?.DT_UP}
      />
    </div>
  );
}
