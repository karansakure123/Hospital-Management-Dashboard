import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/sidebar.css'; // Make sure the path is correct
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faBell, 
  faUser, 
  faAngleDown, 
  faAngleUp, 
  faTachometerAlt,
  faPhoneAlt, 
  faAngleRight, 
  faCog, 
  faComments, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false); // State for Doctor suboptions

  const toggleDoctorSuboptions = () => {
    setDoctorOpen(prevState => !prevState); // Toggle based on previous state
  };

  // Effect to handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    if (window.innerWidth < 992) {
      setShowSidebar(!showSidebar);
    }
  };

  // Close sidebar function
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className={showSidebar ? 'navbar-shifted' : ''}>
        <Container fluid>
          {/* Toggle button for mobile */}
          <Button
            variant="link"
            onClick={toggleSidebar}
            className={`toggle-button d-lg-none ${showSidebar ? 'd-none' : ''}`}
          >
            <FontAwesomeIcon icon={faBars} className='purple-gradient' />
          </Button>

          {/* Brand for larger devices */}
          <Navbar.Brand href="#" className='text-dark d-none d-lg-block' onClick={closeSidebar}>
            <FontAwesomeIcon icon={faBars} className='purple-gradient' style={{ color: 'black' }} />
          </Navbar.Brand>

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="ms-auto">
              <Nav.Link href="#" className="text-dark">
                <FontAwesomeIcon icon={faBell} className='me-4' />
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                <FontAwesomeIcon icon={faUser} className='me-2'/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main container with sidebar and main content */}
      <Container fluid className="d-flex">
        {/* Sidebar */}
        <Offcanvas
          show={showSidebar}
          onHide={closeSidebar} // Close sidebar on backdrop click or larger devices
          placement="start"
          className="sidebar-offcanvas"
          backdrop={window.innerWidth < 992} // Show backdrop only on mobile
        >
          <Offcanvas.Header className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src="https://a2zithub.com/intern/uploads/168069090692991680.png" alt="Brand Logo" className="brand-logo me-2" />
              <Offcanvas.Title className="admin text-white mb-0">Admin</Offcanvas.Title>
            </div>
            <Button
              variant="link"
              onClick={closeSidebar}
              className={`toggle-button d-lg-none ${showSidebar ? '' : 'd-none'}`}
            >
              <FontAwesomeIcon icon={faTimes} className='purple-gradient' style={{ color: 'white' }} />
            </Button>
          </Offcanvas.Header>

          {/* Sidebar body */}
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              <Nav.Link className="nav-link" onClick={() => setDashboardOpen(prev => !prev)}>
                <FontAwesomeIcon icon={faTachometerAlt} className={`me-2 ${dashboardOpen ? 'rotate-icon' : ''}`} />
                Home{' '}
                <FontAwesomeIcon icon={dashboardOpen ? faAngleUp : faAngleDown} className="ml-1 rotate-icon ms-2" />
              </Nav.Link>
              {dashboardOpen && (
                <div className="nav-link-suboptions ms-4"> {/* Indentation for suboptions */}
                  <Nav.Link href="#" className="nav-link">
                    <FontAwesomeIcon icon={faAngleRight} className='me-2' />
                    Home 1
                  </Nav.Link>
                  <Nav.Link href="#" className="nav-link">
                    <FontAwesomeIcon icon={faAngleRight} className='me-2' />
                    Home 2
                  </Nav.Link>
                </div>
              )}

              <Nav.Link className="nav-link" onClick={toggleDoctorSuboptions}>
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Doctor
                <FontAwesomeIcon icon={doctorOpen ? faAngleUp : faAngleDown} className="ms-auto" />
              </Nav.Link>

              {doctorOpen && ( // Render suboptions if doctorOpen is true
                <div className="nav-link-suboptions ms-4">
                  <Nav.Link as={Link} to="/doctor/add" className="nav-link">
                    Add Doctor
                  </Nav.Link>
                  <Nav.Link as={Link} to="/doctor/update" className="nav-link">
                    Update Doctor
                  </Nav.Link>
                  <Nav.Link as={Link} to="/doctor/delete" className="nav-link">
                    Delete Doctor
                  </Nav.Link>
                </div>
              )}

              <Nav.Link as={Link} to="/messages" className="nav-link">
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Messages
              </Nav.Link>
              <Nav.Link as={Link} to="/appointments" className="nav-link">
                <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
                Appointments
              </Nav.Link>
            </Nav>
            <Nav className="flex-column mt-auto"> {/* mt-auto for pushing to the bottom */}
              <Nav.Link href="#" className="nav-link">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div className={`main-content ${showSidebar ? 'main-content-shifted' : ''}`}>
          <Container>
            <h1>Main Content</h1>
            <p>This is the main content area.</p>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Sidebar;
