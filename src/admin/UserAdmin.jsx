import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Admin from './Admin';

function UserAdmin() {
  const [users, setUsers] = useState([]);  // Sửa từ "products" thành "users"
  const [error, setError] = useState(null);  // Thêm biến lỗi để xử lý lỗi

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7161/api/User'); // URL của API để lấy danh sách người dùng
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu người dùng');
        }
        const data = await response.json();
        setUsers(data);  // Cập nhật danh sách người dùng vào state
      } catch (err) {
        setError(err.message);  // Cập nhật lỗi nếu có
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Quản lý người dùng</h2>
        {error && <div style={{ color: 'red' }}>Lỗi: {error}</div>}  {/* Hiển thị thông báo lỗi nếu có */}
        <div style={{ display: 'flex' }}>
          <table style={{ width: '90%', height: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.username}</td>  {/* Đảm bảo sử dụng đúng thuộc tính */}
                  <td style={styles.td}>{user.email}</td>  {/* Đảm bảo sử dụng đúng thuộc tính */}
                  <td style={styles.td}>
                    <span style={{ ...styles.iconBox, backgroundColor: '#3498db' }} title="Thêm">➕</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#52be80' }} title="Sửa">✏️</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#e74c3c' }} title="Xóa">🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  th: {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ccc',
    padding: '10px',
  },
  div: {
    marginLeft: '430px',
    marginTop: '-41%',
  },
  iconBox: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    textAlign: 'center',
    lineHeight: '30px',
    marginRight: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
};

export default UserAdmin;
