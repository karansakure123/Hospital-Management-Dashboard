import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style/alldirector.css';

const UpdateDirector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const director = location.state?.director;

  const [formData, setFormData] = useState({
    dircHeading: director?.dircHeading || '',
    dircSpeciality: director?.dircSpeciality || '',
    dircImg: director?.dircImg || '',
  });

  useEffect(() => {
    if (!director) {
      toast.error("No director data provided for update!");
      navigate('/about/director/getall');
    }
  }, [director, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/about/director/update/${director._id}`, formData);
      toast.success("Director updated successfully!");
      navigate('/about/director/getall');
    } catch (error) {
      console.error("Error updating director:", error);
      toast.error("Failed to update director!");
    }
  };

  return (
    <div className="update-director-container">
      <h1 className="update-director-title">Update Director</h1>
      <form onSubmit={handleSubmit} className="update-director-form">
        <div className="form-group">
          <label htmlFor="dircHeading">Heading</label>
          <input
            type="text"
            id="dircHeading"
            name="dircHeading"
            value={formData.dircHeading}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dircSpeciality">Speciality</label>
          <input
            type="text"
            id="dircSpeciality"
            name="dircSpeciality"
            value={formData.dircSpeciality}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
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
        <div className="sec2-card-buttons">
          <button type="submit" className="btn-update">Update</button>
          <button type="button" className="btn-delete" onClick={() => navigate('/about/director/getall')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDirector;
