"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UsserHomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/user/home')
  }, [router])

  return <div>Đang chuyển hướng đến trang web...</div>
}
