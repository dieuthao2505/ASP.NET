import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { useNavigate } from 'react-router-dom';

function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ====== THÊM HÀM fetchCategories() ======
  const fetchCategories = () => {
    fetch('https://localhost:7161/api/Category')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Lỗi khi fetch danh mục:', error));
  };

  useEffect(() => {
    fetchCategories(); // Gọi hàm này lúc đầu tiên vào trang
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      fetch(`https://localhost:7161/api/Category/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            alert('Xóa thành công!');
            fetchCategories(); // Gọi lại để load danh sách mới
          } else {
            alert('Xóa thất bại!');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi xóa danh mục:', error);
        });
    }
  };

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Quản lý danh mục</h2>
        <div style={{ display: 'flex' }}>
          <table style={{ width: '90%', height: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                {/* <th style={styles.th}>Image</th> */}
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td style={styles.td}>{category.id}</td>
                  <td style={styles.td}>{category.name}</td>
                  {/* <td style={styles.td}>
                    <img src={category.image} alt="Category" width="80" />
                  </td> */}
                  <td style={styles.td}>{category.description}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.iconBox, backgroundColor: '#3498db' }} title="Thêm" onClick={() => navigate('/admin/categoryadd')}>➕</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#52be80' }} title="Sửa" onClick={() => navigate(`/admin/categoryedit/${category.id}`)}>✏️</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#e74c3c' }} title="Xóa" onClick={() => handleDelete(category.id)}>🗑️</span>
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

export default CategoryAdmin;
