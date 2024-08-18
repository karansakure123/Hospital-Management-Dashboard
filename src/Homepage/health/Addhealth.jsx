import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import * as Icons from 'react-icons/fa'; // Import all icons from FontAwesome

const Addhealth = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/health/addnew', formData);
      toast.success('Health item added successfully!');
      navigate('/health/getall');
    } catch (error) {
      console.error('Error adding health item:', error);
      toast.error('Failed to add health item.');
    }
  };

  // Function to render the icon dynamically
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName]; // Get the icon component dynamically
    return IconComponent ? <IconComponent /> : null; // Render the icon if it exists
  };

  return (
    <>
      <Toaster position='top-center' />
      <div className="add-health-container">
        <h2 className='addnew-h'>Add New Health Treatment</h2>
        <form onSubmit={handleSubmit} className="add-health-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
               
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Icon (e.g., FaHospital):</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              required
              className="form-control"
            />
            <div className="icon-preview">
              {formData.icon && renderIcon(formData.icon)} {/* Render the icon preview */}
            </div>
          </div>
          <button type="submit" className="btn add-health-submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Addhealth;
