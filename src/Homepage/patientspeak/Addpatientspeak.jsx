import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Importing Toaster and toast from react-hot-toast
import './style.css'; // Ensure to import your CSS file

const Addpatientspeak = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/patientspeak/addnew', {
        name,
        text,
        videoUrl,
      });
      console.log('Patient speak added:', response.data);
      
      // Reset form fields
      setName('');
      setText('');
      setVideoUrl('');

      // Show success toast
      toast.success('Patient speak added successfully!');

      // Redirect to the patientspeak get all page
      navigate('/patientspeak/getall');
    } catch (error) {
      console.error('Error adding patient speak:', error);
      // Show error toast
      toast.error('Error adding patient speak. Please try again.');
    }
  };

  return (
    <div className="add-speak">
      <h1 className="add-speak-heading">Add New Patient Speak</h1>
      <form onSubmit={handleSubmit} className="add-speak-form">
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Testimonial Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn add-speak-btn">Add Patient Speak</button>
      </form>
      <Toaster /> {/* Include the Toaster component here */}
    </div>
  );
};

export default Addpatientspeak;
