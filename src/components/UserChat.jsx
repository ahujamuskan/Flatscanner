import React, { useState, useEffect } from "react";

function UserChat() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // const user_id = parseInt(localStorage.getItem("userId"));
  const user_id = 12;

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`https://flatscanner.in/api/get_all_user_messages?sender_user_id=${user_id}`);
      const json = await response.json();
      const data = [
        {
          "content": "Hello, how are you?",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T14:04:35"
        },
        {
          "content": "Hi, how are you?",
          "receiver_email": "newtest@test.com",
          "receiver_user_id": 33,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T14:06:19"
        },
        {
          "content": "Ahh, ok",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T17:08:50"
        },
        {
          "content": "What is Ahh, ok?",
          "receiver_email": "test5@test5.com",
          "receiver_user_id": 12,
          "sender_email": "notnew@notnew.com",
          "sender_user_id": 34,
          "timestamp": "2025-02-27T17:11:20"
        },
        {
          "content": "I am not telling you!",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T17:12:03"
        },
        {
          "content": "fdsfds",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T18:04:38"
        },
        {
          "content": "ok, what was it?",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T18:15:59"
        },
        {
          "content": "now?",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T20:58:21"
        },
        {
          "content": "let's see now\n",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-27T21:02:57"
        },
        {
          "content": "again, now?",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-02-28T10:47:42,"
        },
        {
          "content": "i am good. how are you?",
          "receiver_email": "test5@test5.com",
          "receiver_user_id": 12,
          "sender_email": "newtest@test.com",
          "sender_user_id": 33,
          "timestamp": "2025-02-28T14:46:12"
        },
        {
          "content": "hello final",
          "receiver_email": "notnew@notnew.com",
          "receiver_user_id": 34,
          "sender_email": "test5@test5.com",
          "sender_user_id": 12,
          "timestamp": "2025-03-01T11:29:44"
        },
        {
          "content": "all good. how are you?",
          "receiver_email": "test5@test5.com",
          "receiver_user_id": 12,
          "sender_email": "newtest@test.com",
          "sender_user_id": 33,
          "timestamp": "2025-03-01T11:32:32"
        },
        {
          "content": "got your messages.",
          "receiver_email": "test5@test5.com",
          "receiver_user_id": 12,
          "sender_email": "notnew@notnew.com",
          "sender_user_id": 34,
          "timestamp": "2025-03-01T15:21:56"
        }
      ]

      const groupedConversations = {};

      data.forEach((message) => {
        const chatPartnerId = message.sender_user_id === user_id ? message.receiver_user_id : message.sender_user_id;
        const chatPartnerEmail = message.sender_user_id === user_id ? message.receiver_email : message.sender_email;
        if (!groupedConversations[chatPartnerId]) {
          groupedConversations[chatPartnerId] = {
            id: chatPartnerId,
            name: chatPartnerEmail,
            lastMessage: message.content,
            lastMessageTime: message.timestamp,
            messages: [],
          };
        }
        groupedConversations[chatPartnerId].messages.push(message);
      });

      let conversationsArray = Object.values(groupedConversations);
      
      conversationsArray.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      
      setConversations(conversationsArray);

      if (conversationsArray.length > 0) {
        setActiveChat(conversationsArray[0]);
        setMessages(conversationsArray[0].messages);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const messageData = {
      message: newMessage,
      sender_user_id: user_id,
      receiver_user_id: activeChat.id,
    };

    try {
      const response = await fetch("https://flatscanner.in/api/send_user_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();
      if (result.success) {
        const updatedMessages = [...messages, { ...messageData, content: newMessage, timestamp: new Date().toISOString() }];
        setMessages(updatedMessages);

        const updatedConversations = conversations.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString(),
              messages: updatedMessages,
            };
          }
          return chat;
        });

        updatedConversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        setConversations(updatedConversations);
        setNewMessage("");
      } else {
        console.error("Error sending message:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <h2>Your Chats</h2>
        <div className="chat-list">
          {activeChat && (
            <div 
              key={activeChat.id} 
              className="chat-item active-chat"
              onClick={() => { setActiveChat(activeChat); setMessages(activeChat.messages); }}
            >
              <h4>{activeChat.name}</h4>
              <p>{activeChat.lastMessage}</p>
            </div>
          )}
          {conversations
            .filter((chat) => chat.id !== activeChat?.id)
            .map((chat) => (
              <div 
                key={chat.id} 
                className="chat-item"
                onClick={() => { setActiveChat(chat); setMessages(chat.messages); }}
              >
                <h4>{chat.name}</h4>
                <p>{chat.lastMessage}</p>
              </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        {activeChat ? (
          <>
            <div className="chat-header">
              <h3>Chat with {activeChat.name}</h3>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender_user_id === user_id ? "sent" : "received"}`}>
                  <div className={`message-bubble ${msg.sender_user_id === user_id ? "sent-bubble" : "received-bubble"}`}>
                    {msg.content}
                    <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={sendMessage}>
              <textarea 
                placeholder="Type a message..." 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default UserChat;