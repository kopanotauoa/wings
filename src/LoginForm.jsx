import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import'./Login.css';

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false); // Toggles between login and reset mode

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset errors

    try {
      // Firebase login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (err) {
      // Firebase error handling
      if (err.code === 'auth/user-not-found') {
        setError('User not found. Please check your email or register.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message); // Handle other errors
      }
    }
  };

  // Handle forgot password functionality
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(''); // Reset errors

    try {
      // Send password reset email using Firebase Auth
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Display success message
    } catch (err) {
      // Firebase error handling
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message); // Handle other errors
      }
    }
  };

  return (
    <form onSubmit={isResettingPassword ? handleForgotPassword : handleLogin}>
      {/* Email Input */}
      <MDBInput
        className="mb-4"
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password Input (only shown if not in reset mode) */}
      {!isResettingPassword && (
        <MDBInput
          className="mb-4"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}

      {/* Forgot password and remember me checkbox */}
      <MDBRow className="mb-4">
        {!isResettingPassword && (
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox label="Remember me" />
          </MDBCol>
        )}
        <MDBCol>
          {isResettingPassword ? (
            <a
              href="#!"
              onClick={() => setIsResettingPassword(false)} // Switch back to login
            >
              Back to login
            </a>
          ) : (
            <a
              href="#!"
              onClick={() => setIsResettingPassword(true)} // Switch to reset password mode
            >
              Forgot password?
            </a>
          )}
        </MDBCol>
      </MDBRow>

      {/* Reset email sent and error messages */}
      {resetEmailSent && <p style={{ color: 'green' }}>Reset email sent! Check your inbox.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      {/* Submit Button */}
      <MDBBtn type="submit" className="mb-4" block>
        {isResettingPassword ? 'Send Reset Email' : 'Sign in'}
      </MDBBtn>

      {/* Register Link */}
      <div className="text-center">
        {!isResettingPassword && (
          <p>
            Not a member?{' '}
            <a href="#!" onClick={onSwitch}>
              Register
            </a>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
