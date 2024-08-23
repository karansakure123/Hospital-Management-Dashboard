import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./style/alldoct.css";
 import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { Navigate, useNavigate } from 'react-router-dom';

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(
                    "https://hospital-management-backend-4.onrender.com/api/v1/user/doctors",
                    { withCredentials: true }
                );
                console.log(data.doctors); // Log the fetched doctors to check the structure
                setDoctors(data.doctors);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        };
        fetchDoctors();
    }, []);

  

    const handleUpdate = (id) => {
        if (id) {
            console.log(`Navigating to update page for Doctor ID: ${id}`); // Debug log
            navigate(`/doctor/update/${id}`); // Navigate to the update page
        } else {
            toast.error("Doctor ID is not defined!");
        }
    };

    const handleDelete = (id) => {
        if (!id) return;
    
        toast((t) => (
            <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
                <p>Are you sure you want to delete this item?</p>
                <div className="button-group">
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/user/doctors/delete/${id}`);
                                toast.success("Item deleted successfully!");
                                setDoctors((prevData) => prevData.filter(item => item._id !== id));
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
            <div className="alldoct-container">
                <ToastContainer /> {/* Toast container for displaying notifications */}
                <h1 className="alldoct-heading">Registered Doctors</h1>
                <div className="alldoct-row">
                    {doctors && doctors.length > 0 ? (
                        doctors.map((element, index) => (
                            <div className="alldoct-col" key={element._id}>
                                <div className="alldoct-card">
                                    <img
                                        src={element.docAvatar && element.docAvatar.url}
                                        alt="Doctor Avatar"
                                        className="alldoct-img"
                                    />
                                    <div className="alldoct-card-body">
                                        <h4 className="doctor-name">{`${element.firstName} ${element.lastName}`}</h4>
                                        <div className="alldoct-details">
                                            <p>
                                                Email: <span>{element.email}</span>
                                            </p>
                                            <p>
                                                Phone: <span>{element.phone}</span>
                                            </p>
                                            <p>
                                                DOB: <span>{element.dob.substring(0, 10)}</span>
                                            </p>
                                            <p>
                                                Department: <span>{element.doctorDepartment}</span>
                                            </p>
                                            <p>
                                                Speciality: <span>{element.speciality}</span>
                                            </p>
                                            <p>
                                                NIC: <span>{element.nic}</span>
                                            </p>
                                            <p>
                                                Gender: <span>{element.gender}</span>
                                            </p>
                                        </div>
                                        <div className="alldoct-actions">
                                            <button onClick={() => handleUpdate(element._id)} className="btn dr-update">
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(element._id)} className="btn dr-delete">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No Registered Doctors Found!</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllDoctors;
