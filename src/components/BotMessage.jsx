import React, { useState, useEffect } from "react";
import LoaderImage from "../assets/message.gif";
import { useNavigate } from "react-router-dom";


function BotMessage({ key,questions, locality_name,user_id, setMessageLoading, flatType }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFlatsData = async () => {

    const config = {
      method: 'POST',
      body: JSON.stringify({
        questions: questions,
        locality_name: locality_name,
        user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
      try {
        setMessageLoading(true);
        let url = "https://flatscanner.in/api/get_recommendations_for_flats";
        if(flatType === "Spareroom"){
          url = "https://flatscanner.in/api/get_recommendations_for_spareroom";
        }else if(flatType === "Buddy"){
          url = "https://flatscanner.in/api/get_recommendations_for_buddy"
        }
        const response = await fetch(url, config);
        const json = await response.json();
        if (response.status ===403) {
          setError(json["error"])
        }else if (response.ok){ 
          const recommended_properties_list = json["data"]
          const obj = JSON.parse(recommended_properties_list)
          const recommended_data = flatType === "Flats" || flatType === "Spareroom" ? obj["properties_data"] : obj["buddies_data"]
          setData(recommended_data);
        }
        setLoading(false);
        setMessageLoading(false)
      } catch (err) {
        setError("Something went wrong on our side. Please try again.");
        setLoading(false);
        setMessageLoading(false)
      }
    };

    fetchFlatsData();
  }, []);

  if (loading) {
    return(
      <div>
        <img src={LoaderImage} height="50px" alt="Bot" />
      </div>
    );
  }

  if (error) {
    return(
      <div className="bot-message message error">
        {error || "Failed to fetch data..."}
      </div>
    );
  }
      return(
      <div className="bot-message message">
        {data.map((property) => (
          <div className="inside-bot-message">
            <h3>{flatType === "Buddy" ? property.full_name : property.property_title}</h3>
            <p>{flatType === "Buddy" ? (property.social_handle !== null ? property.social_handle : "Not Provided" )  : property.match_reason}</p>
            <p>{flatType === "Buddy" ? property.email : property.rent}</p>
            {flatType === "Flats" && (
              <a
              href="#"
              target="_blank"
              className="properties-link-button"
              onClick={() => window.open('/info', '_blank')}
            >
              Property Link
            </a>
            )}
            {flatType === "Spareroom" && (
              <a
                href={`https://findmyroom.in/property${property.detail_url}`}
                className="properties-link-button"
                target="_blank"
              >
                Property Link
              </a>
            )}
            {flatType === "Buddy" && <p>{property.description}</p>}
          </div>
        ))}
      </div>
    );
}

export default BotMessage;
