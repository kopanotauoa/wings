import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm'; // Import the RegisterForm component
import './Register.css'; // Import any styles if needed

function RegisterPage() {
  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <RegisterForm />
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default RegisterPage;