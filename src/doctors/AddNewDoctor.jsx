import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../ErrorBoundary'; // Import AuthContext
import axios from "axios";
import "./style/add_doctor.css";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [specialty, setSpecialty] = useState(""); // New state for specialty
  const [docAvatar, setDocAvatar] = useState(null);
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Anaesthesiology",
    "Cardiology",
    "Radiology",
    "Dermatology",
    "Psychiatry",
    "Orthopedic"
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment || !docAvatar || !specialty) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("specialty", specialty); // Append specialty to FormData
      formData.append("docAvatar", docAvatar);

      const res = await axios.post("https://hospital-management-backend-4.onrender.com/api/v1/user/doctor/addnew", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/doctor/getall");
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
      setDoctorDepartment("");
      setSpecialty(""); // Reset specialty
      setDocAvatar(null);
      setDocAvatarPreview("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="add-doctor-page">
      <div className="add-doctor-container">
        <img src="https://renovahospitals.com/images/Renova-Logo.png" alt="logo" className="logo" />
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor} className="add-doctor-form">
          <div className="avatar-upload">
            <img
              src={docAvatarPreview ? docAvatarPreview : "/docHolder.jpg"}
              alt="Doctor Avatar"
              className="avatar-preview"
            />
            <input type="file" className="avatar-input" onChange={handleAvatar} accept="image/*" required />
          </div>
          <div className="form-fields">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-input"
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <select
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Specialty" // New input for specialty
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="form-input"
              required
            />
            <button type="submit" className="submit-btn">Register New Doctor</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
