import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false); // Kiểm tra form đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
  const [username, setUsername] = useState(''); // Tên đăng nhập
  const [password, setPassword] = useState(''); // Mật khẩu
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    navigate('/wishlist');
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Hiển thị hộp thoại xác nhận khi đăng xuất
      const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (confirmLogout) {
        setIsLoggedIn(false); // Đăng xuất nếu người dùng xác nhận
        alert('Đăng xuất thành công!');
      }
    } else {
      setLoginFormVisible(!isLoginFormVisible); // Mở form đăng nhập khi chưa đăng nhập
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload
  
    try {
      const response = await fetch('https://localhost:7161/api/User/login', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        // Nếu response không OK, ví dụ 401 Unauthorized
        const errorText = await response.text();
        throw new Error(errorText || 'Đăng nhập không thành công');
      }
  
      const data = await response.json(); // Nhận { Token: "..." }
      console.log('Token nhận được:', data.token);
  
      // Lưu token vào localStorage
      localStorage.setItem('token', data.token);
  
      alert('Đăng nhập thành công!');
      setIsLoggedIn(true);
      setLoginFormVisible(false);
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Đăng nhập thất bại: ' + error.message);
    }
  };
  
  return (
    <header className="bg-orange-400 w-full p-4">
      {/* Tiêu đề */}
      <div style={styles.div1}>
        <h1 style={styles.h1}>Chào mừng bạn đến với bộ sưu tập thu đông 2025</h1>
      </div>

      {/* Dòng dưới tiêu đề */}
      <div style={styles.divContainer}>
        <h2 style={styles.h2}>
          <span style={{ color: '#F000011' }}>TSP </span>
          <span style={{ color: '#FF9933' }}>Style</span>
        </h2>

        {/* Ô tìm kiếm */}
        <div style={styles.searchBox}>
          <input type="text" placeholder="Search ..." style={styles.input} />
          <button style={styles.searchButton}>🔍</button>
        </div>

        {/* Các nút chức năng */}
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handleFavoriteClick}>
            Yêu thích
          </button>
          <button style={styles.button} onClick={handleLoginClick}>
            {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'} {/* Hiển thị nút Đăng nhập/Đăng xuất */}
          </button>
        </div>
      </div>

      {/* Form đăng nhập */}
      {isLoginFormVisible && !isLoggedIn && (
        <div style={styles.loginForm}>
          <form onSubmit={handleLoginSubmit}>
            <h3>Đăng nhập</h3>
            <div style={styles.inputGroup}>
              <label htmlFor="username">Tên đăng nhập:</label>
              <input
                type="text"
                id="username"
                required
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Cập nhật tên đăng nhập
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                required
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật mật khẩu
              />
            </div>
            <button type="submit" style={styles.submitButton}>Đăng nhập</button>
            <button
              type="button"
              onClick={() => setLoginFormVisible(false)}
              style={styles.closeButton}
            >
              Đóng
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

// Các sửa đổi trong phần styles:
const styles = {
  div1: {
    border: '0px solid #ccc',
    backgroundColor: '#FF9933',
    height: '35px',
    padding: '10px',
  },
  h1: {
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '-16px',
    fontSize: '24px',
  },
  h2: {
    fontSize: '45px',
    position: 'relative',
    top: '-10px',
    left: '50px',
  },
  divContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '-10px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #FF9933',
    borderRadius: '9999px',
    overflow: 'hidden',
    width: '600px',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '8px',
    border: 'none',
    outline: 'none',
    height: '25px',
  },
  searchButton: {
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    height: '41px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: '#FF9933',
    color: '#fff',
    height: '40px',
    position: 'relative',
    right: '70px',
    border: 'none',
    borderRadius: '9999px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  loginForm: {
    backgroundColor: '#fff',
    position: 'fixed',  // Đặt form đăng nhập ở vị trí cố định trên màn hình
    top: '100px',  // Đảm bảo form nằm ở phía trên cùng
    left: '50%',
    transform: 'translateX(-50%)',  // Căn giữa form theo chiều ngang
    width: '30%',  // Đảm bảo form có độ rộng đầy đủ
    height: '60vh',  // Đảm bảo form có chiều cao đủ để phủ toàn bộ màn hình
    zIndex: '1000',  // Đặt z-index cao hơn để form đăng nhập hiển thị trên tất cả các phần khác
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Để form có bóng nhẹ, giúp dễ nhìn
    padding: '30px',
    overflowY: 'auto',  // Thêm cuộn dọc nếu form quá dài
  },
  inputGroup: {
    marginBottom: '15px', // Tăng khoảng cách giữa các input
  },
  submitButton: {
    backgroundColor: '#FF9933',
    color: '#fff',
    padding: '10px 20px', // Tăng kích thước của nút submit
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#ccc',
    color: '#000',
    padding: '10px 20px', // Tăng kích thước của nút đóng
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
  },
};

export default Header;
