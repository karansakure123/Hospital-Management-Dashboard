import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import toast from 'react-hot-toast';
import axios from 'axios';  // Make sure axios is imported

const Allblog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/blog/getall');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/blog/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading('Deleting entry...', {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <p>Are you sure you want to delete this item?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast);
                try {
                  // Make the DELETE request to your API
                  const response = await axios.delete(`http://localhost:3000/api/v1/blog/delete/${id}`);
                  if (response.status === 200) {
                    toast.success('Blog deleted successfully!');
                    setBlogs(blogs.filter((blog) => blog._id !== id)); // Update the state
                  }
                } catch (error) {
                  console.error('There was an error deleting the Blog item!', error);
                  toast.error('Failed to delete the item.');
                }
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(deleteToast);
                toast.error('Delete action canceled.');
                toast.dismiss(t.id);
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );

    confirmToast;
  };

  return (
    <section className="blog">
      <div className="container">
        <div className="row">
          <div className="blog-heading">
            <h1>Our Latest Blog</h1>
          </div>
          {blogs.map((blog) => (
            <div className="col-md-6" key={blog._id}>
              <div className="blog-card">
                <div className="blog-card-img">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-text">
                    <div className="blog-meta">
                      <p className="date">{new Date(blog.date).toLocaleDateString()}</p>
                      <p className="author">By {blog.author}</p>
                    </div>
                    <h5 className="title">{blog.title}</h5>
                    <p className="excerpt">
                      {blog.excerpt} <a href="#" className="blog-readmore">Read More</a>
                    </p>
                    <div className="blog-actions">
                      <button onClick={() => handleUpdate(blog._id)} className="btn updatebtn-blog">Update</button>
                      <button onClick={() => handleDelete(blog._id)} className="btn deletebtn-blog">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Allblog;
