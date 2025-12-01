export const webConfig = {
    url: process.env.NEXT_PUBLIC_HOST_FORUM_SERVER,
    port: Number(process.env.NEXT_PUBLIC_PORT_FORUM_SERVER),
    secret: process.env.JWT_SECRET_KEY,
    env: process.env.NODE_ENV || 'development',
}