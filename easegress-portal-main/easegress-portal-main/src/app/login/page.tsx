'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://6825dd44397e48c91313eb90.mockapi.io/user/users')
      const users = await response.json()

      const matchedUser = users.find(
        (user: any) => user.email === email && user.password === password
      )

      if (!matchedUser) {
        setError('Sai email hoặc mật khẩu')
        return
      }

      // Chỉ lưu thông tin cần thiết
      const { id, name, email: userEmail, password: userPassword } = matchedUser
      localStorage.setItem(
        'user',
        JSON.stringify({ id, name, email: userEmail, password: userPassword })
      )

      // Điều hướng theo vai trò
      if (matchedUser.role === 'admin') {
        router.push('/admin/rooms')
      } else {
        router.push('/user/home')
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng nhập
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1, mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Đăng nhập'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Bạn chưa có tài khoản?{' '}
            <Link href="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>
              Đăng ký
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
