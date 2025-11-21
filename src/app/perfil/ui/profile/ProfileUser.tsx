"use client";

import { useAuthStore } from "@/store/useAuthStore";
import ProfileImage from "./ProfileImage";
import { Button } from "@/components/ui/button";
import { SkeletonUserProfile } from "@/components/SkeletonModel";
import StatisticsCards from "./StatisticsCards";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";

export default function ProfileUser() {
  const { user, loading } = useAuthStore();
  const [openChangeInfos, setOpenChangeInfos] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full rounded-xl md:shadow-lg overflow-hidden max-w-md md:border md:border-gray-dark gap-14">
      {loading ? (
        <>
          <SkeletonUserProfile />
        </>
      ) : (
        <>
          <div className="flex flex-col mx-auto mt-10 items-center">
            <ProfileImage ID_USER={user?.ID_USER ?? ""} />
            <div className="flex flex-col items-center mt-5 mb-10 text-gray-600 gap-2">
              <h2 className="text-2xl font-semibold text-center">{user?.NAME}</h2>
              <div className="flex flex-row gap-3">
                <p>{user?.EMAIL}</p>
                <span> - </span>
                <p>{user?.USERNAME}</p>
              </div>
              {user?.DT_CR && (
                <p>
                  Membro desde: {new Date(user.DT_CR).toLocaleDateString("pt-BR")}
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
              <EditUserDialog
                open={openChangeInfos}
                onChange={setOpenChangeInfos}
              />
            </div>
          </div>

          <div className="px-6 pb-10">
            <h2 className="font-mono text-gray-dark text-center mb-6">
              Avaliação de contribuições
            </h2>
            <StatisticsCards user={user} />
          </div>
        </>
      )}
    </div>
  );
}
