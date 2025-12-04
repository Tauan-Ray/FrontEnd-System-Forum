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