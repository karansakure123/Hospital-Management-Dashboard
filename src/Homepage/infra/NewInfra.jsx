import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./style.css"; // Import the CSS file

const NewInfra = () => {
  const [infrastructure, setInfrastructure] = useState({
    heading: '',
    leftImage: '',
    images: ['', '', '', ''],
    description: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('image')) {
      const index = parseInt(name.split('-')[1]);
      const newImages = [...infrastructure.images];
      newImages[index] = value;
      setInfrastructure({ ...infrastructure, images: newImages });
    } else {
      setInfrastructure((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/infra/addnew', infrastructure);
      toast.success("Infrastructure added successfully!"); // Show success toast
       navigate('/infra/getall');
    } catch (error) {
      console.error("Error adding infrastructure:", error);
      toast.error("Error adding infrastructure."); // Show error toast
    }
  };

  return (
    <div className="new-infra">
      <h1>Add New Infrastructure</h1>
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
          <label>Images:</label>
          {infrastructure.images.map((img, index) => (
            <input
              key={index}
              type="text"
              name={`image-${index}`}
              value={img}
              onChange={handleChange}
              placeholder={`Image URL ${index + 1}`}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={infrastructure.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="addinfrabtn ">Add Infrastructure</button>
      </form>
    </div>
  );
};

export default NewInfra;
