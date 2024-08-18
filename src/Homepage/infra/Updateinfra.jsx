import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.css";
import { toast } from 'react-hot-toast'; // Import hot-toast

const Updateinfra = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [infrastructure, setInfrastructure] = useState({
    heading: '',
    leftImage: '',
    images: ['', '', '', ''],
    description: ''
  });

  useEffect(() => {
    const fetchInfrastructure = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/infra/get/${id}`); // Fetch existing data
        setInfrastructure(response.data.infrastructure);
      } catch (error) {
        console.error("Error fetching infrastructure:", error);
      }
    };

    fetchInfrastructure();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfrastructure((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:3000/api/v1/infra/update/${id}`, infrastructure);
      toast.success("Infrastructure updated successfully!"); // Show success toast
      navigate('/infra/getall'); // Redirect to the infrastructure list page
    } catch (error) {
      console.error("Error updating infrastructure:", error);
      toast.error("Error updating infrastructure."); // Show error toast
    }
  };

  return (
    <div className="infraupdate">
      <h1>Update Infrastructure</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Heading:</label>
          <input
            type="text"
            name="heading"
            value={infrastructure.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Left Image URL:</label>
          <input
            type="text"
            name="leftImage"
            value={infrastructure.leftImage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image 1 URL:</label>
          <input
            type="text"
            name="images[0]"
            value={infrastructure.images[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image 2 URL:</label>
          <input
            type="text"
            name="images[1]"
            value={infrastructure.images[1]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image 3 URL:</label>
          <input
            type="text"
            name="images[2]"
            value={infrastructure.images[2]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image 4 URL:</label>
          <input
            type="text"
            name="images[3]"
            value={infrastructure.images[3]}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn update-infrabtn">Update Infrastructure</button>
      </form>
    </div>
  );
};

export default Updateinfra;
