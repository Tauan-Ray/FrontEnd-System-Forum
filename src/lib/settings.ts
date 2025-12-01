export const webConfig = {
    url: process.env.NEXT_PUBLIC_HOST_FORUM_SERVER,
    port: Number(process.env.NEXT_PUBLIC_PORT_FORUM_SERVER),
    secret: process.env.JWT_SECRET_KEY,
    env: process.env.NODE_ENV || 'development',
}

export const serviceConfig = {
    email_service_url: process.env.EMAIL_SERVICE_URL,
    email_service_port: Number(process.env.EMAIL_SERVICE_PORT),
    email_api_key: process.env.EMAIL_API_KEY,
}