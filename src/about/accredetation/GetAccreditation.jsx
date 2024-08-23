import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/about.css"; // Ensure the path to the CSS file is correct

const Accreditation = () => {
  const [accreditation, setAccreditation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccreditation = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-backend-4.onrender.com/api/v1/about/accreditation/getall"
        );
        setAccreditation(response.data.accreditations);
      } catch (error) {
        toast.error("Error fetching accreditations");
      }
    };
    fetchAccreditation();
  }, []);

  const handleUpdate = (acc) => {
    navigate(`/about/accreditation/update/${acc._id}`);
  };

  const handleDelete = (accId) => {
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
          <p>Are you sure you want to delete this accreditation?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast);
                try {
                  await axios.delete(
                    `https://hospital-management-backend-4.onrender.com/api/v1/about/accreditation/delete/${accId}`
                  );
                  toast.success("Accreditation deleted successfully!");
                  setAccreditation(
                    accreditation.filter((acc) => acc._id !== accId)
                  );
                } catch (error) {
                  toast.error("Failed to delete accreditation!");
                  console.error("Error deleting accreditation:", error);
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

  const handleAdd = () => {
    navigate("/about/accreditation/addnew");
  };

  return (
    <div className="container">
      <Toaster position="top-center" />
      <div className="row">
        <div className="col-md-6">
          <h1 className="acc-heading">Accreditation</h1>
        </div>
        <div className="col-md-6 mb-3">
          <button className="add-new-acc" onClick={handleAdd}>
            Add New Accreditation
          </button>
        </div>

        {accreditation.length > 0 ? (
          accreditation.map((acc) => (
            <div className="col-md-12 mb-4" key={acc._id}>
              <div className="row">
                <div className="col-md-8 col-lg-8 col-12 acc-p">
                  <h5 className="card-title">{acc.accTitle}</h5>
                  <p className="card-text">{acc.accDesc1}</p>
                  <p className="card-text">{acc.accDesc2}</p>
                </div>
                <div className="col-md-4 col-lg-4 col-12">
                  <img
                    src={acc.accImg}
                    className="img-fluid about-sec2-img"
                    alt={acc.accTitle}
                  />
                </div>
              </div>

              <div className="updateAndDelete d-flex">
                <button className="update-acc" onClick={() => handleUpdate(acc)}>
                  Update
                </button>
                <button className="delete-acc" onClick={() => handleDelete(acc._id)}>
                  Delete
                </button>
              </div>
              <br />
              <hr />
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p>No accreditations found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accreditation;
``
