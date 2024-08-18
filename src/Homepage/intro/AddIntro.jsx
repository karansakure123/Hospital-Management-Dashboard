import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style.css'; // Import your custom CSS file

const AddIntro = () => {
  const [formData, setFormData] = useState({
    Heading: '',
    title: '',
    description: '',
    imageUrl: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/intro/create', formData);
      toast.success(response.data.message);
      setFormData({ Heading: '', title: '', description: '', imageUrl: '' }); // Clear the form
      navigate('/intro/get'); // Navigate to /intro/get after successful submission
    } catch (error) {
      console.error("Error adding intro:", error);
      toast.error("Failed to add the intro.");
    }
  };

  return (
    <div className="add-intro-container">
      <h2 className="add-intro-heading">Add New Intro</h2>
      <form className="add-intro-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="Heading">Heading</label>
              <input
                type="text"
                id="Heading"
                name="Heading"
                value={formData.Heading}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn-add-new">Add Intro</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIntro;
