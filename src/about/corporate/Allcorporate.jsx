import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./style/allcorp.css";

const AllCorporate = () => {
  const [corporate, setCorporate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCorporate = async () => {
      try {
        const response = await axios.get("hhttps://hospital-management-backend-4.onrender.com/api/v1/about/corporate/getall");
        setCorporate(response.data.corporate);
      } catch (err) {
        console.error("Error fetching corporates:", err);
        toast.error("Failed to fetch corporates. Please try again later.");
      }
    };

    fetchCorporate();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/about/corporate/update/${id}`);
  };

  const handleDelete = (id) => {
    const deleteToast = toast.loading("Confirm delete?", { duration: 0 });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this corporate item?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast);
                try {
                  await axios.delete(`https://hospital-management-backend-3.onrender.com/api/v1/about/corporate/delete/${id}`);
                  toast.success("Corporate item deleted successfully!");
                  setCorporate(corporate.filter(corp => corp._id !== id));
                } catch (error) {
                  toast.error("Failed to delete corporate item.");
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

  const handleAddNew = () => {
    navigate('/about/corporate/addnew');
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="container my-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2 className="corp-h">Corporate Section</h2>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <button onClick={handleAddNew} className="btn btn-primary add-new-corp">Add New Corporate Item</button>
          </div>
        </div>

        {corporate.length > 0 ? (
          corporate.map((corp, index) => (
            <div className="container my-4" key={index}>
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="corp-heading">
                    <h3>{corp.corpHeading}</h3>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="corp-detail p-3">
                    <p>{corp.corpDetail}</p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="corp-img-container">
                    <img src={corp.corpImg} className="corp-img img-fluid" alt="Corporate" />
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-start">
                  <button className="btn btn-warning me-2" onClick={() => handleUpdate(corp._id)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(corp._id)}>
                    Delete
                  </button>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>Corporate section not found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllCorporate;
