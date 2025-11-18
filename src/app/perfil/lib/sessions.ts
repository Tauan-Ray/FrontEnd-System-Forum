'use server'

import 'server-only'
import { handleApiError } from "@/lib/client.util"
import { DefaultParamsResponse } from "@/lib/type"
import { service_api } from "@/service/service.api"


export type ResAllVotesUser = {
    likes: number;
    dislikes: number;
}

export async function getAllVotesUser(idUser: string): Promise<{ data: ResAllVotesUser, status: number } | DefaultParamsResponse> {
  return await service_api.get<ResAllVotesUser>(`/answers/user/${idUser}/vote`)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError)
}
