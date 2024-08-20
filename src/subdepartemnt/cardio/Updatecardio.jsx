import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "./style.css"

const UpdateCardio = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    additionalInfo: '',
    extraDescriptions: [],
    backgroundImageUrl: '',
    innerImageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hospital-management-backend-3.onrender.com/api/v1/cardiology/get/${id}`);
        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          additionalInfo: data.additionalInfo,
          extraDescriptions: data.extraDescriptions || [],
          backgroundImageUrl: data.backgroundImage,
          innerImageUrl: data.innerImage,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching existing details. Please try again.');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'extraDescriptions') {
      setFormData({ ...formData, extraDescriptions: value.split(',') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hospital-management-backend-3.onrender.com/api/v1/cardiology/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      toast.success('Cardiology service updated successfully!');
      navigate('/cardiology/getall');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating the service. Please try again.');
    }
  };

  return (
    <div className="updatecardio-container">
      <h2 className="updatecardio-title">Update Cardiology Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="updatecardio-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="updatecardio-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updatecardio-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="updatecardio-textarea"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updatecardio-label">Additional Info</label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="updatecardio-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updatecardio-label">Extra Descriptions (comma-separated)</label>
          <input
            type="text"
            name="extraDescriptions"
            value={formData.extraDescriptions.join(',')}
            onChange={handleChange}
            className="updatecardio-input updatecardio-extra-desc"
          />
        </div>
        <div className="mb-3 updatecardio-img-url-input">
          <label className="updatecardio-label">Background Image URL</label>
          <input
            type="text"
            name="backgroundImageUrl"
            value={formData.backgroundImageUrl}
            onChange={handleChange}
            className="updatecardio-input"
          />
        </div>
        <div className="mb-3 updatecardio-img-url-input">
          <label className="updatecardio-label">Inner Image URL</label>
          <input
            type="text"
            name="innerImageUrl"
            value={formData.innerImageUrl}
            onChange={handleChange}
            className="updatecardio-input"
          />
        </div>
        <button type="submit" className="updatecardio-submit-btn">Save</button>
      </form>
    </div>
  );
};

export default UpdateCardio;
