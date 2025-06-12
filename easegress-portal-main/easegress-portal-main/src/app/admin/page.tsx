// "use client"

// import { Typography } from "@mui/material"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useIntl } from "react-intl"

// export default function AdminHome() {
//   const router = useRouter()
//   const intl = useIntl()

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push("/rooms") 
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [router])

//   return (
//     <div>
//       <Typography>{intl.formatMessage({ id: 'app.redirect' })}</Typography>
//     </div>
//   )
// }

// app/admin/page.tsx
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
