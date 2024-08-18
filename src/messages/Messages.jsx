import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
 import { toast } from "react-toastify";
import "./style/message.css";
import { AuthContext } from "../ErrorBoundary";

const Messages = ({ isSidebarOpen }) => { // Accepting sidebar state as a prop
  const [messages, setMessages] = useState([]); // Initialize state for messages
  const { isAuthenticated } = useContext(AuthContext); // Use context to check authentication

  useEffect(() => {
    const fetchMessages = async () => {
      if (isAuthenticated) { // Fetch messages only if authenticated
        try {
          const { data } = await axios.get(
            "http://localhost:3000/api/v1/message/getall",
            { withCredentials: true }
          );
          setMessages(data.messages); // Set messages to state
        } catch (error) {
          toast.error("Error occurred while fetching messages");
        }
      }
    };
    fetchMessages();
  }, [isAuthenticated]); // Dependency array ensures fetch on authentication change

  return (
    <section className={`messages-sec1 ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="container-fluid">
        <div className="msg-heading">
          <h1>Messages</h1>
        </div>
        <div className="custom-row">
          {messages && messages.length > 0 ? (
            messages.map((element,message) => (
              <div className="custom-col" key={message.id}>
                <div className="messages-card colorful-card">
                  <div className="msg-card-details">
                    <p>First Name: <span>{element.firstName}</span></p>
                    <p>Last Name: <span>{element.lastName}</span></p>
                    <p>Email: <span>{element.email}</span></p>
                    <p>Phone: <span>{element.phone}</span></p>
                    <p>Message: <span>{element.message}</span></p>
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
