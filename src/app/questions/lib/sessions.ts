'use server'

import 'server-only'
import { handleApiError } from "@/lib/client.util"
import { DefaultParamsResponse } from "@/lib/type"
import { service_api } from "@/service/service.api"

export type ResCategory = {
    ID_CT: string,
    CATEGORY: string,
    DT_CR: Date,
    DT_UP: Date,
    DEL_AT: Date | null
}


export type ResQuestion = {
  ID_QT: string,
  ID_USER: string,
  ID_CT: string,
  TITLE: string,
  DESCRIPTION: string,
  DT_CR: Date,
  Category: {
      CATEGORY: string,
  },
  User: {
      USERNAME: string,
      ROLE: string,
  }
}

export async function getCategories(): Promise<{ data: ResCategory, status: number } | DefaultParamsResponse> {
  return await service_api.get<ResCategory[]>(`/category/all`)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError)
}