import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast'; // Import Toaster and toast
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Allpatientspeak = () => {
  const [patientSpeaks, setPatientSpeaks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPatientSpeaks = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/patientspeak/getall');
        setPatientSpeaks(response.data);
      } catch (error) {
        console.error('Error fetching patient speaks:', error);
      }
    };

    fetchPatientSpeaks();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/patientspeak/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading("Deleting entry...", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this patient speak?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast); // Dismiss the loading toast
                try {
                  await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/patientspeak/delete/${id}`);
                  toast.success("Patient speak deleted successfully!");
                  setPatientSpeaks(patientSpeaks.filter((speak) => speak._id !== id)); // Update state to remove the deleted item
                } catch (error) {
                  toast.error("Failed to delete patient speak.");
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

  const handleAdd = () => {
    navigate(`/patientspeak/addnew/`);
  };

  return (
    <div className="sec7-pspeak">
      <Toaster position="top-center" />
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4 d-flex justify-content-between align-items-center p-3 mt-3">
            <h1 className="pspeak-heading">Patient Speaks</h1>
            <button className='addnewspeakbtn' onClick={handleAdd}>Add New Patient Speak</button>
          </div>

          {patientSpeaks.map((speak) => (
            <div className="col-md-6 mb-4" key={speak._id}>
              <div className="sec7-card">
                <div className="sec7-video">
                  <iframe
                    src={speak.videoUrl}
                    title={speak.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '300px' }}
                  ></iframe>
                  <div className="card-text-sec7 text-center">
                    <h5>{speak.text}</h5>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-2 button-container">
                  <button onClick={() => handleUpdate(speak._id)} className="btn update-speak me-2">
                    Update
                  </button>
                  <button onClick={() => handleDelete(speak._id)} className="btn delete-speak">
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

export default Allpatientspeak;
