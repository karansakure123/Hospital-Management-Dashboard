import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './style/nav.css';

const Addnavbar = () => {
  const [navLogo, setNavLogo] = useState('');
  const [navItems, setNavItems] = useState([{ name: '', link: '', className: '' }]); // Added className
  const navigate = useNavigate();  // Initialize useNavigate

  const handleNavItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...navItems];
    items[index][name] = value;
    setNavItems(items);
  };

  const handleAddNavItem = () => {
    setNavItems([...navItems, { name: '', link: '', className: '' }]); // Added className
  };

  const handleRemoveNavItem = (index) => {
    const items = [...navItems];
    items.splice(index, 1);
    setNavItems(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navLogo || navItems.some(item => !item.name || !item.link || !item.className)) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/navbar/addnew', {
        navLogo,
        navItems
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setNavLogo('');
        setNavItems([{ name: '', link: '', className: '' }]); // Reset form after successful submission
        navigate('/navbar');  // Redirect to /navbar page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating navbar');
    }
  };

  return (
    <div className="add-navbar-parent">
      <Toaster position="top-center" />
      <div className="add-navbar-container">
        <form className="add-navbar-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="navLogo">Navbar Logo URL</label>
            <input
              type="text"
              id="navLogo"
              name="navLogo"
              value={navLogo}
              onChange={(e) => setNavLogo(e.target.value)}
              placeholder="Enter logo URL"
            />
          </div>

          <h4>Navbar Items</h4>
          {navItems.map((item, index) => (
            <div key={index} className="nav-item-group">
              <div className="form-group">
                <label htmlFor={`name-${index}`}>Name</label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={item.name}
                  onChange={(e) => handleNavItemChange(index, e)}
                  placeholder="Enter item name"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`link-${index}`}>Link</label>
                <input
                  type="text"
                  id={`link-${index}`}
                  name="link"
                  value={item.link}
                  onChange={(e) => handleNavItemChange(index, e)}
                  placeholder="Enter item link"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`className-${index}`}>Class Name</label>
                <input
                  type="text"
                  id={`className-${index}`}
                  name="className"
                  value={item.className}
                  onChange={(e) => handleNavItemChange(index, e)}
                  placeholder="Enter item class name"
                />
              </div>
              {navItems.length > 1 && (
                <button type="button" onClick={() => handleRemoveNavItem(index)} className="nav-remove">
                  Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={handleAddNavItem} className="nav-addbtn1">
            Add Another Navbar Item
          </button>

          <button type="submit" className="nav-remove">
            Create Navbar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnavbar;
