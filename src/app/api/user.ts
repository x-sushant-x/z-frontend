import { ApiError } from "next/dist/server/api-utils";
import { ApiSuccess } from "./DTO/response";
import { User } from "./DTO/user";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT



export async function getAllUsers(): Promise<ApiSuccess<User[]>> {
    const response = await fetch(`${BASE_URL}/api/user/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.message ?? 'Failed to fetch users')
    }

    return data as ApiSuccess<User[]>
}