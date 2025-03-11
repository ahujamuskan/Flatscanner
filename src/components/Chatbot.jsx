import React, { useState } from "react";
import Input from "./Input";
import BackImage from "../assets/left.png";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import { useLocation } from "react-router-dom";

function Chatbot({}) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const placeName = queryParams.get("place");
  const flatTypeOption = queryParams.get("flatType");

  const [messages, setMessages] = useState([]);
  
  const [userMessages, setUserMessages] = useState([]);

  const [botMessageLoading, setBotMessageLoading] = useState(false);

  const [showSuggestedResponses, setShowSuggestedResponses] = useState(true);

  const handleSuggestedResponseClick = (response) => {
    setShowSuggestedResponses(false);
    send(response);
  };
  
  const flatSuggestedQuestions = [
    `Can you show me 2bhk flats in ${placeName}?`,
    `Show me fully furnished 2bhk flats in ${placeName}?`,
    `Can you show me flats in ${placeName} with deposit not more than 1,00,000?`,
    `Can you show me 1bhk flats in ${placeName} with car parking availability?`,
  ];

  const spareroomSuggestedQuestions = [
    `Can you show me a spareroom in a 2bhk flat at ${placeName}?`,
    `Show me fully furnished spareroom in a 2bhk flat at ${placeName}?`,
    `Can you show me a spareroom in ${placeName} with deposit not more than 50,000?`,
    `Can you show me a spareroom in 3bhk flats at ${placeName} with car parking availability?`,
  ]

  const buddySuggestedQuestions = [
    `Can you show me people looking for flatmates in ${placeName}?`,
    `Can you show me profiles of people interested in buddying up for a 2bhk flat in ${placeName}?`,
    `Can you help me find flatmates for a 3bhk flat in ${placeName}, preferably with a parking facility?`,
    `Can you show me flatmates wanted in fully furnished flats in ${placeName}, with a budget of 20,000 per person?`,
  ]

  let suggestedQuestionsToShow = flatSuggestedQuestions;
  if(flatTypeOption === "Spareroom"){
    suggestedQuestionsToShow = spareroomSuggestedQuestions;
  }else if(flatTypeOption === "Buddy"){
    suggestedQuestionsToShow = buddySuggestedQuestions;
  }

  const send = async (text, locality = placeName, flatType=flatTypeOption) => {
    const userId = localStorage.getItem("userId");
    if (text.trim()) {

      setShowSuggestedResponses(false);
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage
          key={messages.length + 2}
          questions={userMessages.concat(text)}
          locality_name={locality}
          user_id={userId}
          setMessageLoading={setBotMessageLoading}
          flatType={flatType}
        />
      );
      setMessages(newMessages);
      setUserMessages((prevUserMessages) => [...prevUserMessages, text]);
    }

  };

    return (
      <div className="chatbot">
        <a href="/home" className="back-link">
          <img src={BackImage} height="20px" alt="Back"  />
        </a>
        <div className="inner-chatbot">
          {showSuggestedResponses && (
            <div className="suggested-responses-container">
              <p className="suggested-responses-heading">Start the conversation with a quick suggestion or type your message.</p>
              {suggestedQuestionsToShow.map((response, index) => (
                <div className="suggested-responses-buttons">
                  <button 
                    key={index} 
                    className="suggested-response-button" 
                    onClick={() => handleSuggestedResponseClick(response)}
                  >
                    {response}
                  </button>
                  </div>
              ))}
            </div>
          )}
          <div className="messages">{messages}</div>
          
        </div>
        <Input onSend={send} botMessageLoading={botMessageLoading} />
      </div>
    );
  }

export default Chatbot;