import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './style.css';

const Addslider = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [urlImagePreview, setUrlImagePreview] = useState(null); // For URL image preview
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setImagePreview(null);
      setUrlImagePreview(null); // Clear URL image preview on unmount
    };
  }, [imageFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUrlImagePreview(null); // Clear URL preview if file is selected
    } else {
      setImagePreview(null);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    if (url) {
      setUrlImagePreview(url); // Set the URL image preview
    } else {
      setUrlImagePreview(null); // Clear preview if URL is empty
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append('sliderImg', imageFile);
    } else if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    } else {
      toast.error('Please select an image file or provide an image URL');
      return;
    }

    try {
      const response = await axios.post('https://hospital-management-backend-3.onrender.com/api/v1/hero/addnew', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Slider added successfully!');
        setImageFile(null);
        setImageUrl('');
        setImagePreview(null);
        setUrlImagePreview(null); // Clear URL preview on success

        setTimeout(() => {
          navigate('/hero/getall');
        }, 500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding slider';
      console.error('Error adding slider:', error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="addhero">
      <h2 className="addheroheading">Add New Slider</h2>
      <form onSubmit={handleSubmit} className="addheroform">
       
        {imagePreview && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        )}
        <div className="addheroinput-container">
          <label htmlFor="imageUrl" className="addherolabel">
            Or Enter Image URL
          </label>
          <input
            type="text"
            className="addheroinput"
            id="imageUrl"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Enter image URL"
          />
        </div>
        {urlImagePreview && (
          <div className="image-preview">
            <h3>URL Image Preview:</h3>
            <img src={urlImagePreview} alt="Preview from URL" className="preview-image" />
          </div>
        )}
        <button type="submit" className="addherobtn">
          Add Slider
        </button>
      </form>
    </div>
  );
};

export default Addslider;
