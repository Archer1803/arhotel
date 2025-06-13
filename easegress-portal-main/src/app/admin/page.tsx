
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/rooms')
  }, [router])

  return <div>Đang chuyển hướng đến quản lý phòng...</div>
}
