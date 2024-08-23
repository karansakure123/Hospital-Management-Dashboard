import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style/alldirector.css';

const UpdateDirector = () => {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dircHeading: '',
        dircSpeciality: '',
        dircImg: '',
    });

    useEffect(() => {
        const fetchDirector = async () => {
            try {
                const response = await axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/about/director/get/${id}`);
                if (response.data.success) {
                    setFormData({
                        dircHeading: response.data.director.dircHeading,
                        dircSpeciality: response.data.director.dircSpeciality,
                        dircImg: response.data.director.dircImg,
                    });
                } else {
                    toast.error("Director not found!");
                    navigate('/about/director/getall');
                }
            } catch (error) {
                console.error("Error fetching director:", error);
                toast.error("Failed to fetch director details.");
                navigate('/about/director/getall');
            }
        };

        fetchDirector();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/about/director/update/${id}`, formData);
            toast.success("Director updated successfully!");
            navigate('/about/director/getall');
        } catch (error) {
            console.error("Error updating director:", error);
            toast.error("Failed to update director!");
        }
    };

    return (
        <div className="update-director-container">
            <h1 className="update-director-title">Update Director</h1>
            <form onSubmit={handleSubmit} className="update-director-form">
                <div className="form-group">
                    <label htmlFor="dircHeading">Heading</label>
                    <input
                        type="text"
                        id="dircHeading"
                        name="dircHeading"
                        value={formData.dircHeading}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dircSpeciality">Speciality</label>
                    <input
                        type="text"
                        id="dircSpeciality"
                        name="dircSpeciality"
                        value={formData.dircSpeciality}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dircImg">Image URL</label>
                    <input
                        type="text"
                        id="dircImg"
                        name="dircImg"
                        value={formData.dircImg}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="sec2-card-buttons">
                    <button type="submit" className="btn-update">Update</button>
                    <button type="button" className="btn-delete" onClick={() => navigate('/about/director/getall')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDirector;
