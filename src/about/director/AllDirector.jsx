import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import "./style/alldirector.css"

const AllDirector = () => {
    const [director, setDirector] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await axios.get('https://hospital-management-backend-4.onrender.com/api/v1/about/director/getall');
                console.log("API Response:", response.data); 

                if (response.data.success && Array.isArray(response.data.director)) {
                    console.log("Directors fetched:", response.data.director); 
                    setDirector(response.data.director);
                } else {
                    console.warn("Unexpected response structure:", response.data);
                    toast.error("Unexpected response structure from the API.");
                }
            } catch (err) {
                console.error("Error fetching directors:", err); 
                toast.error("Failed to fetch directors. Please try again later.");
            }
        };

        fetchDirectors();
    }, []);

    const handleUpdate = (dirc) => {
        navigate('/about/director/update', { state: { director: dirc } }); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/about/director/delete/${id}`);
            toast.success("Director deleted successfully!");
            setDirector(director.filter(dirc => dirc._id !== id));
        } catch (error) {
            console.error("Error deleting director:", error); 
            toast.error("Failed to delete director. Please try again later.");
        }
    };

    const addNewDirector = () => {
        navigate('/about/director/addnew');
    };

    return (
        <div className="container">
            <div className="row sec2-aboutcontainer"> 
                <div className="all-dir-heading">
                    <h3>All Directors</h3>
                    <button className="add-new-dir" onClick={addNewDirector}>Add New Director</button>
                </div>
                {director && director.length > 0 ? (
                    director.map((dirc) => (
                        <div className="col-md-4" key={dirc._id}> 
                            <div className="about-sec2-card">
                                <div className="sec2-card-img">
                                    <img src={dirc.dircImg} className="about-sec2-img" alt="" />
                                </div>
                                <div className="sec2-card-title">
                                    <h6>{dirc.dircHeading}</h6>
                                    <p>{dirc.dircSpeciality}</p>
                                </div>
                                <div className="sec2-card-buttons">
                                    <button onClick={() => handleUpdate(dirc)} className="btn-update-dir">Update</button>
                                    <button onClick={() => handleDelete(dirc._id)} className="btn-delete-dir">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No director section found</p>
                )}
            </div>
        </div>
    );
};

export default AllDirector;
