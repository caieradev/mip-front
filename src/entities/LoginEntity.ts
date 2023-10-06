export type LoginRequestEntity = {
    session_id: string,
    login: string,
    password: string,
    locale: string
}

export type UserEntity = {
    accessToken: string,
    deviceType: string,
    deviceId: string,
    locale: string,
    sessionId: string,
    email: string,
    password: string,
    userId: string,
    userName: string,
    auth: string,
    expires: Date | any
}