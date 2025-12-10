"use server";

import "server-only";
import { handleApiError } from "@/lib/client.util";
import { DefaultParamsResponse } from "@/lib/type";
import { service_api } from "@/service/service.api";
import { z } from "@/components/pt-zod";
import { UpdatePasswordFormSchema, UpdateUserFormSchema } from "./definitions";

export type ResAllVotesUser = {
  likes: number;
  dislikes: number;
};

type ResUpdateUserInfos = {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
  };
};

export async function getAllVotesUser(
  idUser: string
): Promise<{ data: ResAllVotesUser; status: number } | DefaultParamsResponse> {
  return await service_api
    .get<ResAllVotesUser>(`/answers/votes/user/${idUser}`)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError);
}

export async function UpdateUserInfos(
  value: z.infer<typeof UpdateUserFormSchema>,
  userId: string
): Promise<ResUpdateUserInfos & DefaultParamsResponse> {
  return await service_api
    .patch(`/user/update/${userId}`, value)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}


export async function UpdateUserPassword(
  value: z.infer<typeof UpdatePasswordFormSchema>,
  userId: string
): Promise<ResUpdateUserInfos & DefaultParamsResponse> {
  return await service_api
    .patch(`/user/update/${userId}/password`, value)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}

export async function DeleteUser(
  ID_USER: string,
  actualPassword: string
): Promise<Pick<ResUpdateUserInfos, 'message'> & DefaultParamsResponse> {
  return await service_api
    .patch(`/user/delete/${ID_USER}`, { actualPassword })
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}

export async function RestoreUser(
  ID_USER: string,
): Promise<Pick<ResUpdateUserInfos, 'message'> & DefaultParamsResponse> {
  return await service_api
    .patch(`/user/restore/${ID_USER}`)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}