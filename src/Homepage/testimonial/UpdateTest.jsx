import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./testi.css"; 
 

const UpdateTest = () => {
  const { id } = useParams(); // Get the testimonial ID from the URL
  const [testimonial, setTestimonial] = useState({
    name: '',
    message: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/testimonial/get/${id}`);
        setTestimonial(response.data);
      } catch (error) {
        toast.error('Failed to fetch testimonial details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/testimonial/update/${id}`, testimonial);
      toast.success('Testimonial updated successfully!');
      navigate('/testimonials/getall'); // Redirect after successful update
    } catch (error) {
      toast.error('Failed to update testimonial.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-test-container">
      <h2>Update Testimonial</h2>
      <form onSubmit={handleSubmit} className="update-test-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={testimonial.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={testimonial.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={testimonial.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateTest;
