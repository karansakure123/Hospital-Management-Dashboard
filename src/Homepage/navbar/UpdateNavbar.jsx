import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const UpdateNavbar = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [navItem, setNavItem] = useState({ name: '', link: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNavItem = async () => {
            try {
                const response = await axios.get(`https://hospital-management-backend-4.onrender.com/api/v1/navbar/get/${id}`);
                if (response.data.success) {
                    setNavItem(response.data.navItem); // Set the existing data in the state
                } else {
                    toast.error('Navbar item not found!');
                }
            } catch (error) {
                toast.error('Error fetching navbar item!');
            }
        };

        fetchNavItem(); // Call the function to fetch the item data
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNavItem({ ...navItem, [name]: value }); // Update state with form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://hospital-management-backend-4.onrender.com/api/v1/navbar/update/${id}`, navItem);
            if (response.data.success) {
                toast.success('Navbar item updated successfully!');
                navigate('/navbar'); // Redirect after successful update
            } else {
                toast.error('Failed to update navbar item!');
            }
        } catch (error) {
            toast.error('Error updating navbar item!');
        }
    };

    const handleDelete = () => {
        const deleteToast = toast.loading("Confirm delete?", {
            duration: 0,
        });

        const confirmToast = toast.custom(
            (t) => (
                <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
                    <p>Are you sure you want to delete this navbar item?</p>
                    <div className="button-group">
                        <button
                            onClick={async () => {
                                toast.dismiss(deleteToast); // Dismiss loading toast
                                try {
                                    await axios.delete(`http://localhost:3000/api/v1/navbar/delete/${id}`);
                                    toast.success('Navbar item deleted successfully!');
                                    navigate('/navbar'); // Redirect after successful delete
                                } catch (error) {
                                    toast.error('Failed to delete navbar item.');
                                }
                                toast.dismiss(t.id); // Dismiss confirmation toast
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => {
                                toast.dismiss(deleteToast); // Dismiss loading toast
                                toast.error("Delete action canceled.");
                                toast.dismiss(t.id); // Dismiss confirmation toast
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                position: "top-center",
            }
        );

        confirmToast;
    };

    return (
        <div className="container">
            <Toaster position="top-center" />
            <h2>Update Navbar Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={navItem.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="link" className="form-label">Link</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        className="form-control"
                        value={navItem.link}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn save-btn-nav">Save Changes</button>
             </form>
        </div>
    );
};

export default UpdateNavbar;
