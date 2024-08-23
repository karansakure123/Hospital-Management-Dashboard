import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import axios from "axios";

const AddCardio = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [extraDescriptions, setExtraDescriptions] = useState(['']);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [innerImageUrl, setInnerImageUrl] = useState('');
  const navigate = useNavigate();

  const handleAddDescription = () => {
    setExtraDescriptions([...extraDescriptions, '']);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...extraDescriptions];
    updatedDescriptions[index] = value;
    setExtraDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/cardiology/addnew', {
        title,
        description,
        additionalInfo,
        extraDescriptions,
        backgroundImageUrl,
        innerImageUrl,
      });

      if (response.status === 201) {
        toast.success('Cardiology Service created successfully!');
        navigate('/cardilogy/getall');
      }
    } catch (error) {
      toast.error('Failed to create service: ' + error.message);
    }
  };

  return (
    <div className="add-service-container">
      <Toaster />
      <h2 className="text-primary">Add Cardiology Service</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Additional Info:</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
            className="form-textarea"
          />
        </div>

        <div className="extra-descriptions">
          <label className="form-label">Extra Descriptions:</label>
          {extraDescriptions.map((desc, index) => (
            <div key={index} className="form-group">
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="Enter additional description"
                className="form-textarea"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddDescription} className="add-description-button">
            Add More Description
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Background Image URL:</label>
          <input
            type="url"
            value={backgroundImageUrl}
            onChange={(e) => setBackgroundImageUrl(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Inner Image URL:</label>
          <input
            type="url"
            value={innerImageUrl}
            onChange={(e) => setInnerImageUrl(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Create Service</button>
      </form>
    </div>
  );
};

export default AddCardio;
