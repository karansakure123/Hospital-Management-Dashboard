import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './style/adddir.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const AddDirectors = () => {
  // Updated state keys to match the backend API
  const [formData, setFormData] = useState({
    dircHeading: '',  // Updated key
    dircSpeciality: '',  // Updated key
    dircImg: '',  // Key remains the same
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending formData to the backend API
      await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/about/director/addnew', formData);
      toast.success('Directors added successfully!');
      // Reset form fields
      setFormData({ dircHeading: '', dircSpeciality: '', dircImg: '' });
      // Navigate to the /director/getall route
      navigate('/director/getall');
    } catch (error) {
      toast.error('Failed to add Directors!');
      console.log(error.response.data); // Log the error response for debugging
    }
  };


  return (
    <div className="adddirc-container">
      <h2 className="adddirc-title">Add New Director</h2>
      <form className="adddirc-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="dircHeading">Director Heading</label> {/* Updated label */}
            <input
              type="text"
              id="dircHeading"
              name="dircHeading"  // Updated name
              value={formData.dircHeading}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="dircSpeciality">Director Speciality</label> {/* Updated label */}
            <textarea
              id="dircSpeciality"
              name="dircSpeciality"  // Updated name
              value={formData.dircSpeciality}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="dircImg">Image URL</label>
            <input
              type="text"
              id="dircImg"
              name="dircImg"
              value={formData.dircImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="submit-btn">Add Director</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDirectors;
