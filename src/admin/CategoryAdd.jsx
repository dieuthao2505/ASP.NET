import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryAdd() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://localhost:7161/api/Category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    .then((res) => {
      if (res.ok) {
        alert('Thêm danh mục thành công!');
        navigate('/admin/categoryadmin'); // Quay về trang quản lý
      } else {
        alert('Thêm danh mục thất bại!');
      }
    })
    .catch((error) => console.error('Lỗi khi thêm category:', error));
  };

  return (
    <div style={{ marginLeft: '400px', marginTop: '50px' }}>
      <h2>Thêm Danh Mục</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
          <label>Image URL:</label><br />
          <input
            type="text"
            name="image"
            value={category.image}
            onChange={handleChange}
            required
          />
        </div> */}
        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            required
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Thêm mới</button>
      </form>
    </div>
  );
}

export default CategoryAdd;
