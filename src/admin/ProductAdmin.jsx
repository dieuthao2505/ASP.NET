import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import { useNavigate } from 'react-router-dom';

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi dữ liệu thật từ API backend ASP.NET Core
    fetch('https://localhost:7161/api/Product')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Lỗi khi fetch sản phẩm:', error));
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/productadd'); // Điều hướng đến trang thêm sản phẩm
  };
  
  const handleEditProduct = (productId) => {
    navigate(`/admin/productedit/${productId}`); // Điều hướng đến trang sửa sản phẩm với ID sản phẩm
  };

  return (
    <div>
      <Admin />
      <div style={styles.div}>
        <h2>Quản lý sản phẩm</h2>
        <div style={{ display: 'flex' }}>
          <table style={{ width: '90%', height: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category ID</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={styles.td}>{product.id}</td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.categoryId}</td>
                  <td style={styles.td}>{product.price?.toLocaleString()}₫</td>
                  <td style={styles.td}>
                  <img src={`https://localhost:7161/api/Product/${product.id}/image`} alt="Product" width="80" />

                  </td>
                  <td style={styles.td}>{product.description}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.iconBox, backgroundColor: '#2980b9' }} title="Thêm" onClick={handleAddProduct}>➕</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#27ae60' }} title="Sửa" onClick={() => handleEditProduct(product.id)}>✏️</span>
                    <span style={{ ...styles.iconBox, backgroundColor: '#c0392b' }} title="Xóa">🗑️</span>
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

export default ProductAdmin;
