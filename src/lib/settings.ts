export const webConfig = {
    url: process.env.HOST_FORUM_SERVER,
    port: Number(process.env.PORT_FORUM_SERVER),
    secret: process.env.JWT_SECRET_KEY,
    env: process.env.NODE_ENV || 'development',
}