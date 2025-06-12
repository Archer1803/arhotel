"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type RoomDetail = {
  id: string;
  name: string;
  type: string;
  price: string;
  description: string;
  image_url: string;
  is_available: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `https://6825dd44397e48c91313eb90.mockapi.io/user/rooms/${id}`
        );
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết phòng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  // ✅ Lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleBooking = async () => {
    if (!room || !user || !startDate || !endDate) return;

    try {
      // Gửi thông tin khách hàng
      await fetch(
        "https://6825df9f397e48c91313f9ac.mockapi.io/qlks/customers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            phone_number: phone,
            address,
            gender,
          }),
        }
      );

      // Gửi đặt phòng
      await fetch("https://6825df9f397e48c91313f9ac.mockapi.io/qlks/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          room_id: room.id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: true,
           total_price: totalPrice,
        }),
      });

      // Cập nhật trạng thái phòng
      await fetch(
        `https://6825dd44397e48c91313eb90.mockapi.io/user/rooms/${room.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_available: "false" }),
        }
      );

      // ✅ Cập nhật lại trạng thái phòng trong React
      setRoom((prevRoom) =>
        prevRoom ? { ...prevRoom, is_available: "false" } : prevRoom
      );

      // ✅ Reset form
      setOpen(false);
      setStartDate(null);
      setEndDate(null);
      setPhone("");
      setAddress("");
      setGender("");
      alert("Đặt phòng thành công!");
    } catch (err) {
      console.error("Lỗi khi đặt phòng:", err);
    }
  };

  if (loading) return <CircularProgress />;

  if (!room) return <Typography>Không tìm thấy phòng.</Typography>;

  const totalDays = startDate && endDate ? endDate.diff(startDate, "day") : 0;
  const totalPrice = totalDays * parseInt(room.price);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={room.image_url}
          alt={room.name}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {room.name}
          </Typography>
          <Typography>
            <strong>Loại:</strong> {room.type}
          </Typography>
          <Typography>
            <strong>Giá:</strong> {parseInt(room.price).toLocaleString()} VND
          </Typography>
          <Typography>
            <strong>Mô tả:</strong> {room.description}
          </Typography>
          <Typography>
            <strong>Tình trạng:</strong>{" "}
            <span
              style={{ color: room.is_available === "true" ? "green" : "red" }}
            >
              {room.is_available === "true" ? "Trống" : "Đã có người thuê"}
            </span>
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={room.is_available === "false"}
          onClick={() => setOpen(true)}
        >
          Đặt phòng
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Đặt phòng - {room.name}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày đến"
              value={startDate}
              onChange={setStartDate}
              format="DD/MM/YYYY"
            />
            <DatePicker
              label="Ngày đi"
              value={endDate}
              onChange={setEndDate}
              format="DD/MM/YYYY"
              sx={{ mt: 2 }}
            />
          </LocalizationProvider>

          <Typography sx={{ mt: 2 }}>
            Giá mỗi đêm: {parseInt(room.price).toLocaleString()} VND
          </Typography>
          <Typography>Tổng giá: {totalPrice.toLocaleString()} VND</Typography>

          {user && (
            <>
              <Typography sx={{ mt: 2 }}>
                <strong>Tên:</strong> {user.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>
            </>
          )}

          <TextField
            label="Địa chỉ"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Số điện thoại"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            select
            label="Giới tính"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleBooking}
            sx={{ mt: 3 }}
            disabled={!startDate || !endDate || !phone || !address || !gender}
          >
            Xác nhận đặt phòng
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
