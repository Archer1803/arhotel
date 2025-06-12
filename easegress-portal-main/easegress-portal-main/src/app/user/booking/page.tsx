"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
} from "@mui/material";

type Room = {
  id: string;
  name: string;
  image_url: string;
  price: string;
};

export default function BookingPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("https://6825dd44397e48c91313eb90.mockapi.io/user/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Lỗi khi fetch phòng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Danh sách phòng
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => router.push(`/user/booking/${room.id}`)}
              >
                <CardMedia component="img" height="180" image={room.image_url} alt={room.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {room.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Giá: {parseInt(room.price).toLocaleString()} VND
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
