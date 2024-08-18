import "./style/alldept.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Import Toaster
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa';

const AllDepartment = () => {
  const navigate = useNavigate();
  const [deptData, setDeptData] = useState([]);

  // Fetch department data
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://hospital-management-backend-1-cl2h.onrender.com/api/v1/departments/getall");
      setDeptData(response.data.departments);
      toast.success("Departments fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch departments!");
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleReadMore = (route) => {
    navigate(route);
  };

  const handleUpdate = (deptId) => {
    navigate(`/department/update/${deptId}`);
  };

  const handleDelete = (deptId) => {
    // Show confirmation toast with buttons
    const deleteToast = toast.loading("Confirm delete?", {
      duration: 0, // Keep the toast open indefinitely
    });

    // Custom confirmation toast
    const confirmToast = toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this department?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              // Dismiss confirmation toast
              toast.dismiss(deleteToast);
              try {
                // Proceed with deletion
                await axios.delete(`http://localhost:3000/api/v1/departments/delete/${deptId}`);
                toast.success("Department deleted successfully!");
                fetchDepartments(); // Refresh the list after deletion
              } catch (error) {
                toast.error("Failed to delete department!");
                console.error("Error deleting department:", error);
              }
              // Remove the confirmation toast immediately
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button onClick={() => {
            // Dismiss the confirmation toast
            toast.dismiss(deleteToast);
            toast.error("Delete action canceled."); // Show cancel message
            // Remove the confirmation toast immediately
            toast.dismiss(t.id);
          }}>
            No
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Keeps the toast open
      position: "top-center",
    });
  };

  return (
    <div className="dept-sec1">
      <div className="dept-title">
        <h1>Centre of Excellence</h1>
      </div>
      <div className="row">
        {deptData.length > 0 ? (
          deptData.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="dept-card">
                <img src={item.deptImage} className="dept-sec1-imgs" alt={item.deptName} />
                <div className="dept-card-body">
                  <h5 className="dept-card-title">{item.deptName}</h5>
                  <button
                    className="dept-readmore"
                    onClick={() => handleReadMore(`/department/${item.deptName.toLowerCase()}`)}
                  >
                    Read More <FaArrowRight size={22} color="white" />
                  </button>
                  <div className="button-group">
                    <button onClick={() => handleUpdate(item._id)} className="update-btn">Update</button>
                    <div className="delete-icon" onClick={() => handleDelete(item._id)}>
                      <FaTrash size={22} color="white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No departments found.</p>
        )}
      </div>
      <Toaster position="top-center" /> {/* Add the Toaster here */}
    </div>
  );
};

export default AllDepartment;
