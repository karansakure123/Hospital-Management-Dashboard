import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

const Updatewhowe = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [formData, setFormData] = useState({
    sectionTitle: '',
    para1: '',
    para2: '',
    para3: '',
    buttonLabel: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/whowe/get/${id}`);
        if (response.data.success && response.data.whoWeAre) {
          setFormData(response.data.whoWeAre);
        } else {
          toast.error("Failed to fetch the details.");
        }
      } catch (error) {
        toast.error("Error fetching details.");
      }
    };

    fetchData();
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
      const response = await axios.put(`http://localhost:3000/api/v1/whowe/update/${id}`, formData);
      if (response.data.success) {
        toast.success("Updated successfully!");
        navigate('/whowe/getall'); // Redirect to the getall page
      } else {
        toast.error("Failed to update.");
      }
    } catch (error) {
      toast.error("Error updating details.");
    }
  };

  return (
    <div className="update-whowe-sec p-4">
      <Toaster position="top-center" />
      <h2 className="update-heading">Update Who We Are Section</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sectionTitle">Section Title</label>
          <input
            type="text"
            name="sectionTitle"
            value={formData.sectionTitle}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="para1">Paragraph 1</label>
          <textarea
            name="para1"
            value={formData.para1}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="para2">Paragraph 2</label>
          <textarea
            name="para2"
            value={formData.para2}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="para3">Paragraph 3</label>
          <textarea
            name="para3"
            value={formData.para3}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="buttonLabel">Button Label</label>
          <input
            type="text"
            name="buttonLabel"
            value={formData.buttonLabel}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-update">Update</button>
      </form>
    </div>
  );
};

export default Updatewhowe;
