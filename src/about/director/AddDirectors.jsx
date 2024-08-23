import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './style/adddir.css';

const AddDirectors = () => {
  const [formData, setFormData] = useState({
    dircTitle: '',
    dircDesc1: '',
    dircDesc2: '',
    dircImg: '',
  });

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
      await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/about/directors/addnew', formData);
      toast.success('Directors added successfully!');
      setFormData({ dircTitle: '', dircDesc1: '', dircDesc2: '', dircImg: '' }); // Reset form
    } catch (error) {
      toast.error('Failed to add Directors!');
    }
  };

  return (
    <div className="adddirc-container">
      <h2 className='adddirc-title '>Add New Director</h2>
      <form className="adddirc-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="dircTitle">Director Title</label>
            <input
              type="text"
              id="dircTitle"
              name="dircTitle"
              value={formData.dircTitle}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="dircDesc1"> Director Heading</label>
            <textarea
              id="dircDesc1"
              name="dircDesc1"
              value={formData.dircDesc1}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="dircDesc2">Director Speciality</label>
            <textarea
              id="dircDesc2"
              name="dircDesc2"
              value={formData.dircDesc2}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="dircImg">Image URL</label>
            <input
              type="text"
              id="dircImg"
              name="dircImg"
              value={formData.dircImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="submit-btn">Add Director</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDirectors;
