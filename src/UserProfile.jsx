import React, { useState } from 'react';
import './UserProfile.css';
import { auth, db } from './firebaseConfig'; // Import Firebase auth and db
import { updateProfile } from 'firebase/auth'; // To update the user's profile
import { doc, updateDoc } from 'firebase/firestore'; // To update user data in Firestore

const UserProfile = ({ user }) => {
    // State to hold editable user fields
    const [editableUser, setEditableUser] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email,
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({ ...editableUser, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if password and confirm password match
        if (editableUser.password !== editableUser.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            // Update user profile in Firebase Authentication (email, password)
            if (editableUser.password) {
                // Update password if provided
                await updateProfile(auth.currentUser, {
                    displayName: `${editableUser.firstName} ${editableUser.lastName}`,
                });
                
                // Optionally, update email if changed
                await auth.currentUser.updateEmail(editableUser.email);
                await auth.currentUser.updatePassword(editableUser.password);
            } else {
                // If no password update, just update name
                await updateProfile(auth.currentUser, {
                    displayName: `${editableUser.firstName} ${editableUser.lastName}`,
                });
            }

            // Update user data in Firestore (if using Firestore to store extra user data)
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, {
                firstName: editableUser.firstName,
                lastName: editableUser.lastName,
                email: editableUser.email,
            });

            setSuccess("Profile updated successfully!");

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
                <p>Welcome, {user.firstName}!</p>
            </div>
            <form className="profile-info" onSubmit={handleSubmit}>
                <div className="profile-item">
                    <label htmlFor="firstName">
                        <strong>First Name:</strong>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={editableUser.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="input-field"
                            required
                        />
                    </label>
                </div>
                <div className="profile-item">
                    <label htmlFor="lastName">
                        <strong>Last Name:</strong>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={editableUser.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="input-field"
                            required
                        />
                    </label>
                </div>
                <div className="profile-item">
                    <label htmlFor="email">
                        <strong>Email:</strong>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editableUser.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="input-field"
                            required
                        />
                    </label>
                </div>
                <div className="profile-item">
                    <label htmlFor="password">
                        <strong>Password:</strong>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={editableUser.password}
                            onChange={handleChange}
                            placeholder="Enter a new password"
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="profile-item">
                    <label htmlFor="confirmPassword">
                        <strong>Confirm Password:</strong>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={editableUser.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="input-field"
                        />
                    </label>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="profile-actions">
                    <button type="submit" className="save-button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
