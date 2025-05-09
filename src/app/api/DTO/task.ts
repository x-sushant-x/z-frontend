export interface Task {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
    description: string
    status: 'To Do' | 'In Progress' | 'Done'
    assignedTo: number
    user: {
        ID: number
        name: string
        email: string
    }
}

export interface CreateTaskPayload {
    description: string
    status: 'To Do' | 'In Progress' | 'Done'
    assignedTo: number
}

export interface UpdateTaskStatusPayload {
    taskId: number
    status: string
}