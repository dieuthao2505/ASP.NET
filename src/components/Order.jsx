import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Thêm state cho thông tin người đặt
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch(`https://localhost:7161/api/Product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Lỗi tải sản phẩm:', err));
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const handlePlaceOrder = async () => {
    if (!product || !customerName || !phoneNumber || !address) {
      alert('Vui lòng nhập đầy đủ thông tin người đặt!');
      return;
    }

    const order = {
      userId: 1, // 🧡 sau này lấy userId thật
      totalAmount: product.price * quantity,
      orderDetails: [
        {
          productId: product.id,
          quantity: quantity,
          price: product.price
        }
      ],
      // 👇 Gửi kèm thông tin người đặt (bạn có thể cần sửa thêm backend nếu cần lưu)
      customerName: customerName,
      phoneNumber: phoneNumber,
      address: address
    };

    try {
      const response = await fetch('https://localhost:7161/api/Order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (response.ok) {
        alert('Đặt hàng thành công!');
        navigate('/');
      } else {
        alert('Đặt hàng thất bại!');
      }
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
    }
  };

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={styles.container}>
      <h2>Trang Đặt Hàng</h2>
      <div style={styles.card}>
        <img
          src={`https://localhost:7161/api/Product/${product.id}/image`}
          alt={product.name}
          style={styles.image}
        />
        <h3>{product.name}</h3>
        <p style={styles.price}>{product.price.toLocaleString()} đ</p>
        <div style={styles.inputGroup}>
          <label>Số lượng:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            style={styles.input}
          />
        </div>

        <hr />
        <h4>Thông tin người đặt:</h4>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Họ tên"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={styles.textInput}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.textInput}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.textInput}
          />
        </div>

        <p><strong>Tổng cộng:</strong> {(product.price * quantity).toLocaleString()} đ</p>
        <button onClick={handlePlaceOrder} style={styles.button}>
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
  },
  card: {
    display: 'inline-block',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '10px',
    backgroundColor: '#fff',
    width: '400px',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  price: {
    color: 'red',
    fontSize: '22px',
    margin: '10px 0',
  },
  inputGroup: {
    margin: '10px 10px',
  },
  input: {
    marginLeft: '10px',
    width: '60px',
  },
  textInput: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '20px',
    padding: '10px 30px',
    backgroundColor: '#FF9933',
    border: 'none',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default Order;
