"use client";

import { useAvatar } from "@/hooks/useAvatar";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileImage({ ID_USER }: { ID_USER: string }) {
  const avatar = useAvatar(ID_USER);

  return (
    <div className="relative w-36 h-36">
      {avatar ? (
        <Image
          src={avatar}
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
      >
        <Pencil className="h-4 w-4 text-gray-700" />
      </Button>
    </div>
  );
}
