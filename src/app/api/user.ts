import { User } from "./DTO/user";

const BASE_URL = 'https://z-backend-production.up.railway.app/api/user'


export interface GetUsersResponse {
    users: User[];
}

export async function getAllUsers(): Promise<GetUsersResponse> {
    const response = await fetch(`${BASE_URL}/list`, {
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