export interface ApiSuccess<T> {
    message: string
    data?: T
}

export interface ApiError {
    error: string
}
