'use server'

import 'server-only'
import { jwtVerify } from 'jose'
import { getJwtSecretKey, REFRESH_TOKEN, USER_TOKEN } from '@/lib/constants'
import { service_api } from '@/service/service.api'
import { cookies } from 'next/headers'
import { webConfig } from '@/lib/settings';
import { handleApiError } from '@/lib/client.util'

type SessionPayload = {
  email: string;
  password: string;
  password_remember?: boolean | undefined;
}

interface createUserPayload extends SessionPayload {
  name: string;
  username: string;
}

type EncryptProps = {
  access_token: string;
  access_token_expiresIn: string;
  refresh_token: string;
  refresh_token_expiresIn: string;
  status?: number | string;
  message?: string;
}

export type UserProps = {
  ID_USER: string;
  EMAIL: string;
  NAME: string;
  USERNAME: string;
  ROLE: string;
  DEL_AT: Date | null
  DT_CR: Date,
  DT_UP: Date,
  _count : {
    Question: number,
    Answers: number,
  }
  status?: number | string;
  message?: string;
}

async function AuthenticateUser(payload: SessionPayload): Promise<EncryptProps> {
  return await service_api.post('/auth/login', {
    email: payload.email,
    password: payload.password
  })
    .then(({ data, status }) => ({ ...data }))
    .catch(({ response, message }) => {

      if (response) return { status: response?.status, message: response?.statusText };
      return { message, status: 500 }
    })
}

async function CreateUser(payload: createUserPayload): Promise<EncryptProps> {
  return await service_api.post('/auth/signup', {
    username: payload.username,
    name: payload.name,
    email: payload.email,
    password: payload.password
  })
    .then(({ data, status }) => ({ ...data }))
    .catch(({ response, message }) => {

      if (response) return { status: response?.status, message: response?.statusText };
      return { message, status: 500 }
    })
}

async function revalidateToken(refreshToken: string): Promise<Pick<EncryptProps, 'access_token' | 'access_token_expiresIn'>> {
  return await service_api.post('/auth/refresh-token', {
    refresh_token: refreshToken,
  })
    .then(({ data, status }) => ({ ...data }))
    .catch(({ response, message }) => {

      if (response) return { status: response?.status, message: response?.statusText };
      return { message, status: 500 }
    })
}

export async function decrypt(session: string | undefined = '') {
  if (session) {
    try {
      const { payload } = await jwtVerify(session, await getJwtSecretKey())

      return payload;
    } catch (error: any) {
      if (error?.code !== 'ERR_JWS_INVALID') {
        console.log('Falha ao verificar sessão', error)
      }
    }
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(new Date().setHours(23, 59, 59))

  const session = await AuthenticateUser(payload)

  if (session?.message) return session;

  console.log('[' + new Date().toLocaleString() + ']', '\u{1F44B} Usuário\x1b[36m', payload?.email, '\x1b[0macabou de se conectar');

  const cookieStore = await cookies()

  cookieStore.set(USER_TOKEN, session?.access_token, {
    secure: webConfig.env === 'production' ? true : false,
    expires: payload?.password_remember ? (new Date(session.access_token_expiresIn) || expiresAt) : undefined,
    sameSite: 'lax',
    path: '/',
  })

  cookieStore.set(REFRESH_TOKEN, session?.refresh_token, {
    secure: webConfig.env === 'production' ? true : false,
    expires: payload?.password_remember ? (new Date(session.refresh_token_expiresIn) || expiresAt) : undefined,
    sameSite: 'lax',
    path: '/',
  })
}

export async function createNewUserSession(payload: createUserPayload) {
  const expiresAt = new Date(new Date().setHours(23, 59, 59))

  const session = await CreateUser(payload)

  if (session?.message) return session;

  console.log('[' + new Date().toLocaleString() + ']', '\u{1F44B} Usuário\x1b[36m', payload?.email, '\x1b[0macabou de se conectar');

  const cookieStore = await cookies()

  cookieStore.set(USER_TOKEN, session?.access_token, {
    secure: webConfig.env === 'production' ? true : false,
    expires: payload?.password_remember ? (new Date(session.access_token_expiresIn) || expiresAt) : undefined,
    sameSite: 'lax',
    path: '/',
  })

  cookieStore.set(REFRESH_TOKEN, session?.refresh_token, {
    secure: webConfig.env === 'production' ? true : false,
    expires: payload?.password_remember ? (new Date(session.refresh_token_expiresIn) || expiresAt) : undefined,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get(REFRESH_TOKEN)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const newAccessToken = await revalidateToken(session);

  const expiresAt = new Date(new Date().setHours(23, 59, 59))

  const cookieStore = await cookies()
  cookieStore.set(USER_TOKEN, newAccessToken.access_token, {
    httpOnly: webConfig.env === 'production' ? true : false,
    secure: webConfig.env === 'production' ? true : false,
    expires: (new Date(newAccessToken.access_token_expiresIn) || expiresAt),
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(USER_TOKEN)
  cookieStore.delete(REFRESH_TOKEN)
}

export async function getUser(): Promise<UserProps> {
  return await service_api.get('/auth/me')
    .then(({ data }) => ({ ...data }))
    .catch(handleApiError)
}

export async function UploadUserImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const { uploadUrl } = await service_api.post('storage/presign')
    .then(({ data }) => ({ ...data }))
    .catch(handleApiError)

  return await service_api.put(uploadUrl, formData.get('image'), {
      headers: {
        'Content-Type': file.type,
      },
    })
      .then(({ data }) => ({ ...data }))
      .catch(handleApiError)

}

export async function fetcher(url: string) {
  return service_api.get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw (err?.response?.data || err?.response);
    })
}
