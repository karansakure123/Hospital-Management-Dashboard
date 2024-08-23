import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './style/about.css'; // Ensure this path is correct

const UpdateAccreditation = () => {
  const { id } = useParams(); // Extract ID from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accTitle: '',
    accDesc1: '',
    accDesc2: '',
    accImg: '', // This will hold the image URL
  });

  useEffect(() => {
    const fetchAccreditation = async () => {
      if (!id) {
        toast.error("Invalid accreditation ID.");
        navigate('/about/accreditation/all');
        return;
      }

      try {
        const response = await axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/about/accreditation/get/${id}`);
        console.log(response.data); // Log the response to check its structure

        const { accrediation } = response.data;

        if (accrediation) {
          const { accTitle, accDesc1, accDesc2, accImg } = accrediation;
          setFormData({
            accTitle: accTitle || '',
            accDesc1: accDesc1 || '',
            accDesc2: accDesc2 || '',
            accImg: accImg || '', // Set image URL if available
          });
        } else {
          toast.error("Accreditation details not found.");
          navigate('/about/accreditation/all');
        }
      } catch (error) {
        console.error("Error fetching accreditation details:", error.response ? error.response.data : error.message);
        toast.error("Error fetching accreditation details!");
        navigate('/about/accreditation/all');
      }
    };

    fetchAccreditation();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://hospital-management-backend-3.onrender.com/api/v1/about/accreditation/${id}`, {
        accTitle: formData.accTitle,
        accDesc1: formData.accDesc1,
        accDesc2: formData.accDesc2,
        accImg: formData.accImg, // Send the image URL here
      });
      toast.success("Accreditation updated successfully!");
      navigate('/about/accredetation/getall');
    } catch (error) {
      console.error("Error updating accreditation:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || 'Failed to update accreditation!');
    }
  };

  return (
    <div className="update-form-container">
       <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="accTitle">Accreditation Title</label>
          <input
            type="text"
            id="accTitle"
            name="accTitle"
            value={formData.accTitle || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accDesc1">Accreditation Description 1</label>
          <textarea
            id="accDesc1"
            name="accDesc1"
            value={formData.accDesc1 || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accDesc2">Accreditation Description 2</label>
          <textarea
            id="accDesc2"
            name="accDesc2"
            value={formData.accDesc2 || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accImg">Accreditation Image URL</label>
          <input
            type="text"
            id="accImg"
            name="accImg"
            value={formData.accImg || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-update">Update Accreditation</button>
      </form>
    </div>
  );
};

export default UpdateAccreditation;
