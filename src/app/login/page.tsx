'use client'

import AuthForm from '../components/AuthForm'
import Header from '../components/Header'
import { login } from '../api/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()
  
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const res = await login({ email: data.email, password: data.password })
      console.log('Login success:', res)
      
      router.push('/home')
    } catch (err) {


      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An unexpected error occurred.')
      }
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </>
  )
}
