// src/Addcsr.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import "./style/csr.css";  // Import any required styles

const Addcsr = () => {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    img: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/csr/addnew', formData);
      toast.success('CSR added successfully!');
      navigate('/csr');  // Redirect to the CSR list after adding
    } catch (error) {
      console.error('There was an error adding the CSR!', error);
      toast.error('Failed to add CSR.');
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      <div className="csr-form-container">
        <h2>Add New CSR</h2>
        <form onSubmit={handleSubmit} className="csr-form">
          <div className="form-group">
            <label>Heading:</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn csr-submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Addcsr;
