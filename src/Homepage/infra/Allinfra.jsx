import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./style.css";

const Allinfra = () => {
  const [infrastructure, setInfrastructure] = useState([]);
  const navigate = useNavigate();

  // Fetch infrastructure data
  const fetchInfrastructure = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/infra/getall');
      setInfrastructure(response.data.infrastructures);
    } catch (error) {
      console.error("Error fetching infrastructure:", error);
    }
  };

  useEffect(() => {
    fetchInfrastructure();
  }, []);

  // Handle delete with confirmation via toast
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this infrastructure?</p>
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => confirmDelete(id, t.id)}
              style={{ marginRight: '10px' }}
              className="btn btn-danger"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-secondary"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Confirm delete action
  const confirmDelete = async (id, toastId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/infra/delete/${id}`);
      toast.success("Infrastructure deleted successfully.", { id: toastId });
      fetchInfrastructure(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
      toast.error("Error deleting infrastructure.", { id: toastId });
    }
  };

  // Handle update navigation
  const handleUpdate = (id) => {
    navigate(`/infra/update/${id}`);
  };

  

  return (
    <div className="infra">
      <div className="container-fluid">
        <div className="row">
          <div className="our-infra-heading">
            <h1>Our Infrastructure</h1>
          </div>
          
          <br /><br /><br />
          {infrastructure && infrastructure.map((infra) => (
            <div key={infra._id} className="col-md-12 mb-4">
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  <img
                    src={infra.leftImage}
                    alt="Hospital Image 1"
                    className="img-left"
                  />
                </div>
                <div className="col-md-3">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img
                        src={infra.images[0]}
                        alt="Hospital Image 2"
                        className="img-mid"
                      />
                    </div>
                    <div className="col-12">
                      <img
                        src={infra.images[1]}
                        alt="Hospital Image 3"
                        className="img-mid"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img
                        src={infra.images[2]}
                        alt="Hospital Image 4"
                        className="img-right"
                      />
                    </div>
                    <div className="col-12">
                      <img
                        src={infra.images[3]}
                        alt="Hospital Image 5"
                        className="img-right"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <button onClick={() => handleUpdate(infra._id)} className="btn infraupdatebtn">Update</button>
                  <button onClick={() => handleDelete(infra._id)} className="btn infradeletebtn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allinfra;
