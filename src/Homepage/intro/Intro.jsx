import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Intro = () => {
  const [wecData, setWecData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/intro/get');
        if (response.data.success && Array.isArray(response.data.intros)) {
          setWecData(response.data.intros);
        } else {
          toast.error("Unexpected response structure from the API.");
        }
      } catch (error) {
        toast.error("Failed to fetch intros. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/intro/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading("Deleting entry...", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this intro?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast); // Dismiss the loading toast
                try {
                  await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/intro/delete/${id}`);
                  toast.success("Intro deleted successfully!");
                  setWecData((prevData) => prevData.filter(item => item._id !== id)); // Update state to remove the deleted item
                } catch (error) {
                  toast.error("Failed to delete intro.");
                }
                toast.dismiss(t.id); // Dismiss the confirmation toast
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(deleteToast); // Dismiss the loading toast
                toast.error("Delete action canceled.");
                toast.dismiss(t.id); // Dismiss the confirmation toast
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

    confirmToast; // Show the confirmation toast
  };

  const addNewIntro = () => {
    navigate('/intro/addnew'); // Navigate to the add new intro route
  };

  return (
    <div className="wel-sec p-2">
      <Toaster position="top-center" />
      <div className="container-fluid">
        <div className="intro-heading mt-3">
          <h2>Welcome to our Intro Section</h2>
        </div>
       
        <div className="row">
          {wecData.length > 0 ? (
            wecData.map((item) => (
              <div key={item._id} className="col-md-12 mb-4">
                <div className="welc-card d-flex flex-column flex-md-row">
                  <div className="col-12 col-md-6 p-3">
                    <div className="welc-title">
                      <h1>{item.Heading}</h1>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                    <div className="button-group mt-5">
                      <button className="btn-update" onClick={() => handleUpdate(item._id)}>Update</button>
                      <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <img src={item.imageUrl} alt={item.title} className="img-fluid welc-img" />
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

export default Intro;