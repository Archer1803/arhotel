import { Typography, Box , Link as MuiLink} from "@mui/material";

export default function RulesPage() {
  return (
    <Box>
      {/* Banner hình ảnh */}
       <MuiLink href="/home" underline="none">
        <Box
          sx={{
            width: "100%",
            height: "33vh",
            backgroundImage: 'url("https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/09/nhung-trai-nghiem-chi-co-o-khach-san-5-sao-1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            mb: 4,
            cursor: "pointer",
          }}
        />
      </MuiLink>
      {/* Tiêu đề trang */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Nội quy khách sạn AR Hotel
      </Typography>

      {/* Nội dung nội quy */}
      <Box sx={{ pl: 2 }}>
        <Typography paragraph>1. Thời gian nhận phòng: từ 14:00 | Trả phòng: trước 12:00.</Typography>
        <Typography paragraph>2. Vui lòng mang theo CMND/CCCD/hộ chiếu gốc khi nhận phòng để đối chiếu thông tin.</Typography>
        <Typography paragraph>3. Không hút thuốc trong phòng – quý khách vui lòng sử dụng khu vực dành riêng cho hút thuốc.</Typography>
        <Typography paragraph>4. Không mang vật nuôi vào trong khuôn viên khách sạn (trừ khi có thỏa thuận trước).</Typography>
        <Typography paragraph>5. Không gây ồn ào hoặc mở nhạc lớn sau 22:00 để đảm bảo không gian nghỉ ngơi chung.</Typography>
        <Typography paragraph>6. Tự bảo quản tài sản cá nhân – khách sạn không chịu trách nhiệm với tài sản thất lạc nếu không gửi tại quầy lễ tân.</Typography>
        <Typography paragraph>7. Không sử dụng chất cấm, chất cháy nổ hoặc hành vi vi phạm pháp luật trong khuôn viên khách sạn.</Typography>
        <Typography paragraph>8. Mọi hư hỏng do khách hàng gây ra sẽ được khách sạn tính phí theo mức thiệt hại thực tế.</Typography>
        <Typography paragraph>9. Vui lòng báo lễ tân nếu có khách đến thăm – khách qua đêm phải đăng ký theo quy định.</Typography>
        <Typography paragraph>10. Tuân thủ hướng dẫn của nhân viên khách sạn trong các tình huống khẩn cấp như cháy nổ, sơ tán, v.v.</Typography>
      </Box>
    </Box>
  );
}
