'use client'

import AuthForm from '../components/AuthForm'
import Header from '../components/Header'
import { signup } from '../api/auth'
import toast from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'


export default function SignupPage() {

  const router = useRouter()

  const handleSignup = async (data: { name?: string; email: string; password: string }) => {
    if (!data.name) {
      toast.error('Name is required')
      return
    }

    try {
      await signup({ name: data.name, email: data.email, password: data.password })
      router.push('/login')
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Signup Failed'
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </>
  )
}
