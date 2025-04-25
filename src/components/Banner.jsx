import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; // Đừng quên import CSS của swiper

function Banner() {
  const bannerContainerStyle = {
    width: '100%',
    height: '100vh', // Chiều cao chiếm hết chiều cao của viewport
    overflow: 'hidden',
  };

  const bannerImageStyle = {
    width: '100%',
    height: '100%', // Đảm bảo ảnh chiếm toàn bộ chiều cao khung
    objectFit: 'cover', // Đảm bảo ảnh không bị méo và phủ đầy khung
  };

  return (
    <div style={bannerContainerStyle}>
      <Swiper
        spaceBetween={0} // Không có khoảng cách giữa các ảnh
        slidesPerView={1} // Chỉ hiển thị một ảnh mỗi lần
        loop={true} // Lặp lại vòng tròn
        autoplay={{ delay: 3000 }} // Tự động chuyển slide sau 3 giây
        pagination={{ clickable: true }} // Thêm nút phân trang (dots)
      >
        {/* Các slide chứa ảnh */}
        <SwiperSlide>
          <img
            src="https://thegioidohoa.com/wp-content/uploads/2015/10/thiet-ke-banner-an-tuong-cho-web-thoi-trang.jpeg"
            alt="Banner 1"
            style={bannerImageStyle}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.pikbest.com/origin/10/01/53/39epIkbEsTrNs.png!bw700"
            alt="Banner 2"
            style={bannerImageStyle}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://truyenthongdps.com/wp-content/uploads/2021/09/banner-5.png"
            alt="Banner 3"
            style={bannerImageStyle}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
