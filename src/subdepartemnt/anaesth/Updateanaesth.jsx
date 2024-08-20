import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Updateanaesth = () => {
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
        const response = await fetch(`https://hospital-management-backend-3.onrender.com/api/v1/anaesthesio/get/${id}`);
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
      const response = await fetch(`https://hospital-management-backend-3.onrender.com/api/v1/anaesthesio/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      toast.success('Anaesthesia service updated successfully!');
      navigate('/anaesth/getall');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating the service. Please try again.');
    }
  };

  return (
    <div className="updateanaesth-container">
      <h2 className="updateanaesth-title">Update Anaesthesia Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="updateanaesth-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="updateanaesth-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updateanaesth-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="updateanaesth-textarea"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updateanaesth-label">Additional Info</label>
          <input
            type="text"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="updateanaesth-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="updateanaesth-label">Extra Descriptions (comma-separated)</label>
          <input
            type="text"
            name="extraDescriptions"
            value={formData.extraDescriptions.join(',')}
            onChange={handleChange}
            className="updateanaesth-input updateanaesth-extra-desc"
          />
        </div>
        <div className="mb-3 updateanaesth-img-url-input">
          <label className="updateanaesth-label">Background Image URL</label>
          <input
            type="text"
            name="backgroundImageUrl"
            value={formData.backgroundImageUrl}
            onChange={handleChange}
            className="updateanaesth-input"
          />
        </div>
        <div className="mb-3 updateanaesth-img-url-input">
          <label className="updateanaesth-label">Inner Image URL</label>
          <input
            type="text"
            name="innerImageUrl"
            value={formData.innerImageUrl}
            onChange={handleChange}
            className="updateanaesth-input"
          />
        </div>
        <button type="submit" className="updateanaesth-submit-btn">Save</button>
      </form>
    </div>
  );
};

export default Updateanaesth;
