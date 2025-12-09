"use server";

import "server-only";
import { handleApiError } from "@/lib/client.util";
import { DefaultParamsResponse } from "@/lib/type";
import { service_api } from "@/service/service.api";


export type ResAnswer = {
  ID_AN: string;
  ID_QT: string;
  ID_USER: string;
  RESPONSE: string;
  DT_CR: Date;
  DT_UP: Date;
  USERNAME: string;
  ROLE: string;
  TITLE: string;
  CATEGORY: string;
  dt_up_user: Date,
  del_at_user: Date | null,
  likes: number;
  dislikes: number;
  user_vote: "LIKE" | "DESLIKE" | null;
};

export type ResAllAnswers = {
  ID_AN: string;
  ID_QT: string;
  ID_USER: string;
  RESPONSE: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  USERNAME: string;
  ROLE: string;
  TITLE: string;
  CATEGORY: string;
  dt_up_user: Date,
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
  data: ResAnswerCreate;
};

export async function createAnswer(answer: {
  ID_QT: string;
  response: string;
}): Promise<ResCreateAnswer & DefaultParamsResponse> {
  return await service_api
    .post("/answers/create", answer)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}

export async function UpdateVote(
  idAnswer: string,
  vote: { type: "LIKE" | "DESLIKE" }
): Promise<
  { data: { message: string }; status: number } | DefaultParamsResponse
> {
  return await service_api
    .patch<{ data: { message: string } }>(`/answers/${idAnswer}/vote`, vote)
    .then(({ data, status }) => ({ status, data }))
    .catch(handleApiError);
}

export async function editAnswer(
  ID_AN: string,
  response: string
): Promise<ResCreateAnswer & DefaultParamsResponse> {
  return await service_api
    .patch(`/answers/update/${ID_AN}`, { response })
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}

export async function deleteAnswer(
  idAnswer: string,
): Promise<{ message: string } & DefaultParamsResponse> {
  return await service_api
    .patch(`/answers/delete/${idAnswer}`)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}

export async function RestoreAnswer(
  ID_AN: string,
): Promise<Pick<ResCreateAnswer, 'message'> & DefaultParamsResponse> {
  return await service_api
    .patch(`/answers/restore/${ID_AN}`)
    .then(({ data, status }) => ({ ...data, status }))
    .catch(handleApiError);
}