import Image from "next/image";
import { webConfig } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Undo } from "lucide-react";

type OneUserProps = {
  ID_USER: string;
  username: string;
  email: string;
  name: string;
  DT_CR: Date;
  DEL_AT: Date | null;
  DT_UP: Date;
};

export default function OneUser({
  ID_USER,
  username,
  email,
  name,
  DT_CR,
  DEL_AT,
  DT_UP,
}: OneUserProps) {
  const isDeleted = DEL_AT !== null;

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={`${webConfig.url}:${webConfig.port}/storage/${ID_USER}/avatar?q=${DT_UP}`}
            alt={`avatar ${username}`}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-800">{username}</p>

            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${
                isDeleted
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isDeleted ? "Deletado" : "Ativo"}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 shadow-inner">
        <p>
          <span className="font-semibold text-gray-700">Criado em:</span>{" "}
          {new Date(DT_CR).toLocaleDateString("pt-BR")}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Atualizado em:</span>{" "}
          {new Date(DT_UP).toLocaleDateString("pt-BR")}
        </p>

        {isDeleted && (
          <p className="mt-1 text-red-600">
            <span className="font-semibold">Deletado em:</span>{" "}
            {new Date(DEL_AT!).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>

      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Nome</p>
          <p className="font-mono text-base text-blue-700">{name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Email</p>
          <p className="break-all font-mono text-blue-700">{email}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-center gap-3">
        <Button
          disabled={isDeleted}
          variant="outline"
          className="flex-1 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Pencil size={16} />
          Editar
        </Button>

        <Button
          variant={isDeleted ? "secondary" : "destructive"}
          className="flex-1 rounded-lg"
        >
          {isDeleted ? (
            <>
              <Undo size={16} />
              Restaurar
            </>
          ) : (
            <>
              <Trash size={16} />
              Deletar
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
