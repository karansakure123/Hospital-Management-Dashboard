import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './style/addacc.css';
import { useNavigate } from 'react-router-dom';

const AddAccreditation = () => {
  const [formData, setFormData] = useState({
    accTitle: '',
    accDesc1: '',
    accDesc2: '',
    accImg: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate(); // Initialize navigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/about/accreditation/addnew', formData);
      if (response.data.success) { // Ensure the API returns success status
        toast.success('Accreditation added successfully!');
        setFormData({ accTitle: '', accDesc1: '', accDesc2: '', accImg: '' }); // Reset form
        navigate('/about/accredetation/getall'); // Redirect after success
      } else {
        toast.error('Failed to add accreditation!');
      }
    } catch (error) {
      toast.error('Failed to add accreditation!');
    }
  };

  return (
    <div className="addacc-container">
      <h2 className='addacc-title'>Add New Accreditation</h2>
      <form className="addacc-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 form-group">
            <label htmlFor="accTitle">Accreditation Title</label>
            <input
              type="text"
              id="accTitle"
              name="accTitle"
              value={formData.accTitle}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-12 form-group">
            <label htmlFor="accDesc1">Description 1</label>
            <textarea
              id="accDesc1"
              name="accDesc1"
              value={formData.accDesc1}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-12 form-group">
            <label htmlFor="accDesc2">Description 2</label>
            <textarea
              id="accDesc2"
              name="accDesc2"
              value={formData.accDesc2}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-12 form-group">
            <label htmlFor="accImg">Image URL</label>
            <input
              type="text"
              id="accImg"
              name="accImg"
              value={formData.accImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="submit-btn">Add Accreditation</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAccreditation;
