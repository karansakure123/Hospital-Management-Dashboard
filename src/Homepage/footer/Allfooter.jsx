import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/footer.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Allfooter = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = 'https://hospital-management-backend-4.onrender.com/api/v1/footer/getall';

  const fetchLinks = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHeading = async (linkId) => {
    // Handle delete heading logic
  };

  const handleDeleteItem = (linkId, itemId) => {
    const confirmToast = toast.custom((t) => (
      <div className={`toast-confirm ${t.visible ? "animate-enter" : "animate-leave"}`}>
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <button
            onClick={async () => {
              try {
                const response = await axios.delete(`https://hospital-management-backend-4.onrender.com/api/v1/footer/delete/${itemId}`);
                console.log(response);

                // Update the state to reflect the deleted item
                setLinks((prevLinks) => {
                  const updatedLinks = prevLinks.map((link) => {
                    if (link._id === linkId) {
                      const updatedItems = link.items.filter((item) => item._id !== itemId);
                      if (updatedItems.length === 0) {
                        return null; // Return null to filter out this link
                      }
                      return { ...link, items: updatedItems };
                    }
                    return link;
                  }).filter(link => link !== null); // Filter out any null links

                  return updatedLinks;
                });
                toast.success("Deleted successfully!");
              } catch (error) {
                console.error('Error deleting item:', error);
              }
            }}
            className="confirm-button"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
    toast.show(confirmToast);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="footer pt-4">
      <div className="container footer-content">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5">
          {links.map((link) => (
            <div className="col mb-3" key={link._id}>
              <h5 className="footer-headings d-flex justify-content-between align-items-center">
                {link.title}
                <button onClick={() => handleDeleteHeading(link._id)} className="btn text-danger btn-sm">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </h5>
              <ul className="list-unstyled">
                {link.items.map((item) => (
                  <li key={item._id} className="d-flex align-items-center mb-2">
                    <a href={item.url} className="text-white flex-grow-1">{item.name}</a>
                    <div className="d-flex align-items-center">
                      <Link to={`/footer/update/${link._id}`} className="btn btn-warning btn-sm mx-1">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button onClick={() => handleDeleteItem(link._id, item._id)} className="btn text-danger btn-sm mx-1">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-end">
        <div className="text-center pt-4">
          <p>© 2024 MJM HOSPITAL. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Allfooter;
