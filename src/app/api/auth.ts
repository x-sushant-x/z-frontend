import { ApiSuccess, ApiError } from "./DTO/response"

const BASE_URL = 'http://localhost:4000/api/auth'


export type SignupPayload = {
    name: string
    email: string
    password: string
}

export type LoginPayload = {
    email: string
    password: string
}

export type AuthResponse = {
    message: string
    token?: string
}

export async function signup(payload: SignupPayload): Promise<ApiSuccess<AuthResponse>> {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (response.status != 201) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Signup failed')
    }

    return data
}

export async function login(payload: LoginPayload): Promise<ApiSuccess<AuthResponse>> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()


    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Login failed')
    }

    return data
}
