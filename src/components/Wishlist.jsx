import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Header from './Header';
import Menu from './Menu';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi yêu thích không?');
    if (confirmDelete) {
      const updatedWishlist = wishlist.filter(product => product.id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const handleBuyNow = (productId) => {
    alert(`Mua ngay sản phẩm có ID: ${productId}`);
  };

  return (
    <div>
      <Header />
      <Menu />
      <h2 style={styles.h2}>Danh sách sản phẩm yêu thích của bạn</h2>
      <div style={styles.container}>
        {wishlist.length === 0 ? (
          <p style={styles.empty}>Chưa có sản phẩm yêu thích nào.</p>
        ) : (
          wishlist.map(product => (
            <div key={product.id} style={styles.card}>
              <img
                src={`https://localhost:7161/api/Product/${product.id}/image`}
                alt={product.description}
                style={styles.image}
              />
              <h3 style={styles.title}>{product.name}</h3>
              <p style={styles.price}>
                {product.price.toLocaleString()}đ
              </p>
              <div style={styles.buttonGroup}>
                <button
                  style={styles.buyButton}
                  onClick={() => handleBuyNow(product.id)}
                >
                  Mua ngay
                </button>
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  h2: {
    position: 'relative',
    left: '100px',
    top: '20px',
    fontSize: '24px',
    marginBottom: '40px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '20px',
  },
  card: {
    position: 'relative',
    left: '90px',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  price: {
    color: 'red',
    fontSize: '18px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  buyButton: {
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    padding: '10px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '48%',
  },
  removeButton: {
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    padding: '10px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '48%',
  },
  empty: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '50px',
    color: '#777',
  },
};

export default Wishlist;
