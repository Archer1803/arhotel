"use client"
import React, { useEffect, useState } from "react"
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress
} from "@mui/material"

type Booking = {
  id: string
  user_id: string
  room_id: string
  start_date: string
  end_date: string
  status: string
}

type Room = {
  id: string
  name: string
  is_available: string // "true" | "false"
}

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

type Customer = {
  id: string
  user_id: string
  phone_number: number
  address: string
  gender: string
}

const BookingInfo: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, usersRes, roomsRes, customersRes] = await Promise.all([
          fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/bookings"),
          fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/users"),
          fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/rooms"),
          fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/customers")
        ])

        const [bookingsData, usersData, roomsData, customersData] = await Promise.all([
          bookingsRes.json(), usersRes.json(), roomsRes.json(), customersRes.json()
        ])

        setBookings(bookingsData)
        setUsers(usersData)
        setRooms(roomsData)
        setCustomers(customersData)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const cleanId = (id: string, prefix: string) => id.replace(`${prefix} `, "")

  const getRoomName = (room_id: string) => {
    const id = cleanId(room_id, "room_id")
    return rooms.find(r => r.id === id)?.name || "Không xác định"
  }

  const getUserName = (user_id: string) => {
    const id = cleanId(user_id, "user_id")
    return users.find(u => u.id === id)?.name || "Không xác định"
  }

  const handleDetailClick = (user_id: string) => {
    const id = cleanId(user_id, "user_id")
    const user = users.find(u => u.id === id) || null
    const customer = customers.find(c => c.user_id === id) || null



  // Kiểm tra và log thông tin
    console.log("Selected User:", user);
    console.log("Selected Customer:", customer);


    setSelectedUser(user)
    setSelectedCustomer(customer)
    setOpenDialog(true)
  }

  const handleCheckout = async (room_id: string) => {
    const id = cleanId(room_id, "room_id")
    try {
      await fetch(`https://6825dd44397e48c91313eb90.mockapi.io/user/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_available: "true" })
      })

      setRooms(prev =>
        prev.map(r => (r.id === id ? { ...r, is_available: "true" } : r))
      )
    } catch (error) {
      console.error("Lỗi khi checkout:", error)
    }
  }

  const filteredBookings = bookings.filter(b => {
    const roomId = cleanId(b.room_id, "room_id")
    const room = rooms.find(r => r.id === roomId)
    return room && room.is_available === "false"
  })

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Thông tin đặt phòng
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Tên phòng</strong></TableCell>
                <TableCell><strong>Tên khách hàng</strong></TableCell>
                <TableCell><strong>Ngày bắt đầu</strong></TableCell>
                <TableCell><strong>Ngày kết thúc</strong></TableCell>
                <TableCell><strong>Trạng thái</strong></TableCell>
                <TableCell align="center"><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{getRoomName(booking.room_id)}</TableCell>
                  <TableCell>{getUserName(booking.user_id)}</TableCell>
                  <TableCell>{new Date(booking.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.end_date).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.status === "true" ? "Trống" : "Có người đặt"}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleDetailClick(booking.user_id)}
                      sx={{ marginRight: 1 }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCheckout(booking.room_id)}
                    >
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Typography><strong>Tên:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
            
            </>
          )}
          {selectedCustomer && (
            <>
              <Typography>  <strong>SĐT:</strong> {String(selectedCustomer.phone_number)}</Typography>
              <Typography><strong>Địa chỉ:</strong> {selectedCustomer.address}</Typography>
              <Typography><strong>Giới tính:</strong> {selectedCustomer.gender}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BookingInfo
