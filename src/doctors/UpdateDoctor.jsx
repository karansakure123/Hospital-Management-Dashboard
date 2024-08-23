import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./style/updatedoct.css";

const UpdateDoctor = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nic: '',
        dob: '',
        gender: '',
        speciality: '',

        doctorDepartment: '',
        docAvatar: '' // Store the image URL here
    });
    const [image, setImage] = useState(null); // State for the uploaded image

    // Fetch doctor data when the component mounts
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/user/doctors/update/${id}`, { withCredentials: true });
                setDoctorData(response.data.doctor); // Assuming your API returns the doctor data under `data.doctor`
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch doctor data.");
            }
        };
        fetchDoctor();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the selected file
    };

    // Handle form submission to update doctor data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all fields to formData
        Object.keys(doctorData).forEach((key) => {
            formData.append(key, doctorData[key]);
        });

        // Append the image if it exists
        if (image) {
            formData.append('docAvatar', image);
        }

        try {
            await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/user/doctors/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            toast.success("Doctor updated successfully!");
            navigate('/doctor/getall'); // Navigate back to the doctor list
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update doctor.");
        }
    };

    return (
        <div className="updatedoct-container">
            <h1 className="updatedoct-header">Update Doctor</h1>
            {/* Display existing image */}
            {doctorData.docAvatar && (
                <div className="updatedoct-img-container">
                    <img
                        src={doctorData.docAvatar.url}
                        alt="Doctor Avatar"
                        className="updatedoct-img"
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="updatedoct-form">
                <div>
                    <label className="updatedoct-label">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={doctorData.firstName}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={doctorData.lastName}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={doctorData.phone}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">NIC:</label>
                    <input
                        type="text"
                        name="nic"
                        value={doctorData.nic}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">DOB:</label>
                    <input
                        type="date"
                        name="dob"
                        value={doctorData.dob.substring(0, 10)} // Format for date input
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>
                <div>
                    <label className="updatedoct-label">Gender:</label>
                    <select
                        name="gender"
                        value={doctorData.gender}
                        onChange={handleChange}
                        className="updatedoct-select"
                        required
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="updatedoct-label">Department:</label>
                    <input
                        type="text"
                        name="doctorDepartment"
                        value={doctorData.doctorDepartment}
                        onChange={handleChange}
                        className="updatedoct-input"
                        required
                    />
                </div>

                <div>
    <label className="updatedoct-label">Speciality:</label>
    <input
        type="text"
        name="speciality"  // Corrected name attribute
        value={doctorData.speciality}
        onChange={handleChange}
        className="updatedoct-input"
        required
    />
</div>

                <div>
                    <label className="updatedoct-label">Upload New Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="updatedoct-file"
                    />
                </div>
                <button type="submit" className="updatedoct-button">Update Doctor</button>
            </form>
        </div>
    );
}

export default UpdateDoctor;
