"use server";

import "server-only";
import { handleApiError } from "@/lib/client.util";
import { DefaultParamsResponse } from "@/lib/type";
import { service_api } from "@/service/service.api";
import { z } from "@/components/pt-zod";

export type ResUsers = {
  ID_USER: string;
  EMAIL: string;
  NAME: string;
  USERNAME: string;
  ROLE: string;
  DT_CR: Date;
  DT_UP: Date;
  DEL_AT: Date | null;
  _count: {
    Question: number;
    Answers: number;
  };
};
