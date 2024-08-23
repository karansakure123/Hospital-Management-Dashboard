import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'react-icons/fa'; // Import all icons from FontAwesome
import { toast, Toaster } from 'react-hot-toast'; // Import toast notifications
import './style.css';

const Allhealth = () => {
  const [healthData, setHealthData] = useState([]);
  const navigate = useNavigate();

  // Fetch health data on component mount
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/health/getall');
        setHealthData(response.data); // Assuming the data is returned in the response body
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };

    fetchHealthData();
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const confirmToast = toast.loading("Are you sure you want to delete this item?", {
      duration: 0,
    });

    // Show custom toast for confirmation
    toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              toast.dismiss(confirmToast); // Dismiss confirmation toast
              try {
                await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/health/delete/${id}`);
                toast.success("Item deleted successfully!");
                setHealthData((prevData) => prevData.filter(item => item._id !== id)); // Update state to remove deleted item
              } catch (error) {
                console.error('There was an error deleting the item!', error);
                toast.error("Failed to delete the item.");
              }
              toast.dismiss(t.id); // Dismiss the custom confirmation toast
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(confirmToast); // Dismiss confirmation toast
              toast.error("Delete action canceled."); // Show cancellation message
              toast.dismiss(t.id); // Dismiss the custom confirmation toast
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity }); // Keep this toast visible until dismissed
  };

  // Navigate to the update page
  const handleUpdate = (id) => {
    navigate(`/health/update/${id}`);
  };

  return (
    <>
      <Toaster position='top-center' />
      <section className='health-cards'>
        <div className="container-fluid">
          <div className="row">
            <div className="heading-health text-center mt-2">
              <h1>Empowering Your Health with Exceptional Care</h1>
            </div>
            {healthData.map((healthItem) => (
              <div className="col-md-3" key={healthItem._id}>
                <div className="health-card">
                  <div className="icon">
                    {/* Render the icon based on the class name stored in the healthItem */}
                    {healthItem.icon && renderIcon(healthItem.icon)}
                  </div>
                  <div className="card-text">
                    <p>{healthItem.title}</p>
                    <p>{healthItem.description}</p>
                    <div className="button-container">
                      <button onClick={() => handleUpdate(healthItem._id)} className="health-btn-update">Update</button>
                      <button onClick={() => handleDelete(healthItem._id)} className="health-btn-delete">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="health-img2">
        <div className="health-container">
          <div className="row">
            <div className="col-12">
              {/* Additional content can be added here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Function to render the icon dynamically
const renderIcon = (iconName) => {
  const IconComponent = Icons[iconName]; // Get the icon component dynamically
  return IconComponent ? <IconComponent /> : null; // Render the icon if it exists
};

export default Allhealth;
