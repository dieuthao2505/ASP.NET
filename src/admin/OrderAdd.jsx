import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển hướng
import Admin from './Admin';

function OrderAdd() {
  const [orderData, setOrderData] = useState({
    userId: '',
    totalAmount: '',
    orderDate: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://localhost:7161/api/Order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.text())  // Chuyển từ res.json() sang res.text() để xử lý chuỗi lỗi
      .then((text) => {
        console.log('Response Text:', text);  // In ra phản hồi từ server
        try {
          const data = JSON.parse(text);  // Thử parse chuỗi JSON nếu có thể
          alert('Đơn hàng đã được thêm thành công');
          navigate('/admin/order'); // Chuyển về trang danh sách đơn hàng
        } catch (e) {
          console.error('Không thể parse JSON:', e);
          // Hiển thị thông báo lỗi chi tiết
          alert('Lỗi từ server: ' + text);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi thêm đơn hàng:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      });
  };

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Thêm Đơn Hàng</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User ID: </label>
            <input
              type="text"
              name="userId"
              value={orderData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tổng Tiền: </label>
            <input
              type="number"
              name="totalAmount"
              value={orderData.totalAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Ngày Đặt: </label>
            <input
              type="date"
              name="orderDate"
              value={orderData.orderDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Thêm Đơn Hàng</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  div: {
    marginLeft: '430px',
    marginTop: '-41%',
  },
};

export default OrderAdd;
