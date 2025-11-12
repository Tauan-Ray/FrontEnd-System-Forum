'use server'

import 'server-only'
import { handleApiError } from "@/lib/client.util"
import { DefaultParamsResponse } from "@/lib/type"
import { service_api } from "@/service/service.api"
import { CreateQuestionFormSchema } from './definitions'
import { z } from '@/components/pt-zod'

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
  DEL_AT?: Date | null
}

export type ResAnswer = {
  ID_AN: string;
  ID_QT: string;
  RESPONSE: string;
  DT_CR: Date;
  USERNAME: string;
  ROLE: string;
  TITLE: string;
  CATEGORY: string;
  likes: number;
  dislikes: number;
};

export type ResAnswerCreate = {
  ID_AN: string;
  RESPONSE: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  ID_USER: string;
  ID_QT: string;
};

type ResCreateQuestion = {
  message: string;
  data: ResQuestion
}

type ResCreateAnswer = {
  message: string;
  data: ResCreateAnswer;
}

export async function getCategories(): Promise<{ data: ResCategory, status: number } | DefaultParamsResponse> {
  return await service_api.get<ResCategory[]>(`/category/all`)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError)
}

export async function getQuestionById(id: string): Promise<{ data: ResQuestion, status: number } | DefaultParamsResponse> {
  return await service_api.get<ResCategory>(`/questions/find?id=${id}`)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError)
}

export async function createQuestion(
  question: z.infer<typeof CreateQuestionFormSchema>
): Promise<ResCreateQuestion & DefaultParamsResponse> {
  return await service_api.post('/questions/create', question)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError)
}


export async function createAnswer(answer: { ID_QT: string, response: string }): Promise<ResCreateAnswer & DefaultParamsResponse> {
  return await service_api.post('/answers/create', answer)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError)
}