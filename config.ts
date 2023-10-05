export default {
    APP: {
        PORT: process.env.PORT ?? 3000,
    },
    CORS: {
        allowedOriginPattern: process.env.CORS_ALLOWED_ORIGIN_PATTERN ?? '.*'
    },
}
