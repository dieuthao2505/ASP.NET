import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; 

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Liên hệ với <span style={{ color: '#FF9933' }}>TSP Style</span>
        </h1>
        <p style={styles.subtitle}>
          Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy gửi tin nhắn hoặc đến trực tiếp văn phòng.
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>📍</span>
            <p>123 Đường ABC, Quận 1, TP.HCM</p>
          </div>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>⏰</span>
            <p>Thứ 2 - Thứ 7: 08:00 - 18:00</p>
          </div>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>📞</span>
            <p>0123 456 789</p>
          </div>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>✉️</span>
            <p>contact@tspstyle.vn</p>
          </div>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>🌐</span>
            <p>www.tspstyle.vn</p>
          </div>
          <div style={styles.infoBlock}>
            <span style={styles.icon}>📘</span>
            <p>Facebook: fb.com/tspstyle</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Tên của bạn"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email của bạn"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung tin nhắn"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>Gửi tin nhắn</button>
        </form>
      </div>

      <div style={styles.mapWrapper}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.135232471464!2d106.67822041524113!3d10.800964692284576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292e3a24fd8b%3A0x3b404f36cb1f5de4!2zMjcgxJAuIE5ndXnhu4VuIFBow7osIFBoxrDhu51uZyA3LCBCw6xjaCBUw6JuLCBUaOG7pyBDaMOidSwgVMOibiBI4buTIENow60!5e0!3m2!1svi!2s!4v1680432366147!5m2!1svi!2s"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '60px 20px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '40px',
  },
  left: {
    flex: '1 1 350px',
    maxWidth: '450px',
    position: 'relative',
    left: '200px',
  },
  form: {
    flex: '1 1 350px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    position: 'relative',
    left: '-200px',
  },
  infoBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    color: '#333',
    fontSize: '16px',
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '120px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  mapWrapper: {
    width: '90%',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    left: '100px',
  },
};

export default Contact;
