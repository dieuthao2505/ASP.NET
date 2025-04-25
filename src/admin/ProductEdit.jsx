import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductEdit() {
  const [product, setProduct] = useState({
    id: '',
    categoryId: '',
    price: '',
    name: '',
    image: '',
    description: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();  // Lấy id từ URL

  useEffect(() => {
    // Lấy thông tin sản phẩm từ API
    fetch(`https://localhost:7161/api/Product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Lỗi khi lấy thông tin sản phẩm:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7161/api/Product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Cập nhật thất bại');
      }
      // Vì backend trả NoContent (204) nên không cần .json()
      alert('Sản phẩm đã được cập nhật!');
      navigate('/admin/products');  // Quay lại trang quản lý sản phẩm
    })
    .catch((error) => console.error('Lỗi khi cập nhật sản phẩm:', error));
  };

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Category ID:
          <input type="number" name="categoryId" value={product.categoryId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default ProductEdit;
