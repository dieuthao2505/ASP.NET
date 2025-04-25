import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Đảm bảo có Outlet

function Admin() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '20%',
        backgroundColor: '#87CEEB',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <h3 style={{ textAlign: 'center', fontSize: '30px', marginTop: '10px', color: '#0000CD'}}>Admin Shop</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li style={styles.li}>
            <Link to="/admin/products" style={styles.link}>Quản lý sản phẩm</Link> {/* Đảm bảo link đúng */}
          </li>
          <li style={styles.li}>
            <Link to="/admin/categories" style={styles.link}>Quản lý danh mục</Link>
          </li>
          <li style={styles.li}>
            <Link to="/admin/orders" style={styles.link}>Quản lý đơn hàng</Link>
          </li>
          <li style={styles.li}>
            <Link to="/admin/users" style={styles.link}>Quản lý người dùng</Link>
          </li>
          
        </ul>
      </div>

      {/* Nội dung chính */}
      <div style={{
        width: '80%',
        backgroundColor: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}>
        <Outlet /> {/* Nội dung sẽ hiển thị tại đây khi người dùng chọn mục */}
      </div>
    </div>
  );
}

const styles = {
  link: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'block',
  },
  li: {
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#add8e6'
  },
};

export default Admin;
