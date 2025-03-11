import React, { useState, useEffect, useRef } from "react";
import Chatbot from "./Chatbot";
import Fuse from 'fuse.js';

import BotImage from "../assets/bot.png";
import PinIcon from "../assets/pin.png";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/home.png"; 

function Home(){
    const navigate = useNavigate();
    const suggestionsRef = useRef(null);
    const [placeName, setPlaceName] = useState("");
    const [placeSelected, setPlaceSelected] = useState(false);
    const [placeSuggestions, setPlaceSuggestions] = useState([]);
    const [flatTypeOption, setFlatTypeOption] = useState("");
    const [error, setError] = useState("");
  
    const places = {
        "BTM Layout": {"nb": "BTM Layout", "fmr": "BTM-Layout"},
        "Banashankari": {"nb": "Banashankari", "fmr": "Banashankari"},
        "Basavanagudi": {"nb": "Basavanagudi", "fmr": "Basavanagudi"},
        "Basaveshwar Nagar": {"nb": "Basaveshwar Nagar", "fmr": "Basaveshwar-Nagar"},
        "Bellandur": {"nb": "Bellandur", "fmr": "Bellandur"},
        "Bommanahalli": {"nb": "Bommanahalli", "fmr": "Bommanahalli"},
        "Brookefield": {"nb": "Brookefield", "fmr": "Brookefield"},
        "Cox Town": {"nb": "Cox Town", "fmr": "Cox-Town"},
        "Doddanekundi": {"nb": "Doddanekundi", "fmr": "Doddanekundi"},
        "Domlur": {"nb": "Domlur", "fmr": "Domlur"},
        "Ejipura": {"nb": "Ejipura", "fmr": "Ejipura"},
        "Electronic City": {"nb": "Electronic City", "fmr": "Electronic-City"},
        "Frazer Town": {"nb": "Frazer Town", "fmr": "Frazer-Town"},
        "HSR Layout": {"nb": "HSR Layout", "fmr": "HSR-Layout"},
        "Harlur Road": {"nb": "Harlur Road", "fmr": "Harlur"},
        "Hebbal": {"nb": "Hebbal", "fmr": "Hebbal"},
        "Hennur Road": {"nb": "Hennur Road", "fmr": "Hennur"},
        "Hoodi": {"nb": "Hoodi", "fmr": "Hoodi"},
        "Horamavu": {"nb": "Horamavu", "fmr": "Horamavu"},
        "Hulimavu": {"nb": "Hulimavu", "fmr": "Hulimavu"},
        "Indiranagar": {"nb": "Indiranagar", "fmr": "Indiranagar"},
        "JP Nagar": {"nb": "JP Nagar", "fmr": "JP Nagar"},
        "Jayanagar": {"nb": "Jayanagar", "fmr": "Jayanagar"},
        "KR Puram": {"nb": "KR Puram", "fmr": "Krishnarajapura"},
        "Kadubeesanahalli": {"nb": "Kadubeesanahalli", "fmr": "Kadubeesanahalli"},
        "Kadugodi": {"nb": "Kadugodi", "fmr": "Kadugodi"},
        "Kalyan Nagar": {"nb": "Kalyan Nagar", "fmr": "Kalyan-Nagar"},
        "Kammanahalli": {"nb": "Kammanahalli", "fmr": "Kammanahalli"},
        "Kodihalli": {"nb": "Kodihalli", "fmr": "Kodihalli"},
        "Koramangala": {"nb": "Koramangala", "fmr": "Koramangala"},
        "MG Road": {"nb": "MG Road", "fmr": "MG-Road"},
        "Mahadevapura": {"nb": "Mahadevapura", "fmr": "Mahadevapura"},
        "Malleshwaram": {"nb": "Malleshwaram", "fmr": "Malleshwaram"},
        "Marathahalli": {"nb": "Marathahalli", "fmr": "Marathahalli"},
        "Nagarbhavi": {"nb": "Nagarbhavi", "fmr": "Nagarbhavi"},
        "Nagasandra": {"nb": "Nagasandra", "fmr": "Nagasandra"},
        "Old Madras Road": {"nb": "Old Madras Road", "fmr": "Old Madras Road"},
        "RT Nagar": {"nb": "RT Nagar", "fmr": "RT-Nagar"},
        "Rajajinagar": {"nb": "Rajajinagar", "fmr": "Rajajinagar"},
        "Ramamurthy Nagar": {"nb": "Ramamurthy Nagar", "fmr": "Ramamurthy-Nagar"},
        "Richmond Town": {"nb": "Richmond Town", "fmr": "Richmond-Town"},
        "Sahakar Nagar": {"nb": "Sahakar Nagar", "fmr": "Sahakar Nagar"},
        "Sarjapur Road": {"nb": "Sarjapur Road", "fmr": "Sarjapur"},
        "Thanisandra": {"nb": "Thanisandra", "fmr": "Thanisandra"},
        "Uttarahalli": {"nb": "Uttarahalli", "fmr": "Uttarahalli"},
        "Varthur": {"nb": "Varthur", "fmr": "Varthur"},
        "Vasanth Nagar": {"nb": "Vasanth Nagar", "fmr": "Vasanth-Nagar"},
        "Whitefield": {"nb": "Whitefield", "fmr": "Whitefield"},
        "Wilson Garden": {"nb": "Wilson Garden", "fmr": "Wilson-Garden"},
        "Yelahanka": {"nb": "Yelahanka", "fmr": "Yelahanka"}
    };
  
    const localities = Object.keys(places);
    const fuse = new Fuse(localities, {
      includeScore: true,
      threshold: 0.4, 
    });
    
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setPlaceSuggestions([]);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
  
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
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
      setPlaceSelected(true);
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
      const placeToSearch = flatTypeOption === "Flats" || flatTypeOption === "Buddy"? places[placeName]["nb"] : places[placeName]["fmr"];
      setPlaceName(placeToSearch)
      navigate(`/chat?place=${encodeURIComponent(placeToSearch)}&flatType=${encodeURIComponent(flatTypeOption)}`);
    };
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
  
    return (
      <div>
      <div className="home">
        <div className="bg-img">
          <div className="bg-overlay">
          <nav className="navbar">
              <div className="navbar-left">
                <img src={MainLogo} alt="Flatscanner Logo" className="navbar-logo" />
                <h1>Flatscanner</h1>
              </div>
              <div className="navbar-right">
                <a href="/room-wanted-ad" className="navbar-link">Post Room Wanted Ad</a>
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </div>
            </nav>
            
            
            <div className="starter-section">
              <div className="welcome-pitch">
                <img src={BotImage} height="40px" alt="Bot" />
                <h2 className="pitch-header">
                  Hey there! I'm your buddy at Flatscanner
                </h2>
                <p className="pitch-text">
                Here to you discover the perfect<span className="highlight">flat</span>,<span className="highlight">room</span>or<span className="highlight">flatmate</span>tailored to your needs.
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
                    <ul className="suggestions-list" ref={suggestionsRef}>
                      {placeSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="suggestion-item"
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                          <img src={PinIcon} height="15px"/>
                          {suggestion}
                        </li>
                      ))}
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
                  <option value="Spareroom">Spareroom in a Flat</option>
                  <option value="Buddy">Buddy</option>
                </select>
                <button className="search-button" onClick={handleStartChat}>
                  Start Chat
                </button>
              </div>
              {error && <div className="error">{error}</div>}
            </div>
            </div>     
        </div>
          
      </div>
      </div>
    );
  };

export default Home;