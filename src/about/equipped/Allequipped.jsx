import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import Toaster
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/alleqp.css";

const Allequipped = () => {
  const [equipped, setEquipped] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquippedData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/about/equipped/getall');
        if (response.data.success && Array.isArray(response.data.equipped)) {
          setEquipped(response.data.equipped);
        } else {
          toast.error("Unexpected response structure from the API.");
        }
      } catch (err) {
        toast.error("Failed to fetch equipped items. Please try again later.");
      }
    };

    fetchEquippedData();
  }, []);

const handleUpdate = (eqp) => {
  navigate(`/about/equipped/update/${eqp._id}`, { state: { equipped: eqp } });
};


  const handleDelete = (id) => {
    const deleteToast = toast.loading("Confirm delete?", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div
          className={`toast-confirm ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <p>Are you sure you want to delete this equipped item?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast);
                try {
                  await axios.delete(`http://localhost:3000/api/v1/about/equipped/delete/${id}`);
                  toast.success("Equipped item deleted successfully!");
                  setEquipped(equipped.filter(eqp => eqp._id !== id));
                } catch (error) {
                  toast.error("Failed to delete equipped item.");
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

  const addNewEquipped = () => {
    navigate('/about/equipped/addnew');
  };

  return (
    <div className="container">
      <Toaster position="top-center" />
      <div className="about-sec3-heading mt-3">
        <h2>Our hospital is equipped with an array of facilities for you such as</h2>
      </div>
      <div className="sec3-card-buttons">
        <button className="add-new-dir" onClick={addNewEquipped}>Add New Equipped Item</button>
      </div>
      <div className="row">
        {equipped.length > 0 ? (
          equipped.map((eqp, index) => (
            <div className="col-md-3" key={index}>
              <div className="about-sec3-card m-1">
                <div className="sec3-card-img">
                  <img src={eqp.eqpImg} alt="" />
                </div>
                <div className="sec3-card-title">
                  <h6>{eqp.eqpTitle}</h6>
                </div>
                <div className="sec3-card-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <button onClick={() => handleUpdate(eqp)} className="btn-updateqp">Update</button>
                  <button onClick={() => handleDelete(eqp._id)} className="btn-deleteqp">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No equipped section found</p>
        )}
      </div>
    </div>
  );
};

export default Allequipped;
