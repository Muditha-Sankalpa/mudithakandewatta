import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/auth/login`, { 
    username, 
    password 
    });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  // Simple CSS styles as JS object
  const styles = {
    container: {
      maxWidth: '360px',
      margin: '80px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px 10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #bbb',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: '600',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      marginTop: '10px',
      fontSize: '14px',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.container} className="admin-login">
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
