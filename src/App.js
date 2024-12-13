import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';
import ProductManagement from './ProductManagement';
import StockManagement from './StockManagement';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile'; // Import UserProfile
import NavBar from './Navbar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import RotatingMenu from './RotatingMenu'; 
import { auth } from './firebaseConfig';
import logo from './menuImages/logo.png'; 

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <header className="app-header">
                {/* Logo */}
                <div className="logo-container">
                    <img src={logo} alt="Wings Cafe Logo" className="logo" />
                </div>
                <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            </header>
            <div>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/products" /> : <LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={isLoggedIn ? <Navigate to="/products" /> : <RegisterPage />}
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/products"
                        element={isLoggedIn ? <ProductManagement /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/stock"
                        element={isLoggedIn ? <StockManagement /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/dashboard"
                        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={isLoggedIn ? <UserProfile user={currentUser} /> : <Navigate to="/login" />}
                    />

                    {/* Home Route */}
                    <Route
                        path="/"
                        element={
                            <div>
                                <h1 className='wings'>Hot Wings Cafe</h1>
                                <RotatingMenu />
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
