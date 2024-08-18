import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './style.css'; // Import your specific CSS file

const Addnewblog = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newBlog = { title, excerpt, author, image };
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/blog/addnew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        toast.success('Blog added successfully!');
        navigate('/blog/getall'); // Redirect to the blog list
      } else {
        throw new Error('Failed to add blog');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="addnew">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Excerpt</label>
          <textarea 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-btn">Add Blog</button>
      </form>
      <Toaster />
    </div>
  );
}

export default Addnewblog;
