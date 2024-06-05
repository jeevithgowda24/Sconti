// src/components/LoginPage.js

import React, { useState } from 'react';
// import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login logic: replace this with your actual authentication logic
    if (username === 'admin' && password === 'password') {
      onLogin();
      // alert('Login Successfull')
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='loginPage'>
    <div className="login-container">
    <h1> Scontinental Technologies </h1>
      {/* <h2 className="login-header">Login</h2> */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
