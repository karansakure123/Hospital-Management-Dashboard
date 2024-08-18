// src/components/AddTestimonial.jsx
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./testi.css"; // Ensure this path is correct

const AddTestimonial = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/testimonial/addnew", {
        name,
        message,
        imageUrl,
      });
      toast.success("Testimonial added successfully!");
      navigate("/testimonials/getall"); // Adjust to your route
    } catch (error) {
      toast.error("Failed to add testimonial.");
      console.error("Error adding testimonial:", error); // Log error for debugging
    }
  };

  return (
    <div className="add-testimonial-container">
      <Toaster position="top-center" />
      <h1>Add Testimonial</h1>
      <form onSubmit={handleSubmit} className="testimonial-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Testimonial:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Submit Testimonial</button>
      </form>
    </div>
  );
};

export default AddTestimonial;
