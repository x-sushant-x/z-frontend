import { ApiSuccess, ApiError } from "./DTO/response"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT


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
    token?: string
}

export async function signup(payload: SignupPayload): Promise<ApiSuccess<AuthResponse>> {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
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
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
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


    return data as ApiSuccess<AuthResponse>
}
