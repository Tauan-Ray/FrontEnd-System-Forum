import { webConfig } from "./settings";

export const USER_TOKEN = 'forum:token';
export const REFRESH_TOKEN = 'forum:refresh';

const JWT_SECRET: string | undefined = webConfig.secret;

export async function getJwtSecretKey(): Promise<Uint8Array> {
    const secret = JWT_SECRET;

    if (!secret || secret.length === 0) {
        throw new Error('A variável de ambiente JWT_SECRET não foi definida.')
    }

    return new TextEncoder().encode(secret);
}