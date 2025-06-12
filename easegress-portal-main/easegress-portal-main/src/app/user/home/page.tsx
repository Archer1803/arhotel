import { Box, Typography, Grid } from "@mui/material"

export default function HomePage() {
  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          height: "33vh",
          width: "100%",
          overflow: "hidden",
          mb: 4,
        }}
      >
        <img
          src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/09/nhung-trai-nghiem-chi-co-o-khach-san-5-sao-1.jpg"
          alt="Khách sạn"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Section 1: Text trái - Ảnh phải */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Về Khách sạn AR Hotel
          </Typography>
          <Typography>
            AR Hotel – Chạm đến sự tinh tế trong từng khoảnh khắc lưu trú.
Tọa lạc tại vị trí đắc địa, AR Hotel là điểm dừng chân lý tưởng dành cho du khách tìm kiếm sự kết hợp hoàn hảo giữa hiện đại và thư giãn. Với kiến trúc thanh lịch, đội ngũ nhân viên thân thiện và dịch vụ chuyên nghiệp, AR Hotel tự hào mang đến trải nghiệm lưu trú khác biệt – nơi bạn không chỉ nghỉ lại, mà còn thực sự “sống chậm” và tận hưởng.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://nhatrang-tourist.com/image/cache/catalog/Team%20building/%C4%91%E1%BA%B7t%20ph%C3%B2ng/luu-y-khi-dat-phong-khach-san%20(8)-1400x875.png"
            alt="Hình ảnh khách sạn"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
      </Grid>

      {/* Section 2: Ảnh trái - Text phải */}
      <Grid container spacing={4} alignItems="center" sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Grid item xs={12} md={6}>
          <img
            src="https://content.r9cdn.net/himg/fc/ab/4a/expedia_group-399971-324e7d-323887.jpg"
            alt="Phòng nghỉ"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Phòng nghỉ & Dịch vụ
          </Typography>
          <Typography>
            Không gian nghỉ ngơi yên tĩnh – Tiện nghi đầy đủ – Thiết kế đậm chất thẩm mỹ.
AR Hotel cung cấp đa dạng các hạng phòng: từ phòng Superior hiện đại, Deluxe ấm cúng đến Suite cao cấp với tầm nhìn thành phố tuyệt đẹp. Mỗi phòng được trang bị tiện nghi đạt chuẩn 4 sao: điều hòa, minibar, truyền hình cáp, wifi tốc độ cao và dịch vụ dọn phòng hằng ngày.
          </Typography>
        </Grid>
      </Grid>
        {/* Section 1: Text trái - Ảnh phải */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
           Dịch vụ đưa đón sân bay
          </Typography>
          <Typography>
          An tâm từ lúc hạ cánh – đến khi về lại.
AR Hotel cung cấp dịch vụ đưa đón sân bay chuyên nghiệp dành cho khách lưu trú. Xe đưa đón đời mới, lái xe lịch sự, đúng giờ, đảm bảo bạn có một hành trình êm ái và thuận tiện, kể cả khi đến muộn hay khởi hành sớm.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://lasiestaresorts.com/wp-content/uploads/2022/09/hanoi-are-service-in-air-port_1.jpg"
            alt="Hình ảnh khách sạn"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
      </Grid>

      {/* Section 2: Ảnh trái - Text phải */}
      <Grid container spacing={4} alignItems="center" sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Grid item xs={12} md={6}>
          <img
            src="https://static-4.happynest.vn/storage/uploads/2021/02/db34d1ea268b7a3e556ec817e480e2c6.jpg"
            alt="Phòng nghỉ"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
           Không gian nghỉ dưỡng & thư giãn
          </Typography>
          <Typography>
            Giữa lòng thành phố – vẫn có một nơi để “thở”.
AR Hotel được thiết kế như một ốc đảo yên tĩnh. Bạn có thể bắt đầu ngày mới tại khu sân vườn nhỏ với ly cà phê nóng, thư giãn với liệu trình massage nhẹ nhàng hoặc đơn giản là đọc sách trong không gian lounge ánh sáng tự nhiên.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
