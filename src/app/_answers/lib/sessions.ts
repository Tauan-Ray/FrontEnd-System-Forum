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
  DEL_AT?: Date | null
}

export type ResAnswer = {
  ID_AN: string;
  ID_QT: string;
  ID_USER: string;
  RESPONSE: string;
  DT_CR: Date;
  USERNAME: string;
  ROLE: string;
  TITLE: string;
  CATEGORY: string;
  likes: number;
  dislikes: number;
  user_vote: "LIKE" | "DESLIKE" | null;
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


type ResCreateAnswer = {
  message: string;
  data: ResCreateAnswer;
}


export async function createAnswer(answer: { ID_QT: string, response: string }): Promise<ResCreateAnswer & DefaultParamsResponse> {
  return await service_api.post('/answers/create', answer)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError)
}

export async function UpdateVote(idAnswer: string, vote: { type: "LIKE" | "DESLIKE" }): Promise<{ data: { message: string } , status: number } | DefaultParamsResponse> {
  return await service_api.patch<{ data: { message: string } }>(`/answers/${idAnswer}/vote`, vote)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError)
}