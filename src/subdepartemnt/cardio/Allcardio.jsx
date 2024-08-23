import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style.css';

const AllCardio = () => {
  const [cardioServices, setCardioServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardioServices = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/cardiology/getall');
        setCardioServices(response.data); // Assuming response.data contains the array of services
      } catch (error) {
        console.error('Error fetching cardio services:', error);
        toast.error('Failed to fetch cardio services. Please try again later.');
      }
    };

    fetchCardioServices();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/cardiology/update/${id}`);
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
                await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/cardiology/delete/${id}`);
                toast.success("Item deleted successfully!");
                setExpCardsData((prevData) => prevData.filter(item => item._id !== id));
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
    <div className="cardio">

    <div className="container mt-4">
      <h2 className="text-center mb-4">All Cardiology Services</h2>
      <div className="row">
        {cardioServices.map((service) => (
          <div className="col-md-12 mb-4" key={service._id}>
            <div className="card cardio-card shadow-sm border-light">
              <img src={service.backgroundImage} className="card-img-top cardio-background-image" alt={service.title} />
              <div className="card-body d-flex">
                <div className="col-md-6">
                  <img src={service.innerImage} className="img-fluid cardio-inner-image" alt={service.title} />
                </div>
                <div className="col-md-6">
                  <h5 className="card-title cardio-title">{service.title}</h5>
                  <p className="card-text cardio-description">{service.description}</p>
                  <p className="card-text"><small className="text-muted">{service.additionalInfo}</small></p>
                </div>
              </div>
              <div className="card-footer  ">
                <button 
                  className="btn btn-primary cardio-update-btn"
                  onClick={() => handleUpdate(service._id)}
                >
                  Update
                </button>
                <button 
                  className="btn btn-danger cardio-delete-btn"
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

export default AllCardio;
