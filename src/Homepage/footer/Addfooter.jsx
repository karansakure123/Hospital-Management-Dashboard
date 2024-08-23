import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import "./style/footer.css";

const Addfooter = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ name: '', url: '' }]);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleItemChange = (index, event) => {
    const newItems = items.slice();
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', url: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hospital-management-backend-4.onrender.com/api/v1/footer/addnew', {
        title,
        items,
      });

      // Ensure the response status is 201 (created) for successful addition
      if (response.status === 201) {
        toast.success('Footer link added successfully!');
        setTitle('');
        setItems([{ name: '', url: '' }]); // Reset the form
        navigate('/footer/getall');  // Redirect to the footer list page
      } else {
        toast.error('Failed to add footer link.'); // Error message for other status codes
      }
    } catch (error) {
      toast.error('Failed to add footer link.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="addfooter-container mt-4">
      <h2 className="addfooter-title">Add Footer Link</h2>
      <form onSubmit={handleSubmit} className="addfooter-form">
        <div className="addfooter-field mb-3">
          <label className="addfooter-label">Title</label>
          <input
            type="text"
            className="addfooter-inp form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {items.map((item, index) => (
  <div key={index} className="addfooter-item mb-3">
    <label className="addfooter-item-label">Item {index + 1}</label>
    <div className="addfooter-input-group input-group">
      <input
        type="text"
        className="addfooter-inp form-control"
        name="name"
        placeholder="Name"
        value={item.name}
        onChange={(e) => handleItemChange(index, e)}
        required
      />
      <input
        type="url"
        className="addfooter-inp form-control"
        name="url"
        placeholder="URL"
        value={item.url}
        onChange={(e) => handleItemChange(index, e)}
         
      />
      <button type="button" className="addfooter-btn-remove btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
    </div>
  </div>
))}
        <button type="button" className="addfooter-btn-add btn btn-secondary mb-3" onClick={handleAddItem}>
          Add Another Item
        </button>

        <button type="submit" className="addfooter-btn-submit btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Addfooter;
