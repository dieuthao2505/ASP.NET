import React, { useState } from 'react';

function Footer() {
  const [isContactFormVisible, setContactFormVisible] = useState(false); // Kiểm tra form liên hệ
  const [email, setEmail] = useState(''); // Email người dùng nhập

  const handleContactClick = () => {
    setContactFormVisible(!isContactFormVisible); // Mở hoặc đóng form liên hệ
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      {/* Khung màu cam chứa thông tin footer */}
      <div style={styles.footerContainer}>
        {/* Tiêu đề Footer */}
        <div style={styles.footerTitle}>
          <h1>Footer TSP Style</h1>
          <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
        </div>

        {/* Các liên kết quan trọng */}
        <div style={styles.linksContainer}>
          <div style={styles.linkColumn}>
            <h3>Thông tin</h3>
            <ul>
              <li><a href="#" style={styles.link}>Về chúng tôi</a></li>
              <li><a href="#" style={styles.link}>Chính sách bảo mật</a></li>
              <li><a href="#" style={styles.link}>Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div style={styles.linkColumn}>
            <h3>Hỗ trợ</h3>
            <ul>
              <li><a href="#" style={styles.link}>Câu hỏi thường gặp</a></li>
              <li><a href="#" style={styles.link}>Gửi yêu cầu hỗ trợ</a></li>
              <li><a href="#" style={styles.link}>Chính sách đổi trả</a></li>
            </ul>
          </div>
          <div style={styles.linkColumn}>
            <h3>Liên kết</h3>
            <ul>
              <li><a href="#" style={styles.link}>Facebook</a></li>
              <li><a href="#" style={styles.link}>Instagram</a></li>
              <li><a href="#" style={styles.link}>Twitter</a></li>
              <li><a href="#" style={styles.link}>YouTube</a></li>
            </ul>
          </div>
          <div style={styles.linkColumn}>
            <h3>Liên hệ</h3>
            <button onClick={handleContactClick} style={styles.contactButton}>
              {isContactFormVisible ? 'Đóng Form Liên Hệ' : 'Mở Form Liên Hệ'}
            </button>
          </div>
        </div>

        {/* Form liên hệ */}
        {isContactFormVisible && (
          <div style={styles.contactForm}>
            <form>
              <h3>Liên hệ với chúng tôi</h3>
              <div style={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  required
                  style={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Cập nhật email
                />
              </div>
              <button type="button" style={styles.submitButton} onClick={() => alert('Yêu cầu đã được gửi!')}>
                Gửi yêu cầu
              </button>
            </form>
          </div>
        )}
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#FF9933', // Màu cam cho khung chứa thông tin footer
    padding: '1px',
    borderRadius: '8px',
    position: 'relative',
    top: '30px',
    left: '10px',
    
  },
  footerTitle: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    position: 'relative',
    top: '-10px',
    left: '50px',
  },
  linkColumn: {
    width: '23%',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
  },
  contactButton: {
    backgroundColor: '#fff',
    color: '#FF9933',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  contactForm: {
    backgroundColor: '#fff',
    padding: '20px',
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '30%',
    zIndex: '1000',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#FF9933',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Footer;
