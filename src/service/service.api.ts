import { USER_TOKEN } from '@/lib/constants';
import { webConfig } from '@/lib/settings';
import axios from 'axios';
import { cookies } from "next/headers";

const service_api = axios.create({
  baseURL: `${webConfig.url}:${webConfig.port}`,
  timeout: 20000,
});

service_api.interceptors.request.use(async (config) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(USER_TOKEN)?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service_api.interceptors.response.use(
  response => response,
  (error) => {
    let friendlyMessage = '';
    if (error.code === 'ECONNABORTED') {
      friendlyMessage = `⏳ Timeout atingido, não foi possível realizar requisição (${error?.config?.url}). `;
    } else if (error.message === 'Network Error') {
      friendlyMessage = '🌐 Erro de rede. Verifique sua conexão.'
    } else if (!error.response) {
      friendlyMessage = '🚫 Erro desconhecido (sem resposta): ' + error.message;
    }

    if (friendlyMessage) {
      error.friendlyMessage = friendlyMessage;
    }

    return Promise.reject(error);
  }
);

export { service_api };
