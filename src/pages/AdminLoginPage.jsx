import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/AdminLoginPage.css';

function AdminLoginPage({ handleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <main className="admin-login-page">
      <div>
        <h2>Admin Login</h2>
        <form>
          <label htmlFor="email">
            <p>Email</p>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button
            className="sign-in-btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSignIn(email, password);
              navigate('/', { replace: true });
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLoginPage;
