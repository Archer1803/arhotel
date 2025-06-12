"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

type Booking = {
  id: string;
  user_id: string;
  room_id: string;
  start_date: string;
  end_date: string;
  status: boolean;
  total_price: number;
};

type Room = {
  id: string;
  name: string;
  price: string;
};

type Customer = {
  user_id: string;
  phone_number: string;
  address: string;
  gender: string;
};

export default function InfoPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const userData =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [bookingRes, roomRes, customerRes] = await Promise.all([
          fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/bookings"),
          fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/rooms"),
          fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/customers"),
        ]);

        const bookingData: Booking[] = await bookingRes.json();
        const roomData: Room[] = await roomRes.json();
        const customerData: Customer[] = await customerRes.json();

        const userBookings = bookingData.filter((b) => b.user_id === user.id);
        const userCustomer = customerData.find((c) => c.user_id === user.id);

        setBookings(userBookings);
        setRooms(roomData);
        setCustomer(userCustomer || null);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getRoomById = (id: string) => rooms.find((r) => r.id === id);

  return (
    <Box sx={{ p: 3 }}>
      {user && (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Xin chào, {user.name}
          </Typography>

          <Typography variant="h6" mt={2} gutterBottom>
            Thông tin chi tiết
          </Typography>

          <Typography>Email: {user.email}</Typography>
          {customer && (
            <>
              <Typography>Số điện thoại: {customer.phone_number}</Typography>
              <Typography>Địa chỉ: {customer.address}</Typography>
              <Typography>Giới tính: {customer.gender}</Typography>
            </>
          )}
        </>
      )}

      <Typography variant="h6" mt={4} gutterBottom>
        Lịch sử đặt phòng
      </Typography>

      {loading ? (
        <Typography>Đang tải dữ liệu...</Typography>
      ) : bookings.length === 0 ? (
        <Typography>Chưa có thông tin đặt phòng.</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên phòng</TableCell>
                <TableCell>Check-in</TableCell>
                <TableCell>Check-out</TableCell>
                <TableCell>Giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => {
                const room = getRoomById(b.room_id);
                return (
                  <TableRow key={b.id}>
                    <TableCell>{room?.name || "Không xác định"}</TableCell>
                    <TableCell>
                      {new Date(b.start_date).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {new Date(b.end_date).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {b.total_price?.toLocaleString("vi-VN") || "--"} VND
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
