import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Addnewwho = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    sectionTitle: '',
    para1: '',
    para2: '',
    para3: '',
    buttonLabel: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/whowe/addnew', formData);
      if (response.data.success) {
        toast.success('Who We Are section added successfully!');
        // Navigate to /whowe/getall after successful addition
        navigate('/whowe/getall');
      } else {
        toast.error('Failed to add Who We Are section. Please try again.');
      }
    } catch (error) {
      console.error('Error adding Who We Are section:', error);
      toast.error('Error adding Who We Are section. Please try again.');
    }
  };

  return (
    <div className="addnewwho-container">
      <Toaster position="top-center" />
      <h2 className="addnewwho-heading">Add New "Who We Are" Section</h2>
      <form onSubmit={handleSubmit} className="addnewwho-form">
        <div className="form-group">
          <label htmlFor="sectionTitle">Section Title</label>
          <input
            type="text"
            id="sectionTitle"
            name="sectionTitle"
            value={formData.sectionTitle}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="para1">Paragraph 1</label>
          <textarea
            id="para1"
            name="para1"
            value={formData.para1}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="para2">Paragraph 2</label>
          <textarea
            id="para2"
            name="para2"
            value={formData.para2}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="para3">Paragraph 3</label>
          <textarea
            id="para3"
            name="para3"
            value={formData.para3}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="buttonLabel">Button Label</label>
          <input
            type="text"
            id="buttonLabel"
            name="buttonLabel"
            value={formData.buttonLabel}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Add Section</button>
      </form>
    </div>
  );
};

export default Addnewwho;
