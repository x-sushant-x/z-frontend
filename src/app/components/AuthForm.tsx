'use client'

import { useState } from 'react'
import Link from 'next/link'

type AuthFormProps = {
    type: 'login' | 'signup'
    onSubmit: (data: { name?: string; email: string; password: string }) => void
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [form, setForm] = useState({ name: '', email: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md sm:w-[90%] bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6"
        >
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 capitalize tracking-tight">
                    {type === 'signup' ? 'Create an account' : 'Welcome back'}
                </h2>
                <p className="text-sm text-gray-500">
                    {type === 'signup' ? 'Sign up to get started' : 'Login to your account'}
                </p>
            </div>

            {type === 'signup' && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={form.name}
                        className="text-slate-700 mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="text-slate-700 mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="text-slate-700 mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {type === 'signup' ? 'Sign Up' : 'Login'}
            </button>

            {
                type === 'signup' ?
                    <div className='text-slate-700 text-sm text-center'> 
                        Already Have Account? <Link href='/login' className='text-blue-600 font-medium'>Login</Link>
                    </div> :
                    <div className='text-slate-700 text-sm text-center'> 
                        Dont Have Account? <Link href='/signup' className='text-blue-600 font-medium'>Create One</Link>
                    </div>
            }
        </form>
    )
}
