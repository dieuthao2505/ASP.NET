import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryEdit() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    id: '',
    name: '',
    image: '',
    description: ''
  });

  // Fetch dữ liệu category hiện tại
  useEffect(() => {
    fetch(`https://localhost:7161/api/Category/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Không tìm thấy category');
        }
        return res.json();
      })
      .then((data) => setCategory(data))
      .catch((error) => console.error('Lỗi khi lấy category:', error));
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7161/api/Category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    .then((res) => {
      if (res.ok) {
        alert('Cập nhật danh mục thành công!');
        navigate('/admin/categoryadmin'); // Quay về trang quản lý danh mục
      } else {
        alert('Cập nhật thất bại!');
      }
    })
    .catch((error) => console.error('Lỗi khi cập nhật category:', error));
  };

  return (
    <div style={{ marginLeft: '400px', marginTop: '50px' }}>
      <h2>Sửa Danh Mục</h2>
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
        <button type="submit" style={{ marginTop: '20px' }}>Cập nhật</button>
      </form>
    </div>
  );
}

export default CategoryEdit;
