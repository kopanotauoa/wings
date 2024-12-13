import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the logout function passed as a prop
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
        <nav className='navbar-container'>
            {isLoggedIn ? (
                <>
                    {/* Links for logged-in users */}
                    <Link to="/" className='manage'>Home</Link>
                    <Link to="/profile" className='manage'>User Profile</Link> {/* Updated link */}
                    <Link to="/products" className='manage'>Product Management</Link>
                    <Link to="/stock" className='manage'>Stock Management</Link>
                    <button onClick={handleLogout} className='logout-button'>Logout</button>
                </>
            ) : (
                <>
                    {/* Links for non-logged-in users */}
                    <Link to="/login" className='lo'>Login</Link>
                    <Link to="/register" className='lo'>Register</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
