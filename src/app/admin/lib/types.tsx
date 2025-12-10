export type searchUserParams = {
  ID_USER: string | undefined;
  EMAIL: string | undefined;
  USERNAME: string | undefined;
  NAME: string | undefined;
  registerStart: string | undefined;
  registerEnd: string | undefined;
}

export const defaultUserParams = {
  ID_USER: undefined,
  EMAIL: undefined,
  USERNAME: undefined,
  NAME: undefined,
  registerStart: undefined,
  registerEnd: undefined,
}

export type searchAnswerParams = {
  ID_CT: string | undefined;
  search: string | undefined;
  EMAIL: string | undefined;
  USERNAME: string | undefined;
  registerStart: string | undefined;
  registerEnd: string | undefined;
}

export const defaultAnswerParams = {
  ID_CT: undefined,
  search: undefined,
  EMAIL: undefined,
  USERNAME: undefined,
  registerStart: undefined,
  registerEnd: undefined,
}

export type searchCategoriesParams = {
  ID_CT: string | undefined;
  CATEGORY: string | undefined;
  registerStart: string | undefined;
  registerEnd: string | undefined;
}

export const defaultCategoriesParams = {
  ID_CT: undefined,
  CATEGORY: undefined,
  registerStart: undefined,
  registerEnd: undefined,
}