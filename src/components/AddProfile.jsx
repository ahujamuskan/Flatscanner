import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MegaphoneIcon from "../assets/megaphone.png";
import { Link } from "react-router-dom";

function AddProfile({ userId }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    socialAddress: "",
    bio: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const url = `http://127.0.0.1:5000/api/get_tenant_ad?user_id=${userId}`;
            const response = await fetch(url, config);
            if (response.ok){
                const json = await response.json();
                const adData = json["data"];
                setFormData({
                    email: adData["email"],
                    fullName: adData["full_name"],
                    socialAddress: adData["social_handle"] !== null ? adData["social_handle"]:"",
                    bio: adData["description"],
                })
                setIsUpdate(true);
            }
            console.log("Fetched tenant ad successfully!")
        } catch (err) {
            console.log("Something went wrong with fetching the data", err)
        }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const validate = () => {
    let errors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email address";
    }
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.bio.trim()) {
      errors.bio = "Bio is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

        const config = {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                full_name: formData.fullName,
                email: formData.email,
                social_handle: formData.socialAddress,
                description: formData.bio,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const url = "http://127.0.0.1:5000/api/save_tenant_ad";
            const response = await fetch(url, config);
        } catch (err) {
            console.log("Please try again!")
        }

        setAlert({ message: isUpdate ? "Profile updated successfully!" : "Profile created successfully!", type: "success" });

        setTimeout(() => {
            setAlert(null);
          }, 2000);
    }
  };

  return (
    <>
        <nav className="navbar">
            <div className="navbar-left">
                <h1>Flatscanner</h1>
            </div>
            <div className="navbar-right">
                <Link to="/home" className="navbar-link">Home</Link>
                <button onClick={handleLogout} className="navbar-button">Logout</button>
            </div>
        </nav>
        <div className="profile-main-section">
            <div className="profile-main-image">
                <div className="profile-main-image-overlay">
                <div className="info-text">
                        <h1><img src={MegaphoneIcon} height="30px" /> Find a Place to Stay</h1>
                        <p>Create a room wanted ad so people offering rooms can find out more about you <br /> and get in touch.</p>
                </div>
                </div>
            </div>

            {alert && (
                <div className="custom-alert">
                <div className="alert-content">
                    <div className="tick-mark">✓</div>
                    <span className="alert-text">{alert.message}</span>
                </div>
                </div>
            )}
            <div className="add-profile">
                <h1> Room Wanted Ad</h1>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Email Address", name: "email", type: "email" },
                        { label: "Full Name", name: "fullName", type: "text" },
                        { label: "Social Address (Optional)", name: "socialAddress", placeholder: "Instagram / Meta / Twitter ID", type: "text" },
                        {
                            label: "Ad Details",
                            name: "bio",
                            type: "textarea",
                            placeholder: "I am a 28-year-old working professional looking for a 2BHK or 3BHK flat in Indiranagar. \nI prefer a clean, well-maintained space with good natural light and easy access to public transportation. \nI am friendly, responsible, and value a peaceful environment. I am comfortable with a move-in date around 4th Jan. Ideally, I would like to share the flat with like-minded individuals who are respectful and maintain a balance of social and personal space.",
                        },
                    ].map((field) => (
                        <div key={field.name} className="form-row">
                            <label className="form-label" htmlFor={field.name}>
                                {field.label}
                            </label>
                            {field.type === "textarea" ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    rows="4"
                                    className="form-input"
                                ></textarea>
                            ) : (
                                <input
                                    id={field.name}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            )}
                            {errors[field.name] && <p className="add-profile-error">{errors[field.name]}</p>}
                        </div>
                    ))}
                    <button type="submit" className="form-submit-button">
                        {isUpdate ? "Update Profile" : "Create Profile"}
                    </button>
                </form>

            </div>
        </div>
    </>
  );
}

export default AddProfile;