import { User } from "./DTO/user";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT


export interface GetUsersResponse {
    users: User[];
}

export async function getAllUsers(): Promise<GetUsersResponse> {
    const response = await fetch(`${BASE_URL}/api/user/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? 'Failed to fetch users')
    }

    return response.json()
}