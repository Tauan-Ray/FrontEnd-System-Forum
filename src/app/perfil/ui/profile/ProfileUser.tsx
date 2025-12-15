"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ProfileImage from "./ProfileImage";
import { Button } from "@/components/ui/button";
import { SkeletonUserProfile } from "@/components/SkeletonModel";
import StatisticsCards from "./StatisticsCards";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import ButtonChangeEmail from "./ButtonChangeEmail";

export default function ProfileUser() {
  const { user, loading } = useAuthStore();
  const [openChangeInfos, setOpenChangeInfos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex h-full max-w-md flex-col gap-14 overflow-hidden rounded-xl md:border md:border-gray-dark md:shadow-lg">
      {loading ? (
        <>
          <SkeletonUserProfile />
        </>
      ) : (
        <>
          <div className="mx-auto mt-10 flex flex-col items-center">
            <ProfileImage />
            <div className="mb-10 mt-5 flex flex-col items-center gap-2 text-gray-600">
              <h2 className="text-center text-2xl font-semibold">
                {user?.NAME}
              </h2>
              <div className="flex flex-row gap-3">
                <p>{user?.EMAIL}</p>
                <span> - </span>
                <p>{user?.USERNAME}</p>
              </div>
              {user?.DT_CR && (
                <p>
                  Membro desde:{" "}
                  {new Date(user.DT_CR).toLocaleDateString("pt-BR")}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Button
                onClick={() => setOpenChangeInfos(true)}
                className="px-12 py-5"
              >
                Editar Perfil
              </Button>

              <ButtonChangeEmail
                email={user?.EMAIL ?? ""}
                isLoading={isLoading}
                setIsLoading={(value: boolean) => setIsLoading(value)}
              />
              <EditUserDialog
                open={openChangeInfos}
                onChange={setOpenChangeInfos}
              />
            </div>
          </div>

          <div className="px-6 pb-10">
            <h2 className="mb-6 text-center font-mono text-gray-dark">
              Avaliação de contribuições
            </h2>
            <StatisticsCards user={user} />

            <div className="mt-10 flex justify-center">
              <DeleteUserDialog />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
