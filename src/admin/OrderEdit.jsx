import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Dùng để lấy tham số và chuyển hướng
import Admin from './Admin';

function OrderEdit() {
  const { id } = useParams(); // Lấy ID từ URL
  const [orderData, setOrderData] = useState({
    userId: '',
    totalAmount: '',
    orderDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch đơn hàng cũ để sửa
    fetch(`https://localhost:7161/api/Order/${id}`)
      .then((res) => {
        if (!res.ok) {
          // Kiểm tra nếu phản hồi không hợp lệ (ví dụ 404, 500)
          throw new Error('Không thể lấy thông tin đơn hàng');
        }
        return res.json();
      })
      .then((data) => setOrderData(data))
      .catch((error) => {
        console.error('Lỗi khi fetch đơn hàng:', error);
        alert(error.message);  // Hiển thị thông báo lỗi cho người dùng
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7161/api/Order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) {
          // Kiểm tra phản hồi nếu có lỗi
          throw new Error('Lỗi khi sửa đơn hàng');
        }
        return res.json();
      })
      .then(() => {
        alert('Đơn hàng đã được sửa thành công');
        navigate('/admin/order'); // Chuyển về trang danh sách đơn hàng
      })
      .catch((error) => {
        console.error('Lỗi khi sửa đơn hàng:', error);
        alert(error.message);  // Hiển thị thông báo lỗi cho người dùng
      });
  };

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Sửa Đơn Hàng</h2>
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
          <button type="submit">Sửa Đơn Hàng</button>
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

export default OrderEdit;
