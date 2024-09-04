import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Allwhowe = () => {
  const [whoWeAreSections, setWhoWeAreSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/whowe/getall ');
        console.log("API Response:", response.data);
        if (response.data.success && Array.isArray(response.data.whoWeAreSections)) {
          setWhoWeAreSections(response.data.whoWeAreSections);
        } else {
          toast.error("Unexpected response structure from the API.");
        }
      } catch (error) {
        toast.error("Failed to fetch 'Who We Are' sections. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/whowe/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading("Deleting entry...", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this 'Who We Are' section?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast); 
                try {
                  await axios.delete(`http://localhost:3000/api/v1/whowe/delete/${id}`);
                  toast.success("'Who We Are' section deleted successfully!");
                  setWhoWeAreSections(whoWeAreSections.filter(item => item._id !== id));
                } catch (error) {
                  toast.error("Failed to delete 'Who We Are' section.");
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

  const addNewWhoWeAre = () => {
    navigate('/whowe/addnew'); 
  };

  return (
    <div className="whowe-sec p-2">
      <Toaster position="top-center" />
      <div className="container-fluid">
        <div className="whowe-heading mt-3">
          <h2>Who We Are</h2>
        </div>
        
        <hr />
        <div className="row">
          {whoWeAreSections.length > 0 ? (
            whoWeAreSections.map((section) => (
              <div key={section._id} className="col-md-12 mb-4">
                <div className="whowe-card d-flex flex-column flex-md-row">
                  <div className="col-12  p-3">
                    <div className="whowe-title">
                      <h1>{section.sectionTitle}</h1>
                      <p>{section.para1}</p>
                      <p>{section.para2}</p>
                      <p>{section.para3}</p>
                      <button className="btn-learn-more">{section.buttonLabel}</button>
                    </div>
                    <div className="button-group mt-5">
                      <button className="btn-update" onClick={() => handleUpdate(section._id)}>Update</button>
                      <button className="btn-delete" onClick={() => handleDelete(section._id)}>Delete</button>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                   </div>
                </div>
                <br />
                <hr />
                <br />
              </div>
            ))
          ) : (
            <div>No data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allwhowe;
