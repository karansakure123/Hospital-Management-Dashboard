import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ErrorBoundary';
import './style/nav.css';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const [navigationItems, setNavigationItems] = useState([]);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [logoUrl, setLogoUrl] = useState('https://renovahospitals.com/images/Renova-Logo.png'); // Initial logo URL

    useEffect(() => {
        const fetchNavigationItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://hospital-management-backend-4.onrender.com/api/v1/navbar/getall");
                console.log("Fetched navbar data:", response.data);

                if (response.data.success && response.data.navbar.length > 0) {
                    const allNavItems = response.data.navbar.reduce((acc, navbarItem) => {
                        return acc.concat(navbarItem.navItems);
                    }, []);
                    console.log("Aggregated nav items:", allNavItems);
                    setNavigationItems(allNavItems);
                } else {
                    toast.warning("No navigation items found.");
                }
            } catch (error) {
                console.error("Error fetching navigation items:", error);
                toast.error("Error fetching navigation items");
            } finally {
                setLoading(false);
            }
        };
        fetchNavigationItems();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get("https://hospital-management-backend-4.onrender.com/api/v1/user/patient/logout", { withCredentials: true });
            toast.success(response.data.message);
            setIsAuthenticated(false);
            navigateTo("/"); // Redirect to home after logout
        } catch (error) {
            toast.error(error.response?.data?.message || "Error during logout!");
        }
    };

    const handleUpdate = (itemId) => {
        navigateTo(`/navbar/update/${itemId}`); // Redirect to update route with the item ID
    };

    const handleDelete = (id) => {
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
                                    await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/navbar/delete/${id}`);
                                    toast.success('Navbar item deleted successfully!');
                                    setNavigationItems(prevItems => prevItems.filter(item => item._id !== id));
                                    navigateTo('/navbar/'); // Navigate to /navbar/getall after deletion
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

    const handleLogoChange = (e) => {
        setLogoUrl(e.target.value); // Update logo URL state
    };

    return (
        <>
            <Toaster position="top-center" />
            <nav className="navbars navbar-light bg-light">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col-12 text-center">
                            <Link className="navbar-brand" to="/navbar">
                                <img src={logoUrl} alt="Hospital Logo" className='nav-logo' />
                            </Link>
                            <input
                                type="text"
                                value={logoUrl}
                                onChange={handleLogoChange}
                                placeholder="Enter new logo URL"
                                className="logo-input"
                            />
                        </div>
                        <div className="col-12">
                            <div className="navbar-collapse">
                                <ul className="navbar-nav mx-auto">
                                    {navigationItems.length > 0 ? (
                                        navigationItems.map((item) => (
                                            item && item.link ? (
                                                <li className={`items col-12 text-center`} key={item._id}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Link className="nav-link" to={item.link}>
                                                            {item.name}
                                                        </Link>
                                                        <div className="d-flex">
                                                            <span className="icon" onClick={() => handleUpdate(item._id)}>
                                                                <FaEdit className="text-warning mx-1" />
                                                            </span>
                                                            <span className="icon" onClick={() => handleDelete(item._id)}>
                                                                <FaTrash className="text-danger mx-1" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ) : null
                                        ))
                                    ) : (
                                        <li className="nav-item">
                                            <span className="nav-link">No items found.</span>
                                        </li>
                                    )}
                                    {isAuthenticated ? (
                                        <li className="nav-item col-12 logout">
                                            <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item col-12">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
