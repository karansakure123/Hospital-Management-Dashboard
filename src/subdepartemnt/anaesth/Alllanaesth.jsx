import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import "./style.css";

const Allanaesth = () => {
  const [expCardsData, setExpCardsData] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/anaesthesio/getall');
        const data = response.data;
        setExpCardsData(data);
        if (data.length > 0) {
          setBgImage(data[0].backgroundImage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (id) => {
    if (id) {
      navigate(`/anaesth/update/${id}`);
    }
  };

  const handleDelete = (id) => {
    if (!id) return;

    toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              try {
                await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/anaesthesio/delete/${id}`);
                toast.success("Item deleted successfully!");
                setExpCardsData((prevData) => prevData.filter(item => item._id !== id));
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
              toast.dismiss(t.id);
              toast.error("Delete action canceled.");
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <>
      {/* <div className="container-fluids p-0">
        <div className="row">
          <div className="col-12 ansth-sec1">
            <div className="bgimgs">
              <img
                src={bgImage || "https://noblehrc.com/assets/imgs/Cardiac-Sciences.jpg"}
                alt="Background"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div> */}
      
      <br /><br />

      <div className="ansth-sec2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="ansth-sec1-bgimg">
                <div className="inner-ansth-img">
                  <img
                    src={expCardsData.length > 0 ? expCardsData[0].innerImage : "https://bharatihospital.com/wp-content/uploads/2021/10/Anesthesia-21.jpg.webp"}
                    alt="Inner"
                    className="inner-img img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-content">
                <h5 className="text-primary">Scope of Anaesthesia Services</h5>
                <br />
                {expCardsData.length > 0 && (
                  <>
                    <p>{expCardsData[0].description}</p>
                    <p><strong>{expCardsData[0].additionalInfo}</strong></p>
                  </>
                )}
                <Link to="/appointment">
                  <button className="btn make-app-btn">Make an Appointment</button>
                </Link>
                <div className="">
                  <button
                    className="btn update-anaesthbtn"
                    onClick={() => handleUpdate(expCardsData.length > 0 ? expCardsData[0]._id : '')}
                  >
                    Update
                  </button>
                  <button
                    className="btn delete-anaesthbtn"
                    onClick={() => handleDelete(expCardsData.length > 0 ? expCardsData[0]._id : '')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allanaesth;
