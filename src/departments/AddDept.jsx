import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; // Import hot-toast
import './style/adddept.css';

const AddDept = () => {
  const [deptHeading, setDeptHeading] = useState('');
  const [deptName, setDeptName] = useState('');
  const [deptBtn, setDeptBtn] = useState('');
  const [deptImage, setDeptImage] = useState('');
  const [isSuccessToastShown, setIsSuccessToastShown] = useState(false); // State for tracking toast visibility

  // Function to validate the image URL
  const isValidImageURL = (url) => {
    const pattern = /\.(jpeg|jpg|gif|png|svg|bmp|webp)$/i; // Regular expression for image URL validation
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image URL
    if (!isValidImageURL(deptImage)) {
      toast.error('Please enter a valid image URL.');
      return;
    }

    const formData = {
      deptHeading,
      deptName,
      deptBtn,
      deptImage,
    };

    try {
      const response = await axios.post('https://hospital-management-backend-1-cl2h.onrender.com/api/v1/departments/addnew', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Show success toast if it hasn't been shown yet
      if (!isSuccessToastShown) {
        toast.success('New department added successfully!');
        setIsSuccessToastShown(true); // Mark toast as shown
      }

      console.log(response.data);
      
      // Reset the form fields
      setDeptHeading('');
      setDeptName('');
      setDeptBtn('');
      setDeptImage('');
    } catch (error) {
      toast.error('Error adding department: ' + (error.response ? error.response.data.message : 'Unknown error'));
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-department-container">
      <h2>Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Heading</label>
          <input
            type="text"
            value={deptHeading}
            onChange={(e) => setDeptHeading(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Department Name</label>
          <input
            type="text"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Button Text</label>
          <input
            type="text"
            value={deptBtn}
            onChange={(e) => setDeptBtn(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Department Image URL</label>
          <input
            type="text"
            value={deptImage}
            onChange={(e) => setDeptImage(e.target.value)}
            placeholder="Enter image URL"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Add Department</button>
      </form>
      <Toaster position="top-center" /> {/* Render the Toaster here */}
    </div>
  );
};

export default AddDept;
