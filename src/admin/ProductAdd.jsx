import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom

function ProductAdd() {
  const navigate = useNavigate();  // Khởi tạo navigate
  const [product, setProduct] = useState({
    categoryId: '',
    price: '',
    image: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      image: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryId', product.categoryId);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('image', product.image);

    fetch('https://localhost:7161/api/Product', {
      method: 'POST',
      body: formData // Không cần set header 'Content-Type' khi sử dụng FormData
    })
    .then((res) => res.json())
    .then((data) => {
      alert('Sản phẩm đã được thêm!');
      navigate('/admin/products');  // Điều hướng về trang quản lý sản phẩm
    })
    .catch((error) => console.error('Lỗi khi thêm sản phẩm:', error));
  };

  return (
    <div style={styles.div}>
      <h2>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category ID:
          <input
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {/* <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </label> */}
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
}

const styles = {
  div: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
};

export default ProductAdd;
