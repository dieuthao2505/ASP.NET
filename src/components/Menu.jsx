import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

function Menu() {
  const [active, setActive] = useState('Trang chủ');

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <ul style={styles.menu}>
          {['Trang chủ', 'Sản phẩm', 'Chi tiết sản phẩm', 'Liên hệ', 'Tin tức'].map((item) => (
            
            <li key={item} style={styles.menuItem}>
              <Link
                to={
                  item === 'Trang chủ' ? '/' :
                  item === 'Sản phẩm' ? '/productlist' :
                  item === 'Liên hệ' ? '/contact' :
                   '#'} // Đổi link cho mục "Sản phẩm"
                onClick={() => handleClick(item)}
                style={{
                  ...styles.menuLink,
                  color: active === item ? '#FF9933' : '#333',
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    marginBottom: '10px',
  },
  nav: {
    padding: '5px 20px',
  },
  menu: {
    display: 'flex',
    listStyle: 'none',
    position: 'relative',
    left: '140px',
    margin: 0,
    padding: 0,
    gap: '50px',
  },
  menuItem: {
    cursor: 'pointer',
  },
  menuLink: {
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
};

export default Menu;
