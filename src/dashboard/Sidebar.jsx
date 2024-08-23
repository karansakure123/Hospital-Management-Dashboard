import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/sidebar.css";
import { AuthContext } from "../ErrorBoundary";
import { toast } from "react-toastify";
import axios from "axios";
import { FaSitemap } from 'react-icons/fa';

const Sidebar = () => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDoctorDropdownOpen, setDoctorDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const[ isAboutDropdown, setIsAboutDropdown] = useState(false)
  


  const toggleSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("expand");
    setIsExpanded(!isExpanded);
  };

  const expandSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    if (!sidebar.classList.contains("expand")) {
      sidebar.classList.add("expand");
      setIsExpanded(true);
    }
  };

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (window.innerWidth <= 768) { // Check if the device is mobile-sized
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            const sidebar = document.querySelector("#sidebar");
            sidebar.classList.remove("expand");
            setIsExpanded(false);
        }
    }
};
useEffect(() => {
  const handleResize = () => {
      const sidebar = document.querySelector("#sidebar");
      if (window.innerWidth < 768) {
          sidebar.classList.remove("expand");
          setIsExpanded(false);
      } else {
          sidebar.classList.add("expand");
          setIsExpanded(true);
      }
  };

  document.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("resize", handleResize);

  // Initial check to set the correct state based on the current window size
  handleResize();

  return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
  };
}, []);
;

  const toggleDoctorDropdown = () => {
    setDoctorDropdownOpen(!isDoctorDropdownOpen);
  };
  const toggleAbout = () => {
    setIsAboutDropdown(!isAboutDropdown);
  };
  const toggleDepartmentDropdown = () => {
    setDepartmentDropdownOpen(!isDepartmentDropdownOpen);
  };
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);
  const [isHome1Expanded, setIsHome1Expanded] = useState(false);
  const [isWhoWeAreExpanded, setIsWhoWeAreExpanded] = useState(false);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [isTestimonialExpanded, setIsTestimonialExpanded] = useState(false);
  const [isSurgeryExpanded, setIsSurgeryExpanded] = useState(false);
  const [isSliderExpanded, setIsSliderExpanded] = useState(false);
  const [isCsrExpanded, setIsCsrExpanded] = useState(false);
  const [isFooterExpanded, setIsFooterExpand] = useState(false);
  const [isInfrastructureExpanded, setIsInfrastructureExpanded] = useState(false);
  const [isBlogExpanded, setIsBlogExpanded] = useState(false);
  const [isIntroExpanded, setIsIntroExpand] = useState(false);
  const [isPatientSpeakExpanded, setIsPatientSpeakExpanded] = useState(false);
 
  const toggleHome = () => {
    setIsHomeExpanded(!isHomeExpanded);
  };

  const toggleHome1 = () => {
    setIsHome1Expanded(!isHome1Expanded);
  };

  const toggleHero = () => {
    setIsHeroExpanded(!isHeroExpanded);
  };



  const toggleWhoWeAre = () => {
    setIsWhoWeAreExpanded((prev) => !prev);
  };


  const toggleSurgery = () => {
    setIsSurgeryExpanded((prev) => !prev);
  };



  const toggleSlider = () => {
    setIsSliderExpanded((prev) => !prev);
  };


  const toggleInfrastructure = () => {
    setIsInfrastructureExpanded((prev) => !prev);
  };

 
  const toggleBlog = () => {
    setIsBlogExpanded((prev) => !prev);
  };


  const togglePatientSpeak = () => {
    setIsPatientSpeakExpanded((prev) => !prev);
  };

  const toggleTestimonial = () => {
    setIsTestimonialExpanded((prev) => !prev);
  };


  const toggleFooter = () => {
    setIsFooterExpand(!isFooterExpanded);
  };
  
  const toggleIntro = () => {
    setIsIntroExpand(!isIntroExpanded);
  };

  const toggleCsr = () => {
    setIsCsrExpanded(!isCsrExpanded);
  };
  
 
  const [isSubdept, setIsSubdept] = useState(false);
  const [isAnaesth, setIsAnaesth] = useState(false);
  const [isCardio, setIsCardio] = useState(false);
  const [isOrtho, setIsOrtho] = useState(false);

  const toggleSubdept = () => {
    setIsSubdept(!isSubdept);
  };

  const toggleAnaesth = () => {
    setIsAnaesth(!isAnaesth);
  };
  const toggleOrtho = () => {
    setIsOrtho(!isOrtho);
  };


  const toggleCardio = () => {
    setIsCardio(!isCardio);
  };
  
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/admin/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthenticated(false);
      // Optionally redirect to login page or perform other actions
    } catch (error) {
      // Log the entire error object for debugging
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Error during logout!");
    }
  };
  

  return (
    <div className={`wrapper ${isExpanded ? "expand" : ""}`}>
      <aside id="sidebar" ref={sidebarRef}>
        <div className="d-flex align-items-center sidebar-header-item">
          <button className="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="lni lni-menu"></i>
          </button>
          <div className="sidebar-logo">
            <Link to="/" className="sidebar-heading">
              Renovo
            </Link>
          </div>
        </div>
     
         <ul className="sidebar">
      


      <li className={`sidebar-item ${isHomeExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleHome}>
          <i className="lni lni-home"></i>
          <span>Home</span>
          <i className={`lni ${isHomeExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
      
        <ul className="homedropdownrelatered">
          <li className={`dropdown-item ${isHome1Expanded ? 'active' : ''}`}>
            <div className="sidebar-link" onClick={toggleHome1}>
              <span>Navbar</span>
              <i className={`lni ${isHome1Expanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
            </div>
      
      
            <ul className="homedropdownrelatered">
              <li className="dropdown-item">
                <Link to="/navbar/" className="sidebar-links">All Navbar </Link>
              </li>
              <li className="dropdown-item">
                <Link to="/navbar/addnew" className="sidebar-links"> Navbar</Link>
              </li>
            </ul>
          </li>




          <li className={`dropdown-item ${isHeroExpanded ? 'active' : ''}`}>
  <div className="sidebar-link" onClick={toggleHero}>
    <span>Hero Section</span>
    <i className={`lni ${isHeroExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
  </div>
  <ul className={`homedropdownrelatered ${isHeroExpanded ? 'show' : ''}`}>
    <li className="dropdown-item">
      <Link to="/hero/getall" className="sidebar-links">Explore Hero </Link>
    </li>
    <li className="dropdown-item">
      <Link to="/hero/addnew" className="sidebar-links">Hero Creation </Link>
    </li>
  </ul>
</li>



<li className={`dropdown-item ${isIntroExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleIntro}>
          <span>Overview</span>
          <i className={`lni ${isIntroExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isIntroExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/intro/getall" className="sidebar-links">View </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/intro/addnew " className="sidebar-links">Add new</Link>
          </li>
           
        </ul>
      </li>





<li className={`dropdown-item ${isWhoWeAreExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleWhoWeAre}>
          <span>Who We Are</span>
          <i className={`lni ${isWhoWeAreExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isWhoWeAreExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/whowe/getall" className="sidebar-links">View All</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/whowe/addnew" className="sidebar-links">Add New</Link>
          </li>
          <li className="dropdown-item">
           </li>
        </ul>
      </li>






<li className={`dropdown-item ${isInfrastructureExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleInfrastructure}>
          <span>Infrastructure</span>
          <i className={`lni ${isInfrastructureExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isInfrastructureExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/infra/getall" className="sidebar-links">View infrastructure</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/infra/addnew" className="sidebar-links">Add New</Link>
          </li>
          <li className="dropdown-item">
           </li>
        </ul>
      </li>





      <li className={`dropdown-item ${isCsrExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleCsr}>
          <span>CSR</span>
          <i className={`lni ${isCsrExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isCsrExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/csr/getall" className="sidebar-links">View  CSR</Link>
          </li>
          <li className="dropdown-item">
           </li>
          <li className="dropdown-item">
            <Link to="/csr/addnew" className="sidebar-links">Add New</Link>
          </li>
        </ul>
      </li>




      <li className={`dropdown-item ${isTestimonialExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleTestimonial}>
          <span>Testimonials</span>
          <i className={`lni ${isTestimonialExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isTestimonialExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/testimonials/getall" className="sidebar-links">View Testimonial </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/testimonials/addnew" className="sidebar-links">Add New</Link>
          </li>
         
        </ul>
      </li>




      <li className={`dropdown-item ${isPatientSpeakExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={togglePatientSpeak}>
          <span>Patient Speak</span>
          <i className={`lni ${isPatientSpeakExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isPatientSpeakExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/patientspeak/getall" className="sidebar-links">View All</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/patientspeak/addnew" className="sidebar-links">Add new</Link>
          </li>
          <li className="dropdown-item">
           </li>
        </ul>
      </li>




      <li className={`dropdown-item ${isBlogExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleBlog}>
          <span>Blog</span>
          <i className={`lni ${isBlogExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isBlogExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/blog/getall" className="sidebar-links">View Blog  Post</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/blog/addnew" className="sidebar-links">Add New</Link>
          </li>
          <li className="dropdown-item">
           </li>
        </ul>
      </li>



      <li className={`dropdown-item ${isSurgeryExpanded ? 'active' : ''}`}>
        <div className="sidebar-link" onClick={toggleSurgery}>
          <span>Health Services</span>
          <i className={`lni ${isSurgeryExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
        </div>
        <ul className={`homedropdownrelatered ${isSurgeryExpanded ? 'show' : ''}`}>
          <li className="dropdown-item">
            <Link to="/health/getall" className="sidebar-links">View Health section</Link>
          </li>
          <li className="dropdown-item">
            <Link to="/health/addnew" className="sidebar-links">Add new </Link>
          </li>
         
        </ul>
      </li>




<li className={`dropdown-item ${isFooterExpanded ? 'active' : ''}`}>
  <div className="sidebar-link" onClick={toggleFooter}>
    <span>Footer Section</span>
    <i className={`lni ${isFooterExpanded ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
  </div>
  <ul className={`homedropdownrelatered ${isFooterExpanded ? 'show' : ''}`}>
    <li className="dropdown-item">
      <Link to="/footer/getall" className="sidebar-links">Footer Overview</Link>
    </li>
    <li className="dropdown-item">
      <Link to="/footer/addnew" className="sidebar-links">Add Footer </Link>
    </li>
  </ul>
</li>



        </ul>
      </li>
   

          <li className="sidebar-item">
            <Link
              to="#"
              className="sidebar-link collapsed has-dropdown"
              onClick={(e) => {
                toggleAbout();
                expandSidebar();
              }}
              aria-expanded={isAboutDropdown}
            >
              <i className="lni lni-users"></i>
              <span>About</span>
              <i
                className={`lni ${
                  isAboutDropdown ? "lni-chevron-up" : "lni-chevron-down"
                }`}
                id="dropdown-i"
              ></i>
            </Link>
            <ul
              className={`sidebar-dropdown ${
                isAboutDropdown ? "show" : ""
              }`}
            >
              <li className="sidebar-item">
                <Link to="/about/accredetation/getall" className="sidebar-link">
                  Accreditation
                </Link>
              </li>

              <li className="sidebar-item">
                <Link to="/about/director/getall" className="sidebar-link">
                 Board of Directors
                </Link>
              </li>

              <li className="sidebar-item">
                <Link to="/about/equipped/getall" className="sidebar-link">
                 Equipped Section
                </Link>
              </li>

              <li className="sidebar-item">
                <Link to="/about/corporate/getall" className="sidebar-link">
                 Corporate Section
                </Link>
              </li>
            </ul>
          </li>

        
        
          <li className="sidebar-item">
            <Link
              to="#"
              className="sidebar-link collapsed has-dropdown"
              onClick={(e) => {
                toggleDoctorDropdown();
                expandSidebar();
              }}
              aria-expanded={isDoctorDropdownOpen}
            >
              <i className="lni lni-users"></i>
              <span>Doctor</span>
              <i
                className={`lni ${
                  isDoctorDropdownOpen ? "lni-chevron-up" : "lni-chevron-down"
                }`}
                id="dropdown-i"
              ></i>
            </Link>
            <ul
              className={`sidebar-dropdown ${
                isDoctorDropdownOpen ? "show" : ""
              }`}
            >
              <li className="sidebar-item">
                <Link to="/doctor/addNew" className="sidebar-link">
                  Add Doctor
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/doctor/getall" className="sidebar-link">
                  Doctor List
                </Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <Link
              to="#"
              className="sidebar-link collapsed has-dropdown"
              onClick={(e) => {
                toggleDepartmentDropdown();
                expandSidebar();
              }}
              aria-expanded={isDepartmentDropdownOpen}
            >
              <i className="lni lni-apartment"></i>
              <span>Department</span>
              <i
                className={`lni ${
                  isDepartmentDropdownOpen
                    ? "lni-chevron-up"
                    : "lni-chevron-down"
                }`}
                id="dropdown-i"
              ></i>
            </Link>
            <ul
              className={`sidebar-dropdown ${
                isDepartmentDropdownOpen ? "show" : ""
              }`}
            >
              <li className="sidebar-item">
                <Link to="/department/addnew" className="sidebar-link">
                  Add Department
                </Link>
              </li>
              <li className="sidebar-item">
              <Link to="/department/getall" className="sidebar-link">
              Department List
                </Link>
              </li>
            </ul>
          </li>


    


          <li className={`sidebar-item ${isSubdept ? 'active' : ''}`}>
  <div className="sidebar-link" onClick={toggleSubdept}>
    <span><FaSitemap /> Sub Department</span>
    <i className={`lni ${isSubdept ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
  </div>
  
  <ul className={`homedropdownrelatered ${isSubdept ? 'show' : ''}`}>
    {/* Anaesthesiology Section */}
    <li className={`sidebar-item ${isAnaesth ? 'active' : ''}`}>
      <div className="sidebar-link" onClick={toggleAnaesth}>
        <span>Anaesthesiology</span>
        <i className={`lni ${isAnaesth ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
      </div>
      <ul className={`homedropdownrelatered ${isAnaesth ? 'show' : ''}`}>
        <li className="dropdown-item">
          <Link to="/anaesth/getall" className="sidebar-links">View All</Link>
        </li>
        <li className="dropdown-item">
          <Link to="/anaesth/addnew" className="sidebar-links">Add New</Link>
        </li>
      </ul>
    </li>

    {/* Cardio Section */}
    <li className={`dropdown-item ${isCardio ? 'active' : ''}`}>
      <div className="sidebar-link" onClick={toggleCardio}>
        <span>Cardiology</span>
        <i className={`lni ${isCardio ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
      </div>
      <ul className={`homedropdownrelatered ${isCardio ? 'show' : ''}`}>
        <li className="dropdown-item">
          <Link to="/cardiology/getall" className="sidebar-links">View All</Link>
        </li>
        <li className="dropdown-item">
          <Link to="/cardiology/addnew" className="sidebar-links">Add New</Link>
        </li>
      </ul>
    </li>

    {/* Ortho Section */}
    <li className={`sidebar-item ${isOrtho ? 'active' : ''}`}>
      <div className="sidebar-link" onClick={toggleOrtho}>
        <span>Orthopedics</span>
        <i className={`lni ${isOrtho ? 'lni-chevron-up' : 'lni-chevron-down'}`}></i>
      </div>
      <ul className={`homedropdownrelatered ${isOrtho ? 'show' : ''}`}>
        <li className="dropdown-item">
          <Link to="/orthopedics/getall" className="sidebar-links">View All</Link>
        </li>
        <li className="dropdown-item">
          <Link to="/orthopedics/addnew" className="sidebar-links">Add New</Link>
        </li>
      </ul>
    </li>

  </ul>
</li>



          <li className="sidebar-item">
            <Link
              to="/appointments"
              className="sidebar-link"
              onClick={expandSidebar}
            >
              <i className="lni lni-cog"></i>
              <span>Appointment</span>
            </Link>
          </li>
          
          
          <li className="sidebar-item">
            <Link to="/messages" className="sidebar-link" onClick={expandSidebar}>
              <i className="lni lni-help"></i>
              <span>Messages</span>
            </Link>
          </li>
 

        </ul>
 
        <div className="sidebar-footer">
  {isAuthenticated ? (
    <Link to="#" className="sidebar-link" onClick={handleLogout}>
      <i className="lni lni-exit"></i>
      Logout
    </Link>
  ) : (
    <Link to="/login" className="sidebar-link">
      <i className="lni lni-login"></i>
      Login
    </Link>
  )}
</div>


      </aside>
    </div>
  );
};

export default Sidebar;
