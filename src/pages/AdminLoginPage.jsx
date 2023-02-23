import React, { useState } from 'react';

function AdminLoginPage({ handleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="admin-login-page">
      <h2>Admin Login</h2>
      <form>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSignIn(email, password);
          }}
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

export default AdminLoginPage;