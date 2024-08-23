import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style/message.css";

const Messages = ({ isSidebarOpen }) => { // Accepting sidebar state as a prop
  const [messages, setMessages] = useState([]); // Initialize state for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-backend-4.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages); // Set messages to state
      } catch (error) {
        toast.error("Error occurred while fetching messages");
      }
    };
    fetchMessages();
  }, []); // Empty dependency array ensures fetch on component mount

  return (
    <section className={`messages-sec1 ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="container-fluid">
        <div className="msg-heading">
          <h1>Messages</h1>
        </div>
        <div className="custom-row">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div className="custom-col" key={message.id}>
                <div className="messages-card colorful-card">
                  <div className="msg-card-details">
                    <p>First Name: <span>{message.firstName}</span></p>
                    <p>Last Name: <span>{message.lastName}</span></p>
                    <p>Email: <span>{message.email}</span></p>
                    <p>Phone: <span>{message.phone}</span></p>
                    <p>Message: <span>{message.message}</span></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No Messages</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;
