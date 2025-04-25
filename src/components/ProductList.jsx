import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 
import Header from './Header';
import Menu from './Menu';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // 👈 thêm navigate

  const productsPerPage = 8;

  useEffect(() => {
    fetch('https://localhost:7161/api/Product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Lỗi load sản phẩm:', err));
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/order/${productId}`); // 👈 chuyển trang mua hàng
  };
  const handleAddToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Kiểm tra nếu sản phẩm chưa có trong wishlist thì mới thêm
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Đã thêm vào danh sách yêu thích!');
    } else {
      alert('Sản phẩm đã có trong danh sách yêu thích!');
    }
  };
  
  return (
    <div>
        {/* <Header />
        <Menu /> */}
    <div style={styles.containers}>
      <h2 style={styles.h2}>Danh sách sản phẩm</h2>
      <div style={styles.container}>
        {currentProducts.map(product => (
          <div key={product.id} style={styles.card}>
            <Link to={`/productdetail/${product.id}`} style={styles.link}>
            <img
              src={`https://localhost:7161/api/Product/${product.id}/image`}
              alt={product.description}
              style={styles.image}
            />
            <h3 style={styles.title}>{product.name}</h3>
            <p style={styles.price}>
              <span style={styles.oldPrice}>
                {(product.price * 1.2).toLocaleString()}đ
              </span>
              &nbsp; {product.price.toLocaleString()}đ
            </p>
            </Link>
            <div style={styles.buttonGroup}>
              <HoverButton onClick={() => handleBuyNow(product.id)}> Mua hàng </HoverButton>
              <HoverButton onClick={() => handleAddToWishlist(product)}> Yêu thích </HoverButton>

            </div>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <HoverPageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </HoverPageButton>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} / {totalPages}
        </span>
        <HoverPageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </HoverPageButton>
        </div>
      </div>
    </div>
  );
}

// Component button hover riêng
function HoverButton({ children, ...props }) {  // 👈 thêm ...props
  const [hovered, setHovered] = useState(false);

  return (
    <button
      {...props}
      style={{
        ...styles.button,
        backgroundColor: hovered ? '#e67300' : '#FF9933',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function HoverPageButton({ children, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.pageButton,
        backgroundColor: disabled ? '#aaa' : hovered ? '#a00020' : '#d10024',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    padding: '20px',
    width: '90%'
  },
  containers: {
    position: 'relative',
    left: '70px',
  },
  h2: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  card: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    marginBottom: '8px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '-15px',
    height: '40px',
    overflow: 'hidden',
  },
  price: {
    color: 'red',
    fontSize: '20px',
    marginBottom: '8px',
  },
  oldPrice: {
    textDecoration: 'line-through',
    color: '#999',
    fontSize: '12px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    padding: '8px 40px',
    borderRadius: '20px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  pageButton: {
    padding: '6px 10px',
    margin: '0 5px',
    backgroundColor: '#d10024',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  }
};

export default ProductList;
