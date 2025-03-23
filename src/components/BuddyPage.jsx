import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profilepicture from '../assets/profilepicture.png'; // Ensure this path is correct

const BuddyPage = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch("https://flatscanner.in/api/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.status === 302) {
                localStorage.removeItem("userId");
                navigate("/"); 
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Something went wrong on our side. Please try again.");
        }
    };

    const profile = {
        name: "Alex Johnson",
        age: 28,
        occupation: "Software Developer",
        Buddy: "Single or Double wanted buddy ups* Welcome",
        photo: profilepicture, // Use the imported profile picture
        description: "Hi, I'm Alex! I'm a software developer working remotely for a tech startup. I'm clean, quiet, and respectful of shared spaces. I enjoy cooking, hiking on weekends, and playing guitar (with headphones, of course). Looking for a place with like-minded professionals.Hey! I am a 37-year-old professional looking for a room in the UK by the end of March or the beginning of April. After living in the UK for eight years, I have spent the last three months abroad, but I am now looking to move back.",
        budget: "₹12,000 - ₹15,000 per month",
        availability: "Available from April 1st, 2025",
        Minimum: "Minimum Term: 3 months",
        Maximum: "Maximum Term: None",
        location: "Looking in Bellandur, Bengaluru.",
        Pincode: " Pincode: 560103",
        amenities: [
            "Private bathroom",
            "High-speed internet",
            "Laundry on premises",
            "Kitchen access",
            "Parking space (if possible)"
        ],
        preferences: [
            "Non-smoking household",
            "LGBTQ+ friendly",
            "Pet-friendly (I don't have pets but love animals)",
            "Professionals or grad students",
            "Moderately social household - occasional shared meals ok"
        ]
    };

    return (
        <div className="white-background">
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Flatscanner</h1>
                </div>
                <div className="navbar-right">
                    <Link to="/home" className="navbar-link">Home</Link>
                    <button onClick={handleLogout} className="navbar-button">Logout</button>
                </div>
            </nav>

            <div className="app-container">
                <main className="main-content">
                    <div className="profile-card">
                        <div className="profile-layout">
                            {/* Profile Photo Section */}
                            <div className="photo-section">
                                <div className="photo-container">
                                    <img 
                                        src={profile.photo} 
                                        alt={`Photo of ${profile.name}`} 
                                        className="profile-photo"
                                    />
                                    <div className="name-container">
                                    <h2 className="profile-name">{profile.name}</h2>
                                    <span className="profile-badge">
                                       <p> {profile.age}, {profile.occupation},</p>
                                       <p>{profile.Buddy}</p> 
                                    </span>
                                </div>
                                </div>
                            </div>
                            
                            {/* Profile Info Section */}
                            <div className="info-section">
                                <div className="about-section">
                                    <h3 className="section-title">About Me</h3>
                                    <p className="section-text">{profile.description}</p>
                                </div>
                                
                                <div className="details-grid">
                                    <div className="details-column">
                                        <div className="detail-item">
                                            <h3 className="section-title">Budget</h3>
                                            <p className="budget-tag">{profile.budget}</p>
                                        </div>
                                        
                                        <div className="detail-item">
                                            <h3 className="section-title">Availability</h3>
                                            <p className="section-text">{profile.availability}</p>
                                            <p className="section-text">{profile.Minimum}</p>
                                            <p className="section-text">{profile.Maximum}</p>
                                        </div>
                                        
                                        <div className="detail-item">
                                            <h3 className="section-title">Preferred Location</h3>
                                            <p className="section-text">{profile.location}</p>
                                            <p className="section-text">{profile.Pincode}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="details-column">
                                        <div className="detail-item">
                                            <h3 className="section-title">Required Amenities</h3>
                                            <ul className="feature-list">
                                                {profile.amenities.map((amenity, index) => (
                                                    <li key={index} className="feature-item">
                                                        <span className="check-icon blue">✓</span>
                                                        {amenity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="detail-item">
                                            <h3 className="section-title">Household Preferences</h3>
                                            <ul className="feature-list">
                                                {profile.preferences.map((preference, index) => (
                                                    <li key={index} className="feature-item">
                                                        <span className="check-icon purple">✓</span>
                                                        {preference}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
                <footer className="footer">
                    <p>&copy; 2025 Flatscanner. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default BuddyPage;