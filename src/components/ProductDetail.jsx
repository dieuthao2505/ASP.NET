import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7161/api/Product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error('Lỗi load chi tiết sản phẩm:', err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.h1}>Chi tiết sản phẩm</h1>
      <div style={styles.card}>
        <div style={styles.productContainer}>
          <div style={styles.imageContainer}>
            <img
              src={`https://localhost:7161/api/Product/${id}/image`}
              alt={product.description}
              style={styles.image}
            />
          </div>
          <div style={styles.infoContainer}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              Giá: {product.price.toLocaleString()}đ
            </p>
            <div style={styles.buttonGroup}>
              <button style={styles.buyButton}>Mua ngay</button>
              <button style={styles.favoriteButton}>Yêu thích</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  h1:{
    position: 'relative',  // Để có thể di chuyển vị trí của h1 so với phần tử chứa
    left: '-300px',
    fontSize: '34px',
  },
  card: {
    width: '800px',
    padding: '30px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  imageContainer: {
    width: '300px',
    height: '300px',
    border: '1px solid #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoContainer: {
    flex: 1,
    fontSize: '18px',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px',
  },
  buyButton: {
    padding: '10px 20px',
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  favoriteButton: {
    padding: '10px 20px',
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ProductDetail;
