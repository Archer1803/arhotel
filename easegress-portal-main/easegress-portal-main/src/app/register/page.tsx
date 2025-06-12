'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        'https://6825dd44397e48c91313eb90.mockapi.io/user/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            role: 'user',
          }),
        }
      )

      if (!res.ok) {
        throw new Error('Đăng ký thất bại')
      }

      router.push('/login')
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng ký')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng ký tài khoản
        </Typography>

        <TextField
          fullWidth
          label="Họ và tên"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          fullWidth
          label="Xác nhận mật khẩu"
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Đăng ký'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Đã có tài khoản?{' '}
            <span
              onClick={() => router.push('/login')}
              style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Đăng nhập
            </span>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
