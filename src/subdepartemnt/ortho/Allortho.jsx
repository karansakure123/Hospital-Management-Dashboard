import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Allortho = () => {
  const [orthoServices, setOrthoServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrthoServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/orthopedics/getall');
        setOrthoServices(response.data); 
      } catch (error) {
        console.error('Error fetching ortho services:', error);
        toast.error('Failed to fetch ortho services. Please try again later.');
      }
    };

    fetchOrthoServices();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/orthopedics/update/${id}`);
  };

  const handleDelete = (id) => {
    if (!id) return;

    toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:3000/api/v1/orthopedics/delete/${id}`);
                toast.success("Item deleted successfully!");
                setOrthoServices((prevData) => prevData.filter(item => item._id !== id));
              } catch (error) {
                console.error('There was an error deleting the item!', error);
                toast.error("Failed to delete the item.");
              }
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              toast.error("Delete action canceled.");
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="allortho-container">
      <div className="container mt-4">
        <h2 className="text-center mb-4 allortho-title">All Orthopedics Services</h2>
        <div className="row">
          {orthoServices.map((service) => (
            <div className="col-md-12 mb-4" key={service._id}>
              <div className="card allortho-card shadow-sm border-light">
                <img src={service.backgroundImage} className="card-img-top allortho-background-image" alt={service.title} />
                <div className="card-body d-flex">
                  <div className="col-md-6">
                    <img src={service.innerImage} className="img-fluid allortho-inner-image" alt={service.title} />
                  </div>
                  <div className="col-md-6">
                    <h5 className="card-title allortho-title">{service.title}</h5>
                    <p className="card-text allortho-description">{service.description}</p>
                    <p className="card-text"><small className="text-muted">{service.additionalInfo}</small></p>
                  </div>
                </div>
                <div className="card-footer">
                  <button 
                    className="btn btn-primary allortho-update-btn"  
                    onClick={() => handleUpdate(service._id)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-danger allortho-delete-btn"  
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allortho;
