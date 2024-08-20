import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import axios from "axios";

const Addortho = () => {
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
      const response = await axios.post('https://hospital-management-backend-3.onrender.com/api/v1/orthopedics/addnew', {
        title,
        description,
        additionalInfo,
        extraDescriptions,
        backgroundImageUrl,
        innerImageUrl,
      });

      if (response.status === 201) {
        toast.success('Orthopedics Service created successfully!');
        navigate('/orthopedics/getall');
      }
    } catch (error) {
      toast.error('Failed to create service: ' + error.message);
    }
  };

  return (
    <div className="addortho-container">
      <Toaster />
      <h2 className="addortho-title">Add Orthopedics Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="addortho-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="addortho-input"
          />
        </div>
        <div className="mb-3">
          <label className="addortho-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="addortho-textarea"
          />
        </div>
        <div className="mb-3">
          <label className="addortho-label">Additional Info</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
            className="addortho-textarea"
          />
        </div>

        <div className="mb-3">
          <label className="addortho-label">Extra Descriptions</label>
          {extraDescriptions.map((desc, index) => (
            <div key={index} className="mb-3">
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="Enter additional description"
                className="addortho-textarea"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddDescription} className="addortho-submit-btn">
            Add More Description
          </button>
        </div>

        <div className="mb-3 addortho-img-url-input">
          <label className="addortho-label">Background Image URL</label>
          <input
            type="url"
            value={backgroundImageUrl}
            onChange={(e) => setBackgroundImageUrl(e.target.value)}
            required
            className="addortho-input"
          />
        </div>
        <div className="mb-3 addortho-img-url-input">
          <label className="addortho-label">Inner Image URL</label>
          <input
            type="url"
            value={innerImageUrl}
            onChange={(e) => setInnerImageUrl(e.target.value)}
            required
            className="addortho-input"
          />
        </div>
        <button type="submit" className="addortho-submit-btn">Create Service</button>
      </form>
    </div>
  );
};

export default Addortho;
