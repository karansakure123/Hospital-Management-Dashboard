import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import "./style/updatedept.css"
const UpdateDepartment = () => {
  const { id } = useParams(); // Get the department ID from the URL
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    deptName: '',
    deptImage: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch department details
  const fetchDepartment = async () => {
    try {
      console.log(`Fetching department with ID: ${id}`); // Debug log
      const response = await axios.get(`https://hospital-management-backend-1-cl2h.onrender.com/api/v1/departments/${id}`);
      if (response.data && response.data.department) {
        console.log('Department Data:', response.data); // Log full response for debugging
        setDepartment(response.data.department);
      } else {
        toast.error("Department not found!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch department details!");
      console.error("Error fetching department:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  // Update department details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://hospital-management-backend-1-cl2h.onrender.com/api/v1/departments/update/${id}`, department);
      toast.success("Department updated successfully!");
      navigate('/departments'); // Navigate back to departments list
    } catch (error) {
      toast.error("Failed to update department!");
      console.error("Error updating department:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-sec">

    <div className="update-department">
    <h1>Update Department</h1>
    <form onSubmit={handleUpdate}>
        <div>
            <label className="dept-name-label" htmlFor="deptName">Department Name:</label>
            <input
                type="text"
                className="dept-input"
                id="deptName"
                value={department.deptName}
                onChange={(e) => setDepartment({ ...department, deptName: e.target.value })}
                required
            />
        </div>
        <div>
            <label className="dept-image-label" htmlFor="deptImage">Department Image URL:</label>
            <input
                type="text"
                className="dept-input"
                id="deptImage"
                value={department.deptImage}
                onChange={(e) => setDepartment({ ...department, deptImage: e.target.value })}
                required
            />
        </div>
        <div className="image-preview">
            <h4>Current Image Preview:</h4>
            {department.deptImage && (
                <img 
                    src={department.deptImage} 
                    alt="Current Department" 
                />
            )}
        </div>
        <button type="submit" className="update-btn">Update Department</button>
    </form>
</div>
      
</div>
  );
};

export default UpdateDepartment;
