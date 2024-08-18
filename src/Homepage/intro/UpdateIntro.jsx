import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './style.css'; // Import the CSS file for styling

const UpdateIntro = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [formData, setFormData] = useState({
    Heading: '',
    title: '',
    description: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch existing data for the specific item by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/intro/get/${id}`);
        if (response.data.success) {
          setFormData({
            Heading: response.data.intro.Heading,
            title: response.data.intro.title,
            description: response.data.intro.description,
            imageUrl: response.data.intro.imageUrl
          });
        } else {
          toast.error("Data not found");
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/intro/update/${id}`, formData);
      if (response.data.success) {
        toast.success('Update successful!');
        navigate('/intro/getall'); // Redirect back to the main page or wherever you want after update
      } else {
        toast.error('Update failed: ' + response.data.message);
      }
    } catch (error) {
      toast.error("Error updating data");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="update-intro-container">
      <Toaster /> {/* React Hot Toast Toaster */}
      <h2 className="update-intro-title">Update Intro</h2>
      <form className="update-intro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Heading" className="form-label">Heading</label>
          <input
            type="text"
            className="form-control"
            id="Heading"
            name="Heading"
            value={formData.Heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary update-intro-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateIntro;
