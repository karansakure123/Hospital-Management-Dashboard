import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './style/footer.css'; // Ensure you create this CSS file for styling

const Updatefooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [footerLink, setFooterLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = `https://hospital-management-backend-4.onrender.com/api/v1/footer/get/${id}`;

  // Fetch existing footer link details
  const fetchFooterLink = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFooterLink(data);
    } catch (error) {
      console.error('Error fetching footer link:', error.message);
      toast.error('Failed to fetch footer link.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterLink();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hospital-management-backend-4.onrender.com/api/v1/footer/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footerLink),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success('Footer link updated successfully');
      navigate('/footer/getall');
    } catch (error) {
      console.error('Error updating footer link:', error.message);
      toast.error('Error updating footer link');
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="update-footer-container">
      <h1 className="update-footer-title">Update Footer Link</h1>
      {footerLink ? (
        <form className="update-footer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input 
              id="title"
              type="text" 
              value={footerLink.title} 
              onChange={(e) => setFooterLink({ ...footerLink, title: e.target.value })} 
              className="form-input" 
              placeholder="Enter title"
            />
          </div>
          <div className="form-group">
            <h3 className='item-h'>Items:</h3>
            {footerLink.items.map((item) => (
              <div key={item._id} className="item-container">
                <input 
                  type="text" 
                  value={item.name} 
                  onChange={(e) => {
                    const updatedItems = footerLink.items.map(i => 
                      i._id === item._id ? { ...i, name: e.target.value } : i
                    );
                    setFooterLink({ ...footerLink, items: updatedItems });
                  }} 
                  className="form-input" 
                  placeholder="Enter item name"
                />
                <input 
                  type="url" 
                  value={item.url} 
                  onChange={(e) => {
                    const updatedItems = footerLink.items.map(i => 
                      i._id === item._id ? { ...i, url: e.target.value } : i
                    );
                    setFooterLink({ ...footerLink, items: updatedItems });
                  }} 
                  className="form-input" 
                  placeholder="Enter item URL"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="update-footer-button">Update</button>
        </form>
      ) : (
        <div className="not-found-message">Footer link not found</div>
      )}
    </div>
  );
};

export default Updatefooter;
