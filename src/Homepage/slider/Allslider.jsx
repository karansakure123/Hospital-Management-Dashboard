import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './style.css';

const Allslider = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-3.onrender.com/api/v1/hero/getall');
        setHeroSections(response.data.heroes || []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching hero sections');
        setLoading(false);
      }
    };

    fetchHeroSections();
  }, []);

  const handleUpdateClick = (hero) => {
    navigate(`/hero/update/${hero._id}`);
  };

  const handleDelete = (id) => {
    const confirmToast = toast.loading("Confirming deletion...", {
      duration: 0,
    });

    toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              toast.dismiss(confirmToast);
              try {
                await axios.delete(`https://hospital-management-backend-3.onrender.coms/api/v1/hero/delete/${id}`);
                toast.success("Item deleted successfully!");
                setHeroSections((prevSections) => prevSections.filter(hero => hero._id !== id));
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
              toast.dismiss(confirmToast);
              toast.error("Delete action canceled.");
              toast.dismiss(t.id);
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="hero-sec1">
      <div id="heroSlider" className="carousel slide homepage-carousel" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          {heroSections.map((hero, index) => (
            <div key={hero._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={hero.sliderImg} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-md-block">
                <button onClick={() => handleUpdateClick(hero)} className="hero-update-btn">Update</button>
                <button onClick={() => handleDelete(hero._id)} className="hero-delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
         <div className="carousel-controls">
         <div className="carousel-controls">
   <button className="hero-carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="36" 
      height="36" 
      fill="white" 
      className="prev-icon">
      <path d="M15.5 19L8.5 12l7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span className="visually-hidden">Previous</span>
  </button>
  
   <button className="hero-carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="36" 
      height="36" 
      fill="white" 
      className="next-icon">
      <path d="M8.5 19l7-7-7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>


      </div>
    </section>
  );
};

export default Allslider;
