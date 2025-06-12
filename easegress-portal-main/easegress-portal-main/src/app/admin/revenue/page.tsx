"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts"

type Booking = {
  id: string
  user_id: string
  room_id: string
  start_date: string
  end_date: string
  status: boolean
  total_price: number
}

export default function RevenuePage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<string>("")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/bookings")
        const data = await res.json()
        setBookings(data)

        if (data.length > 0) {
          const years: string[] = Array.from(
            new Set(data.map((b: Booking) => new Date(b.start_date).getFullYear().toString()))
          );

          if (years.length > 0) { // Kiểm tra nếu có năm
            setSelectedYear(years.sort()[0]);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu booking:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const getYears = (): string[] => {
    const years = bookings.map(b => new Date(b.start_date).getFullYear().toString())
    return Array.from(new Set(years)).sort()
  }

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      key: (i + 1).toString().padStart(2, "0"),
      label: `Tháng ${i + 1}`
    }))
  }

  const revenueByMonth = () => {
    const months = generateMonths()
    return months.map(({ key, label }) => {
      const monthlyBookings = bookings.filter(b => {
        const date = new Date(b.start_date)
        const year = date.getFullYear().toString()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        return year === selectedYear && month === key
      })

      const total = monthlyBookings.reduce((sum, b) => sum + (b.total_price || 0), 0)

      return {
        month: label,
        total: total
      }
    })
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Thống kê doanh thu theo tháng
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel id="year-label">Năm</InputLabel>
            <Select
              labelId="year-label"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Năm"
            >
              {getYears().map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 4, backgroundColor: "#f8f9fa" }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueByMonth()} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${v.toLocaleString()} VND`} />
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString()} VND`}
                  labelFormatter={(label: string) => `Thời gian: ${label}`}
                />
                <Legend />
                <Bar dataKey="total" fill="#1976d2" name="Doanh thu (VND)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  )
}
