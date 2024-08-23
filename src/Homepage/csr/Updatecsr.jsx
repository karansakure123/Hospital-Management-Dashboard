import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import "./style/csr.css";

const Updatecsr = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [csrData, setCsrData] = useState({
    img: '',
    heading: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the existing data when the component mounts
    axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/csr/get/${id}`)
      .then(response => {
        setCsrData(response.data); // Set the fetched data in state
      })
      .catch(error => {
        console.error('There was an error fetching the CSR data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCsrData({
      ...csrData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/csr/update/${id}`, csrData) // Update the CSR data
      .then(response => {
        toast.success("Item updated successfully!"); // Show success toast
        navigate('/csr/getall'); // Redirect to the get all route
      })
      .catch(error => {
        console.error('There was an error updating the CSR item!', error);
        toast.error("Failed to update the item."); // Show error toast
      });
  };

  return (
    <div className="update-csr-container">
      <ToastContainer /> {/* Toast Container for notifications */}
      <h2>Update CSR Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            name="img"
            value={csrData.img}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={csrData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={csrData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn update-btn">Update</button>
      </form>
    </div>
  );
};

export default Updatecsr;
