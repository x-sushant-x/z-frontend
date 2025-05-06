'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import { getAllUsers, GetUsersResponse } from '../api/user'
import { createTask, getAllTasks, updateTaskStatus } from '../api/task'
import { CreateTaskPayload, GetTasksResponse, Task, UpdateTaskStatusPayload } from '../api/DTO/task'
import { User } from '../api/DTO/user'

const statusOptions: Task['status'][] = ['To Do', 'In Progress', 'Done']

export default function HomePage() {
    const [taskName, setTaskName] = useState<string>('')
    const [assignedUser, setAssignedUser] = useState<User>()
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [openStatusIndex, setOpenStatusIndex] = useState<number | null>(null)
    const [allUsers, setAllUsers] = useState<GetUsersResponse | null>(null)
    const [allTasks, setAllTasks] = useState<GetTasksResponse | null>(null)


    const handleCreateTask = () => {
        if (!taskName || !assignedUser) {
            toast.error('Please fill all fields')
            return
        }

        const newTask: CreateTaskPayload = {
            description: taskName,
            assignedTo: assignedUser.ID,
            status: 'To Do',
        }

        createNewTask(newTask)
    }

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        try {
            const updatePayload: UpdateTaskStatusPayload = {
                taskId: taskId,
                status: newStatus
            }

            await updateTaskStatus(updatePayload);
            setOpenStatusIndex(null)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks'
            toast.error(errorMessage)
        }
    }

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers()
            setAllUsers(data)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users'
            toast.error(errorMessage)
        }
    }

    const fetchTasks = async () => {
        try {
            const tasks = await getAllTasks()
            setAllTasks(tasks)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks'
            toast.error(errorMessage)
        }
    }

    const createNewTask = async (task: CreateTaskPayload) => {
        try {
            await createTask(task)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create tasks'
            toast.error(errorMessage)
        }
    }

    const listenSocketUpdates = () => {
        const socket = new WebSocket('wss://z-backend-production.up.railway.app/ws')

        socket.onmessage = (event) => {
            const updatedTask: Task = JSON.parse(event.data)

            setAllTasks((prev) => {
                if (!prev) return { tasks: [updatedTask] }

                const existingTask = prev.tasks.some(t => t.ID === updatedTask.ID)

                if(existingTask) {
                    return {
                        tasks : prev.tasks.map(t => 
                            t.ID === updatedTask.ID ? updatedTask : t
                        )
                    }
                } else {
                    return {
                        tasks : [...prev.tasks, updatedTask]
                    }
                }
            })
        }

        socket.onerror = (e) => {
            console.log('socket error: ' + e)
            toast.error('Unable to update data automatically. Please refresh.')
        }
    }


    useEffect(() => {
        fetchUsers()
        fetchTasks()
        listenSocketUpdates()
    }, [])


    const renderAvatar = (userName: string) => {
        const initials = userName
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .join('')
        return (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white">
                {initials}
            </div>
        )
    }

    const getStatusClass = (status: Task['status']) => {
        if (status === 'To Do') return 'bg-gray-200 text-gray-600'
        if (status === 'In Progress') return 'bg-orange-400 text-white'
        if (status === 'Done') return 'bg-green-600 text-white'
        return ''
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Task creation input and dropdown */}
                <div className="mb-6 flex justify-center items-center space-x-4">
                    <input
                        type="text"
                        className="px-4 py-2 w-80 text-sm border border-gray-300 rounded-md text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter task name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <div className="relative">
                        <button
                            className="px-4 py-2 text-sm border rounded-md text-slate-600 border-gray-300"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            {assignedUser?.name || 'Select User'}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-48 z-10">
                                {allUsers?.users.map((user) => (
                                    <div
                                        key={user.ID}
                                        className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer border-gray-300 text-slate-800"
                                        onClick={() => {
                                            setAssignedUser(user)
                                            setIsDropdownOpen(false)
                                        }}
                                    >
                                        {user.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </button>
                </div>

                {/* Task List */}
                <div className="space-y-4 flex flex-col items-center">
                    {allTasks?.tasks.map((task, index) => (
                        <div key={index} className="p-4 rounded-lg bg-white border-gray-200 border w-[37rem]">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-lg text-slate-800">{task.description}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-slate-800">{task.user.name}</span>
                                    {renderAvatar(task.user.name)}
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">Status:</span>
                                    <button
                                        onClick={() =>
                                            setOpenStatusIndex(
                                                openStatusIndex === index ? null : index
                                            )
                                        }
                                        className={`px-2 py-1 text-xs rounded-md ${getStatusClass(
                                            task.status
                                        )}`}
                                    >
                                        {task.status}
                                    </button>
                                </div>
                                {/* Status Dropdown */}
                                {openStatusIndex === index && (
                                    <div className="absolute z-20 mt-5 border rounded-md border-gray-200 w-36 space-y-2 p-2 bg-white">
                                        {statusOptions.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => handleStatusChange(task.ID, option)}
                                                className={`px-4 py-2 rounded-sm text-sm cursor-pointer ${getStatusClass(
                                                    option
                                                )}`}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
