import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { useNavigate } from 'react-router-dom';

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('https://localhost:7161/api/Order')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Lỗi khi fetch đơn hàng:', error));
  }, []);
  const handleDelete = (id) => {
    // Xác nhận xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      fetch(`https://localhost:7161/api/Order/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            alert('Đơn hàng đã được xóa');
            setOrders(orders.filter((order) => order.id !== id)); // Cập nhật lại danh sách đơn hàng
          } else {
            alert('Có lỗi xảy ra khi xóa đơn hàng');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi xóa đơn hàng:', error);
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        });
    }
  };

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Quản lý đơn hàng</h2>
        <div style={{ display: 'flex' }}>
          <table style={{ width: '90%', height: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User Name</th>
                <th style={styles.th}>Ngày Đặt</th>
                <th style={styles.th}>Tổng tiền</th>
                <th style={styles.th}>Số lượng sản phẩm</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{order.user?.name || 'Không có'}</td>
                  <td style={styles.td}>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{order.totalAmount?.toLocaleString()}₫</td>
                  <td style={styles.td}>{order.orderDetails?.length || 0}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.iconBox, backgroundColor: '#2980b9' }} title="Thêm" onClick={() => navigate('/admin/orderadd')}>➕</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#27ae60' }} title="Sửa" onClick={() => navigate(`/admin/orderedit/${order.id}`)}>✏️</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#c0392b' }} title="Xóa" onClick={() => handleDelete(order.id)}>🗑️</span>
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
    color: 'white',
  },
};

export default OrderAdmin;
