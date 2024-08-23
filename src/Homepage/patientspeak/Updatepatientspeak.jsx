import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Updatepatientspeak = () => {
  const [patientSpeak, setPatientSpeak] = useState({ name: '', text: '', videoUrl: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters

  useEffect(() => {
    const fetchPatientSpeak = async () => {
      try {
        const response = await axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/patientspeak/get/${id}`);
        setPatientSpeak(response.data);
      } catch (error) {
        console.error('Error fetching patient speak:', error);
        toast.error('Failed to fetch patient speak details');
      }
    };

    fetchPatientSpeak();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientSpeak((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/patientspeak/update/${id}`, patientSpeak);
      toast.success('Patient speak updated successfully!');
      navigate('/patientspeak/getall'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating patient speak:', error);
      toast.error('Failed to update patient speak');
    }
  };

  return (
    <div className="update-patient-speak">
      <ToastContainer />
      <div className="container">
        <h1 className="text-center mb-4">Update Patient Speak</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={patientSpeak.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Testimonial</label>
            <textarea
              className="form-control"
              id="text"
              name="text"
              value={patientSpeak.text}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="videoUrl" className="form-label">Video URL</label>
            <input
              type="text"
              className="form-control"
              id="videoUrl"
              name="videoUrl"
              value={patientSpeak.videoUrl}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn updatebtn-speak">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Updatepatientspeak;
