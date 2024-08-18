import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';

const Updatehero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateFormData, setUpdateFormData] = useState({
    sliderImg: '',
    heroFile: null, // For handling file uploads
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/hero/get/${id}`);
        setUpdateFormData({
          sliderImg: response.data.hero.sliderImg, // Fetch and set existing image URL
          heroFile: null, // Reset the file input
        });
      } catch (error) {
        setError('Error fetching hero details');
      }
    };

    fetchHeroDetails();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'heroFile') {
      setUpdateFormData({
        ...updateFormData,
        heroFile: files[0], // Handle file input
      });
    } else {
      setUpdateFormData({
        ...updateFormData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (updateFormData.heroFile) {
      formData.append('heroFile', updateFormData.heroFile);
    } else {
      formData.append('heroImg', updateFormData.sliderImg);
    }

    try {
      await axios.put(`http://localhost:3000/api/v1/hero/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Hero updated successfully!');
      navigate('/hero/getall'); // Navigate to the getall route after success
    } catch (error) {
      toast.error('Error updating hero');
      setError('Error updating hero');
    }
  };

  return (
    <div className="update-form">
      <Toaster /> {/* This is where toast notifications will appear */}
      <h2>Update Slider</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Slider Image URL:</label>
          <input
            type="text"
            name="sliderImg"
            value={updateFormData.sliderImg}
            onChange={handleFormChange}
            className="form-control"
          />
        </div>
         
         <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
        <button type="button" onClick={() => navigate('/hero/getall')} className="btn btn-secondary mt-3">
          Cancel
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Updatehero;
