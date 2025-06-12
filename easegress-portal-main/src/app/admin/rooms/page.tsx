"use client"
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Edit, Delete } from "@mui/icons-material";

type Room = {
  id: string;
  name: string;
  type: string;
  price: string;
  description: string;
  image_url: string;
  is_available: string;
};

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Partial<Room>>({});

  const fetchRooms = async () => {
    try {
      const res = await fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Lỗi fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleOpenDialog = (room?: Room) => {
    if (room) {
      setCurrentRoom(room);
      setEditMode(true);
    } else {
      setCurrentRoom({ is_available: "true" }); // default for add
      setEditMode(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentRoom({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRoom({ ...currentRoom, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = "https://6825dd44397e48c91313eb90.mockapi.io/user/rooms";
    try {
      const res = await fetch(editMode ? `${url}/${currentRoom.id}` : url, {
        method: editMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentRoom),
      });
      if (res.ok) {
        fetchRooms();
        handleCloseDialog();
      }
    } catch (err) {
      console.error("Lỗi submit:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Bạn có chắc muốn xóa phòng này?");
    if (!confirmed) return;
    try {
      const res = await fetch(`https://6825dd44397e48c91313eb90.mockapi.io/user/rooms/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchRooms();
      }
    } catch (err) {
      console.error("Lỗi delete:", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Quản lý phòng
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => handleOpenDialog()}
      >
        Thêm phòng
      </Button>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên phòng</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="center">Tình trạng</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <Avatar variant="rounded" src={room.image_url} sx={{ width: 60, height: 60 }} />
                </TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{Number(room.price).toLocaleString()} VND</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: room.is_available === "true" ? green[500] : red[500],
                      ":hover": { backgroundColor: room.is_available === "true" ? green[700] : red[700] },
                    }}
                  >
                    {room.is_available === "true" ? "Trống" : "Đã có người"}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <IconButton color="primary" onClick={() => handleOpenDialog(room)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(room.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? "Chỉnh sửa phòng" : "Thêm phòng mới"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Tên phòng"
            name="name"
            value={currentRoom.name || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Loại"
            name="type"
            value={currentRoom.type || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Giá"
            name="price"
            type="number"
            value={currentRoom.price || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mô tả"
            name="description"
            value={currentRoom.description || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ảnh (URL)"
            name="image_url"
            value={currentRoom.image_url || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Tình trạng"
            name="is_available"
            value={currentRoom.is_available || "true"}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="true">Trống</MenuItem>
            <MenuItem value="false">Đã có người</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Lưu thay đổi" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rooms;
