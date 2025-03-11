import React, { useState } from "react";
import mainIllustration from "../assets/mainIll.png"
import { useNavigate } from "react-router-dom";


function LoginSignup () {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false); 
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); 
      setLoading(true); 
  
      const endpoint = isSignup
        ? "https://flatscanner.in/api/signup"
        : "https://flatscanner.in/api/login";
      const payload = { email: formData.email, password: formData.password };
  
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          localStorage.setItem("userId", result.user_id);
          navigate("/home");
        } else {
          setError(result.message || "Something wrong with your email or password.");
        }
      } catch (err) {
        setError("Something went wrong on our side. Please try again.");
      } finally {
        setLoading(false);  
      }
    };
  
    return (
      <div className="split-layout">
        <div className="left-section">
          <h2>Find Your Perfect Space</h2>
          <img src={mainIllustration} alt="Main Image" className="main-image"  />
          <p className="intro-text">
              Tell us what you’re looking for<span className="highlight">flat</span>, 
              <span className="highlight">room</span>or  
              <span className="highlight">flatmate</span>and we’ll match you with the best options.
          </p>
        </div>
  
        <div className="right-section">
          <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? <div className="spinner"></div> : isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
          <p className="auth-toggle-question">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
          {error && <p className="error">{error}</p>}
        </div>
        {/* <div className="contact-us">
          <p>Contact us <a href="mailto:hello@flatscanner.in">hello@flatscanner.in</a></p>
        </div> */}
      </div>
    );
  };


export default LoginSignup;