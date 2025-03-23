import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import BotImage from "../assets/bot.png";
import PinIcon from "../assets/pin.png";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/home.png";

function Home() {
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const [placeName, setPlaceName] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [flatTypeOption, setFlatTypeOption] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState(""); // State to store the user's email

  const places = {
    "BTM Layout": { nb: "BTM Layout", fmr: "BTM-Layout" },
    "Banashankari": { nb: "Banashankari", fmr: "Banashankari" },
    "Basavanagudi": { "nb": "Basavanagudi", "fmr": "Basavanagudi" },
    "Basaveshwar Nagar": { "nb": "Basaveshwar Nagar", "fmr": "Basaveshwar-Nagar" },
    "Bellandur": { "nb": "Bellandur", "fmr": "Bellandur" },
    "Bommanahalli": { "nb": "Bommanahalli", "fmr": "Bommanahalli" },
    "Brookefield": { "nb": "Brookefield", "fmr": "Brookefield" },
    "Cox Town": { "nb": "Cox Town", "fmr": "Cox-Town" },
    "Doddanekundi": { "nb": "Doddanekundi", "fmr": "Doddanekundi" },
    "Domlur": { "nb": "Domlur", "fmr": "Domlur" },
    "Ejipura": { "nb": "Ejipura", "fmr": "Ejipura" },
    "Electronic City": { "nb": "Electronic City", "fmr": "Electronic-City" },
    "Frazer Town": { "nb": "Frazer Town", "fmr": "Frazer-Town" },
    "HSR Layout": { "nb": "HSR Layout", "fmr": "HSR-Layout" },
    "Harlur Road": { "nb": "Harlur Road", "fmr": "Harlur" },
    "Hebbal": { "nb": "Hebbal", "fmr": "Hebbal" },
    "Hennur Road": { "nb": "Hennur Road", "fmr": "Hennur" },
    "Hoodi": { "nb": "Hoodi", "fmr": "Hoodi" },
    "Horamavu": { "nb": "Horamavu", "fmr": "Horamavu" },
    "Hulimavu": { "nb": "Hulimavu", "fmr": "Hulimavu" },
    "Indiranagar": { "nb": "Indiranagar", "fmr": "Indiranagar" },
    "JP Nagar": { "nb": "JP Nagar", "fmr": "JP Nagar" },
    "Jayanagar": { "nb": "Jayanagar", "fmr": "Jayanagar" },
    "KR Puram": { "nb": "KR Puram", "fmr": "Krishnarajapura" },
    "Kadubeesanahalli": { "nb": "Kadubeesanahalli", "fmr": "Kadubeesanahalli" },
    "Kadugodi": { "nb": "Kadugodi", "fmr": "Kadugodi" },
    "Kalyan Nagar": { "nb": "Kalyan Nagar", "fmr": "Kalyan-Nagar" },
    "Kammanahalli": { "nb": "Kammanahalli", "fmr": "Kammanahalli" },
    "Kodihalli": { "nb": "Kodihalli", "fmr": "Kodihalli" },
    "Koramangala": { "nb": "Koramangala", "fmr": "Koramangala" },
    "MG Road": { "nb": "MG Road", "fmr": "MG-Road" },
    "Mahadevapura": { "nb": "Mahadevapura", "fmr": "Mahadevapura" },
    "Malleshwaram": { "nb": "Malleshwaram", "fmr": "Malleshwaram" },
    "Marathahalli": { "nb": "Marathahalli", "fmr": "Marathahalli" },
    "Nagarbhavi": { "nb": "Nagarbhavi", "fmr": "Nagarbhavi" },
    "Nagasandra": { "nb": "Nagasandra", "fmr": "Nagasandra" },
    "Old Madras Road": { "nb": "Old Madras Road", "fmr": "Old Madras Road" },
    "RT Nagar": { "nb": "RT Nagar", "fmr": "RT-Nagar" },
    "Rajajinagar": { "nb": "Rajajinagar", "fmr": "Rajajinagar" },
    "Ramamurthy Nagar": { "nb": "Ramamurthy Nagar", "fmr": "Ramamurthy-Nagar" },
    "Richmond Town": { "nb": "Richmond Town", "fmr": "Richmond-Town" },
    "Sahakar Nagar": { "nb": "Sahakar Nagar", "fmr": "Sahakar Nagar" },
    "Sarjapur Road": { "nb": "Sarjapur Road", "fmr": "Sarjapur" },
    "Thanisandra": { "nb": "Thanisandra", "fmr": "Thanisandra" },
    "Uttarahalli": { "nb": "Uttarahalli", "fmr": "Uttarahalli" },
    "Varthur": { "nb": "Varthur", "fmr": "Varthur" },
    "Vasanth Nagar": { "nb": "Vasanth Nagar", "fmr": "Vasanth-Nagar" },
    "Whitefield": { "nb": "Whitefield", "fmr": "Whitefield" },
    "Wilson Garden": { "nb": "Wilson Garden", "fmr": "Wilson-Garden" },
    "Yelahanka": { "nb": "Yelahanka", "fmr": "Yelahanka" }
  };

  const localities = Object.keys(places);
  const fuse = new Fuse(localities, {
    includeScore: true,
    threshold: 0.4,
  });

const [currentTestimonial, setCurrentTestimonial] = useState(1);

const testimonials = [
  { text: "I had such a smooth experience with this rental website! The listings are detailed, and the booking process was easy to navigate. I found the perfect apartment in just a few days, and the customer support team was super helpful when I had questions. Highly recommend", name: "John Doe" },
  { text: "Overall, a great platform for finding rentals. I was able to filter results based on my specific needs, which saved me a lot of time. I did have some trouble with the payment section, but their support team resolved it quickly. Would definitely use again!", name: "Jane Smith" },
  { text: "Amazing experience! The website is so user-friendly, and the photos and descriptions of the properties are spot on. I was able to rent a beautiful house with no hassle at all. The entire process was transparent and stress-free. Will definitely return next time I need a place!", name: "Emily Johnson" },
  { text: "The website is decent, but I had a hard time finding places that matched my price range. There are filters for everything, but some listings were outdated. It could be better about updating availability. Otherwise, it has a lot of options", name: "Michael Brown" },
  { text: "I love how the website shows reviews from previous renters—it made me feel more confident about my decision. The rental process was smooth, and I was able to chat with the property owner directly through the platform. Very happy with my experience!", name: "Sarah Wilson" },
];

  useEffect(() => {
    // Fetch the user's email from localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email); // Set the email in state
    }
  }, []);

  const handleSearchPlaceName = (e) => {
    const searchQuery = e.target.value;
    setPlaceName(searchQuery);

    if (searchQuery.trim() === "") {
      setPlaceSuggestions([]);
      return;
    }

    const results = fuse.search(searchQuery);
    const suggestions = results.map((result) => result.item);
    setPlaceSuggestions(suggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setPlaceName(suggestion);
    setPlaceSuggestions([]);
  };

  const handlePlaceTypeChange = (e) => {
    setFlatTypeOption(e.target.value);
  };

  const handleStartChat = () => {
    if (!placeName || !flatTypeOption) {
      setError("Please select a place and flat type to continue.");
      return;
    } else {
      setError("");
    }
    const placeToSearch =
      flatTypeOption === "Flats" || flatTypeOption === "Buddy"
        ? places[placeName]["nb"]
        : places[placeName]["fmr"];
    setPlaceName(placeToSearch);
    navigate(
      `/chat?place=${encodeURIComponent(
        placeToSearch
      )}&flatType=${encodeURIComponent(flatTypeOption)}`
    );
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://flatscanner.in/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 302) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail"); // Remove email from localStorage
        setUserEmail(""); // Clear the email from state
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Something went wrong on our side. Please try again.");
    }
  };

  // newww
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };
  
  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // shhhh
  return (
    <div>
      <div className="home">
        <div className="bg-img">
          <div className="bg-overlay">
            <nav className="navbar">
              <div className="navbar-left">
                <img
                  src={MainLogo}
                  alt="Flatscanner Logo"
                  className="navbar-logo"
                />
                <h1>Flatscanner</h1>
              </div>
              <div className="navbar-right">
                <select
                  className="nav-type-dropdown"
                  onChange={handlePlaceTypeChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Post Ad
                  </option>
                  <option className="option" value="Flats">Flats</option>
                  <option className="option" value="Spareroom">Post Ad</option>
                  <option className="option" value="Buddy">Buddy</option>
                </select>
                <div className="dropdown-container">
                  {userEmail && (
                    <span className="user-email" onClick={toggleDropdown}>
                      {userEmail}
                    </span>
                  )}
                  {isDropdownVisible && (
                    <div className="dropdown-menu">
                      <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            <div className="starter-section">
              <div className="welcome-pitch">
                <img
                  src={BotImage}
                  height="40px"
                  alt="Bot"
                />
                <h2 className="pitch-header">
                  Hey there! I'm your buddy at Flatscanner
                </h2>
                <p className="pitch-text">
                  Here to help you discover the perfect{" "}
                  <span className="highlight">flat</span>,{" "}
                  <span className="highlight">room</span>, or{" "}
                  <span className="highlight">flatmate</span>{" "}
                  tailored to your needs.
                </p>
              </div>
              <div className="search-bar">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="place-search-input"
                    placeholder="Enter the area in Bangalore you are looking to live in!"
                    value={placeName}
                    onChange={handleSearchPlaceName}
                  />
                  {placeSuggestions.length > 0 && (
                    <ul
                      className="suggestions-list"
                      ref={suggestionsRef}
                    >
                      {placeSuggestions.map(
                        (suggestion, index) => (
                          <li
                            key={index}
                            className="suggestion-item"
                            onClick={() =>
                              handleSelectSuggestion(
                                suggestion
                              )
                            }
                          >
                            <img
                              src={PinIcon}
                              height="15px"
                              alt="Pin Icon"
                            />
                            {suggestion}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
                <select
                  className="flat-type-dropdown"
                  onChange={handlePlaceTypeChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type of flat
                  </option>
                  <option value="Flats">Flats</option>
                  <option value="Spareroom">
                    Spareroom in a Flat
                  </option>
                  <option value="Buddy">Buddy</option>
                </select>
                <button
                  className="search-button"
                  onClick={handleStartChat}
                >
                  Start Chat
                </button>
              </div>
              {error && <div className="error">{error}</div>}
            </div>
          </div>
        </div>
      </div>
     
      <div className='Testimonials'>
        <h2 className="Review-heading">Customers reviews</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <p>{testimonials[currentTestimonial].text}</p>
            <p><strong>{testimonials[currentTestimonial].name}</strong></p>
          </div>
          <div className="testimonial-card">
            <p>{testimonials[(currentTestimonial + 2) % testimonials.length].text}</p>
            <p><strong>{testimonials[(currentTestimonial + 2) % testimonials.length].name}</strong></p>
          </div>
        </div>
        <div className="carousel-buttons">
          <button className="carousel-button left" onClick={handlePrevTestimonial}>❮</button>
          <button className="carousel-button right" onClick={handleNextTestimonial}>❯</button>
        </div>
      </div>
    </div>
  );
}

export default Home;