import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Use react-hot-toast for notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
 import "./style/allcorp.css"
const AddNewCorporate = () => {
  const [corpHeading, setCorpHeading] = useState("");
  const [corpDetail, setCorpDetail] = useState("");
  const [corpImg, setCorpImg] = useState("");
  const navigate = useNavigate(); // Initialize navigate function for routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-management-backend-3.onrender.com/api/v1/about/corporate/addnew", {
        corpHeading,
        corpDetail,
        corpImg,
      });
      if (response.data.success) {
        toast.success("Corporate item added successfully!");
        navigate("/about/corporate/getall"); // Navigate back to the corporate page
      } else {
        toast.error("Failed to add corporate item.");
      }
    } catch (error) {
      console.error("Error adding corporate item:", error);
      toast.error("Failed to add corporate item. Please try again later.");
    }
  };

  return (
    <div className="add-new-corp-container">
      <h2 className="form-heading">Add New Corporate Item</h2>
      <form onSubmit={handleSubmit} className="add-corp-form">
        <div className="form-group">
          <label htmlFor="corpHeading">Corporate Heading</label>
          <input
            type="text"
            id="corpHeading"
            value={corpHeading}
            onChange={(e) => setCorpHeading(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="corpDetail">Corporate Detail</label>
          <textarea
            id="corpDetail"
            value={corpDetail}
            onChange={(e) => setCorpDetail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="corpImg">Corporate Image URL</label>
          <input
            type="text"
            id="corpImg"
            value={corpImg}
            onChange={(e) => setCorpImg(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn  addcorp-btn">Add Corporate Item</button>
      </form>
    </div>
  );
};

export default AddNewCorporate;
