import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import flatImage1 from '../assets/flatImage1.png';
import flatImage2 from '../assets/flatImage2.png';
import flatImage3 from '../assets/flatImage3.png';
import flatImage4 from '../assets/flatImage4.png';
import flatImage5 from '../assets/flatImage5.png';
import amenityImage1 from '../assets/amenityImage1.png'; // Add your amenity images
import amenityImage2 from '../assets/amenityImage2.png';
import amenityImage3 from '../assets/amenityImage3.png';
import amenityImage4 from '../assets/amenityImage4.png';

function FlatInfo() {
  const navigate = useNavigate();
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "School", name: "SCHOLARS HOME INTERNATIONAL SCHOOL" },
    { text: "Railway", name: "SCHOLARS HOME INTERNATIONAL SCHOOL" },
    { text: "park", name: "There is a beautiful park nearby" },
    // Add more testimonials as needed
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 302) {
        localStorage.removeItem("userId");
        sessionStorage.setItem("isLoggedOut", true);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Something went wrong on our side. Please try again.");
    }
  };

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flat-info">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Flatscanner</h1>
        </div>
        <div className="navbar-right">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/room-wanted-ad" className="navbar-link">Post room wanted ad</Link>
          <button onClick={handleLogout} className="navbar-button">Logout</button>
        </div>
      </nav>

      <header className="header">
        <ul className="header-list">
          <li className="header-item">Floor Plans</li>
          <li className="header-item">Policies And Fees</li>
          <li className="header-item">Amenities</li>
          <li className="header-item">Neighborhood</li>
          <li className="header-item">Property Highlights</li>
        </ul>
      </header>

      <div className="details-container">
        <div className='details'>
          <h3>Flat Details</h3>
          <p><strong>Price:</strong> 2 BHK Flat for Rent</p>
          <p><strong>Location:</strong> Land Craft Golflinks Apartments, Pandav Nagar, Ghaziabad</p>
          <p><strong>Amenities:</strong> Pool, Gym, Parking</p>
        </div>
        <div className='price'>
          <p><strong>Price:</strong> $1200/month</p>
        </div>
      </div>

      <section className="image-gallery">
        <div className="gallery-container">
          <img src={flatImage1} alt="Flat 1" className="gallery-image" />
          <img src={flatImage2} alt="Flat 2" className="gallery-image" />
          <img src={flatImage3} alt="Flat 3" className="gallery-image" />
          {showAllImages && (
            <>
              <img src={flatImage4} alt="Flat 4" className="gallery-image" />
              <img src={flatImage5} alt="Flat 5" className="gallery-image" />
            </>
          )}
        </div>
        <button onClick={toggleShowAllImages} className="show-more-button">
          {showAllImages ? "Show Less" : "Show More"}
        </button>
      </section>

      <div className='Properties-Highlights'>
        <h3>Properties-Highlights</h3>
        <div className='Property-content'>
          <p><span className="tick-mark">✔</span> Barbecue Area</p>
          <p><span className="tick-mark">✔</span> Close to Airport</p>
          <p><span className="tick-mark">✔</span> 24x7 Security</p>
          <p><span className="tick-mark">✔</span> Close to ATM</p>
          <p><span className="tick-mark">✔</span> SSD Hospital</p>
          <p><span className="tick-mark">✔</span> xyz School</p>
        </div>
      </div>

      <div className='Testimonials-container'>
        <h3>Property Location</h3>
        <p>Banglore Appartment </p>
        <div className='Testimonials'>
          <div className="testimonial-carousel">
            <button className="carousel-button left" onClick={handlePrevTestimonial}>❮</button>
            <div className="testimonial-card">
              <p>{testimonials[currentTestimonial].text}</p>
              <p><strong>{testimonials[currentTestimonial].name}</strong></p>
            </div>
            <button className="carousel-button right" onClick={handleNextTestimonial}>❯</button>
          </div>
        </div>
        <button className="view-more-button">View More in Map</button>
      </div>

      <div className='Amenities'>
        <h3>Amenities</h3>
        <p>Relax in your new home with these convenient amenities</p>
        <div className='amenities-images'>
          <img src={amenityImage1} alt="Amenity 1" className="amenity-image" />
          <img src={amenityImage2} alt="Amenity 2" className="amenity-image" />
          <img src={amenityImage3} alt="Amenity 3" className="amenity-image" />
          <img src={amenityImage4} alt="Amenity 4" className="amenity-image" />
        </div>
        <ul className="amenities-list">
          <li>Club House</li>
          <li>Garbage Disposal</li>
          <li>Pool</li>
          <li>Storage Space</li>
          <li>Controlled Access</li>
          <li>On-Site Laundry</li>
          <li>Refrigerator</li>
          <li>Stove</li>
          <li>Dishwasher</li>
          <li>Oven</li>
          <li>Shower</li>
        </ul>
      </div>

      <footer className="footer">
        
        <p>&copy; 2025 Flatscanner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FlatInfo;


