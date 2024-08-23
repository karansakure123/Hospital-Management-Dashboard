import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Updatecorporate = () => {
  const [formData, setFormData] = useState({
    corpHeading: '',
    corpDetail: '',
    corpImg: '',
  });

  const { id } = useParams(); // Get the corporate item ID from the route parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCorporateById = async () => {
      try {
        const response = await axios.get(`https://hospital-management-backend-3.onrender.com/api/v1/about/corporate/get/${id}`);
        const corporate = response.data.corporate;

        setFormData({
          corpHeading: corporate.corpHeading || '',
          corpDetail: corporate.corpDetail || '',
          corpImg: corporate.corpImg || '',
        });
      } catch (error) {
        console.error("Error fetching corporate details:", error);
        toast.error("Failed to fetch corporate details. Please try again later.");
      }
    };

    fetchCorporateById();
  }, [id]);

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
      await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/about/corporate/update/${id}`, formData);
      toast.success('Corporate item updated successfully!');
      navigate('/about/corporate/getall');
    } catch (error) {
      toast.error('Failed to update corporate item!');
    }
  };

  return (
    <div className="update-corporate-container">
      <h2 className="update-corporate-title">Update Corporate Item</h2>
      <form className="update-corporate-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="corpHeading">Corporate Heading</label>
            <input
              type="text"
              id="corpHeading"
              name="corpHeading"
              value={formData.corpHeading}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="corpDetail">Corporate Detail</label>
            <input
              type="text"
              id="corpDetail"
              name="corpDetail"
              value={formData.corpDetail}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 form-group">
            <label htmlFor="corpImg">Image URL</label>
            <input
              type="text"
              id="corpImg"
              name="corpImg"
              value={formData.corpImg}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="submit-btn">Update Corporate Item</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Updatecorporate;
