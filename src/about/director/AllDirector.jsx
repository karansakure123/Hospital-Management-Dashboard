import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./style/alldirector.css"
const AllDirector = () => {
    const [director, setDirector] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/about/director/getall'); // API endpoint
                console.log("API Response:", response.data); // Log the entire API response

                // Check if the data structure is as expected
                if (response.data.success && Array.isArray(response.data.director)) {
                    console.log("Directors fetched:", response.data.director); // Log the director array
                    setDirector(response.data.director);
                } else {
                    console.warn("Unexpected response structure:", response.data); // Log a warning if the structure is not as expected
                    toast.error("Unexpected response structure from the API.");
                }
            } catch (err) {
                console.error("Error fetching directors:", err); // Log the error
                toast.error("Failed to fetch directors. Please try again later.");
                setError(err);
            }
        };

        fetchDirectors();
    }, []);

    // Handle update
    const handleUpdate = (dirc) => {
        navigate('/about/director/update', { state: { director: dirc } }); // Navigate to update page with director data
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/about/director/${id}`); // API endpoint for deletion
            toast.success("Director deleted successfully!");
            // Refresh the director list after deletion
            setDirector(director.filter(dirc => dirc._id !== id));
        } catch (error) {
            console.error("Error deleting director:", error); // Log the error
            toast.error("Failed to delete director. Please try again later.");
        }
    };

    const addnewDirector=()=>{
        navigate('/about/director/addnew')
    }

    return (
        <>
        <div className="container">
    <div className="row sec2-aboutcontainer"> 
        <div className="all-dir-heading">
            <h3>All Directors</h3>
            <button className="add-new-dir" onClick={addnewDirector}>Add New Director</button>
        </div>
     
 
                     {director && director.length > 0 ? (
                        director.map((dirc, index) => (
                            <div className="col-md-4" key={index}> {/* Key is placed correctly here */}
                                <div className="about-sec2-card">
                                    <div className="sec2-card-img">
                                        <img src={dirc.dircImg} className="about-sec2-img" alt="" />
                                    </div>
                                    <div className="sec2-card-title">
                                        <h6>{dirc.dircHeading}</h6>
                                        <p>{dirc.dircSpeciality}</p>
                                    </div>
                                    <div className="sec2-card-buttons"> {/* Add a container for buttons */}
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
        </>
    );
};

export default AllDirector;
