'use client'

import AuthForm from '../components/AuthForm'
import Header from '../components/Header'
import { login } from '../api/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LogRocket from 'logrocket'

const apiKey = process.env.NEXT_LOG_ROCKET_API_KEY || ''
LogRocket.init(apiKey);

export default function LoginPage() {

  const router = useRouter()

  const handleLogin = async (data: { email: string; password: string }) => {
    const loadingToast = toast.loading("Logging In")

    try {
      await login({ email: data.email, password: data.password })

      router.push('/home')
    } catch (err) {


      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An unexpected error occurred.')
      }
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </>
  )
}
