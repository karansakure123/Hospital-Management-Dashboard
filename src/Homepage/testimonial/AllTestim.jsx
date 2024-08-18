import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import "./testi.css"; // Ensure this path is correct

const AllTestim = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/testimonial/getall");
        console.log("Response Data:", response.data); // Log to ensure correct data

        // Delay for 3 seconds before setting testimonials and loading to false
        setTimeout(() => {
          setTestimonials(response.data); // Set testimonials data
          setLoading(false); // Set loading to false after data is set
        }, 1000);
      } catch (error) {
        toast.error("Failed to fetch testimonials");
        console.error("Error fetching testimonials:", error); // Log error for debugging
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchTestimonials();
  }, []);

  

  const handleUpdate = (id) => {
    navigate(`/testimonials/update/${id}`); // Navigate to the update testimonial page with the ID
  };

  const handleDelete = async (id) => {
    const deleteToast = toast.loading("Deleting entry...", {
      duration: 0,
    });

    const confirmToast = toast.custom(
      (t) => (
        <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
          <p>Are you sure you want to delete this testimonial?</p>
          <div className="button-group">
            <button
              onClick={async () => {
                toast.dismiss(deleteToast); // Dismiss the loading toast
                try {
                  await axios.delete(`http://localhost:3000/api/v1/testimonial/delete/${id}`);
                  toast.success("Testimonial deleted successfully!");
                  setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id)); // Update state to remove the deleted item
                } catch (error) {
                  toast.error("Failed to delete testimonial.");
                }
                toast.dismiss(t.id); // Dismiss the confirmation toast
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(deleteToast); // Dismiss the loading toast
                toast.error("Delete action canceled.");
                toast.dismiss(t.id); // Dismiss the confirmation toast
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

    confirmToast; // Show the confirmation toast
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="testimonial-sec6">
        <div className="testimonial-section">
          <div className="testimonial-header">
            <div className="test-heading">Testimonial Section</div>
         <br /><br />
          </div>
          <div className="testimonial-display">
            {loading ? (
              <div>Loading testimonials...</div> // Show loading state
            ) : (
              <div className="container">
                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {testimonials.length > 0 ? (
                      testimonials.map((testimonial, index) => (
                        <div key={testimonial._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <div
                            className="testimonial-item"
                            style={{ backgroundImage: `url(${testimonial.imageUrl})` }}
                          >
                            <div className="test-card">
                              <div className="testimonial-title">Testimonials</div>
                              <div className="testimonial-text">
                                <p>
                                  <FaQuoteLeft /> {testimonial.message}
                                </p>
                                <p>{testimonial.name}</p>
                              </div>
                              <div className="button-group">
                                <button onClick={() => handleUpdate(testimonial._id)} className="update-test">Update</button>
                                <button onClick={() => handleDelete(testimonial._id)} className="delete-test">Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No testimonials available.</div> // Handle empty state
                    )}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTestim;
