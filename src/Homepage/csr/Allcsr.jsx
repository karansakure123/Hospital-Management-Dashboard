import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import "./style/csr.css";

const Allcsr = () => {
  const [csrData, setCsrData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://hospital-management-backend-4.onrender.com/api/v1/csr/getall')
      .then(response => {
        setCsrData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the CSR data!', error);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/csr/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading("Deleting entry...", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this item?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast);
                try {
                  await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/csr/${id}`);
                  toast.success("Item deleted successfully!");
                  setCsrData(csrData.filter(item => item._id !== id));
                } catch (error) {
                  console.error('There was an error deleting the CSR item!', error);
                  toast.error("Failed to delete the item.");
                }
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(deleteToast);
                toast.error("Delete action canceled.");
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
        position: "top-center",
      }
    );

    confirmToast;
  };

  return (
    <>
      <Toaster position='top-center' />
      <div className="custom-slider-container">
        <div className="csr-container">
          <div className="csr-heading">CSR Section</div>
          <div>
            <button className='csr-addbtn'>Add new CSR</button>
          </div>
        </div>

        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {csrData.map((item, index) => (
              <div key={item._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="hsec5-card row">
                  <div className="sec5himg col-12  col-md-6">
                    <img src={item.img} alt={`Card ${index + 1}`} className="img-fluid sec5-img" />
                  </div>
                  <div className="hsec5-text col-12 col-md-6">
                    <h1>{item.heading || 'Default Heading'}</h1>
                    <p>{item.description}</p>
                    <button onClick={() => handleUpdate(item._id)} className="btn updatecsr-btn">Update</button>
                    <button onClick={() => handleDelete(item._id)} className="btn deletecsr-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-none d-md-block">
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-icon" aria-hidden="true">
                <svg width="24" height="24" fill="green" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-icon" aria-hidden="true">
                <svg width="36" height="26" fill="green" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allcsr;
