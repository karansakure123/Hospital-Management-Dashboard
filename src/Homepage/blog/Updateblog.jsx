import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
 import "./style.css"
const Updateblog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    excerpt: '',
    author: '',
    date: '',
    image: '',
  });
  const navigate = useNavigate();

  // Fetch the existing blog data based on the ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://hospital-management-backend-4.onrender.com/api/v1/blog/get/${id}`);
        const data = await response.json();
        setBlog({
          title: data.title,
          excerpt: data.excerpt,
          author: data.author,
          date: new Date(data.date).toISOString().split('T')[0], // Format date for input[type="date"]
          image: data.image,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog data.');
      }
    };

    fetchBlog();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hospital-management-backend-4.onrender.com/api/v1/blog/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        toast.success('Blog updated successfully!');
        navigate('/blog/getall');
      } else {
        toast.error('Failed to update blog.');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  return (
    <div className="updateblog-container">
      <Toaster />
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit} className="updateblog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={blog.excerpt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={blog.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={blog.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="updateblog-btn">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default Updateblog;
