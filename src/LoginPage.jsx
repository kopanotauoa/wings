import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the LoginForm component
import './Login.css'; // Import any styles if needed

function LoginPage() {
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <LoginForm />
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}

export default LoginPage;
