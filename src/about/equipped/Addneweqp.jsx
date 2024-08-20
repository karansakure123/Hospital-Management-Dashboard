import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style/addeqp.css';

const Addneweqp = () => {
  const [formData, setFormData] = useState({
    eqpHeading: '',
    eqpTitle: '',
    eqpImg: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hospital-management-backend-3.onrender.com/api/v1/about/equipped/addnew', formData);
      toast.success('Equipped item added successfully!');
      setFormData({ eqpHeading: '', eqpTitle: '', eqpImg: '' }); // Reset form
      navigate('/path-to-navigate'); // Change this to your desired route
    } catch (error) {
      toast.error('Failed to add equipped item!');
    }
  };

  return (
    <div className="containe">

  
    <div className="addeqp-container">
      <h2 className='addeqp-title'>Add New Equipped Item</h2>
      <form className="addeqp-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="eqpHeading">Equipped Heading</label>
            <input
              type="text"
              id="eqpHeading"
              name="eqpHeading"
              value={formData.eqpHeading}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="eqpTitle">Equipped Title</label>
            <input
              type="text"
              id="eqpTitle"
              name="eqpTitle"
              value={formData.eqpTitle}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="eqpImg">Image URL</label>
            <input
              type="text"
              id="eqpImg"
              name="eqpImg"
              value={formData.eqpImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="submit-btn">Add Equipped Item</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Addneweqp;
