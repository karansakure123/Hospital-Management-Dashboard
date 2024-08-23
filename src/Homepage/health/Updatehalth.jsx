import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import "./style.css"
const Updatehealth = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '', // Optional
    icon: '',
  });
  
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate();

  // Fetch existing health data when the component mounts
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/health/get/${id}`);
        setFormData(response.data); // Populate the form with the fetched data
      } catch (error) {
        console.error('Error fetching health data:', error);
        toast.error('Failed to fetch health data.');
      }
    };

    fetchHealthData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/health/update/${id}`, formData);
      toast.success('Health item updated successfully!');
      navigate('/health/getall'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating health item:', error);
      toast.error('Failed to update health item.');
    }
  };

  return (
    <div className="update-health-container">
      <Toaster position='top-center' />
      <h2 className='update-h'>Update Health Treatment</h2>
      <form onSubmit={handleSubmit} className="update-health-form">
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
        </div>
        <button type="submit" className="btn update-health-submit-btn">Update</button>
      </form>
    </div>
  );
};

export default Updatehealth;
