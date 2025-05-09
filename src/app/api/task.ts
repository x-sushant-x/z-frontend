import { ApiError, ApiSuccess } from "./DTO/response"
import { CreateTaskPayload, Task, UpdateTaskStatusPayload } from "./DTO/task"

const TASK_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

export async function createTask(payload: CreateTaskPayload): Promise<ApiSuccess<null>> {
    const response = await fetch(`${TASK_BASE_URL}/api/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Failed to create task')
    }

    return data as ApiSuccess<null>
}

export async function getAllTasks(): Promise<ApiSuccess<Task[]>> {
    const response = await fetch(`${TASK_BASE_URL}/api/task/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Failed to fetch tasks')
    }

    return data as ApiSuccess<Task[]>
}


export async function updateTaskStatus(payload: UpdateTaskStatusPayload): Promise<ApiSuccess<null>> {
    const response = await fetch(`${TASK_BASE_URL}/api/task/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    });

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error || 'Failed to update task status');
    }

    return data;
} 