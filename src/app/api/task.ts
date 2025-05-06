import { ApiError, ApiSuccess } from "./DTO/response"
import { CreateTaskPayload, GetTasksResponse, UpdateTaskStatusPayload } from "./DTO/task"

const TASK_BASE_URL = 'https://z-backend-production.up.railway.app/api/task'

export async function createTask(payload: CreateTaskPayload): Promise<ApiSuccess<null>> {
    const response = await fetch(`${TASK_BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Failed to create task')
    }

    return data as ApiSuccess<null>
}

export async function getAllTasks(): Promise<GetTasksResponse> {
    const response = await fetch(`${TASK_BASE_URL}/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error ?? 'Failed to fetch tasks')
    }

    return data as GetTasksResponse
}


export async function updateTaskStatus(payload: UpdateTaskStatusPayload): Promise<ApiSuccess<null>> {
    const response = await fetch(`${TASK_BASE_URL}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json()

    if (!response.ok) {
        const error = data as ApiError
        throw new Error(error.error || 'Failed to update task status');
    }

    return data;
} 