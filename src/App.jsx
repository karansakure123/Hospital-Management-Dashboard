import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./ErrorBoundary"; // Make sure to import your AuthContext

// Import components
import Sidebar from "./dashboard/Sidebar";
import Login from "./login/Login";
import Messages from "./messages/Messages";
import AddNewAdmin from "./admin/AddNewAdmin";
import Appointments from "./appointment/Appointment";
import AddNewDoctor from "./doctors/AddNewDoctor";
import Home from "./components/Home";
import AllDoctors from "./doctors/AllDoctors";
import AllDepartment from "./departments/AllDepartment";
import UpdateDepartment from "./departments/UpdateDepartment";
import AddDept from "./departments/AddDept";
import UpdateDoctor from "./doctors/UpdateDoctor";
import GetAccreditation from "./about/accredetation/GetAccreditation";
import UpdateAccreditation from "./about/accredetation/UpdateAccreditation";
import AddNewAcc from "./about/accredetation/AddNewAcc";
import AddDirectors from "./about/director/AddDirectors";
import UpdateDirector from "./about/director/UpdateDirector";
import AllDirector from "./about/director/AllDirector";
import Updateqp from "./about/equipped/Updateqp";
import Allequipped from "./about/equipped/Allequipped";
import Addneweqp from "./about/equipped/Addneweqp";
import Allcorporate from "./about/corporate/Allcorporate";
import AddNewCorporate from "./about/corporate/Addnewcorporate";
import Updatecoporate from "./about/corporate/Updatecoporate";
import AllNavbar from "./Homepage/navbar/AllNavbar";
import UpdateNavbar from "./Homepage/navbar/UpdateNavbar";
import Intro from "./Homepage/intro/Intro";
import UpdateIntro from "./Homepage/intro/UpdateIntro";
import AddIntro from "./Homepage/intro/AddIntro";
import Allwhowe from "./Homepage/whowe/Allwhowe";
import Updatewhowe from "./Homepage/whowe/Updatewhowe";
import Addnewwho from "./Homepage/whowe/Addnewwho";
import Allinfra from "./Homepage/infra/Allinfra";
import Newinfra from "./Homepage/infra/NewInfra";
import Updateinfra from "./Homepage/infra/Updateinfra";
import Addcsr from "./Homepage/csr/Addcsr";
import Updatecsr from "./Homepage/csr/Updatecsr";
import Allcsr from "./Homepage/csr/Allcsr";
import AllTestim from "./Homepage/testimonial/AllTestim";
import UpdateTest from "./Homepage/testimonial/UpdateTest";
import AddTestim from "./Homepage/testimonial/AddTestim";
import Allpatientspeak from "./Homepage/patientspeak/Allpatientspeak";
import Updatepatientspeak from "./Homepage/patientspeak/Updatepatientspeak";
import Addpatientspeak from "./Homepage/patientspeak/Addpatientspeak";
import Allblog from "./Homepage/blog/Allblog";
import Updateblog from "./Homepage/blog/Updateblog";
import Addnewblog from "./Homepage/blog/Addnewblog";
import Addnavbar from "./Homepage/navbar/Addnavbar";
import Allfooter from "./Homepage/footer/Allfooter";
import Updatefooter from "./Homepage/footer/Updatefooter";
import Addfooter from "./Homepage/footer/Addfooter";
import Allhealth from "./Homepage/health/Allhealth";
import Addhealth from "./Homepage/health/Addhealth";
import Allslider from "./Homepage/slider/Allslider";
import Addslider from "./Homepage/slider/Addslider";
import Updateslider from "./Homepage/slider/Updateslider";
import Updatehalth from "./Homepage/health/Updatehalth";
import Alllanaesth from "./subdepartemnt/anaesth/Alllanaesth";
import Updateanaesth from "./subdepartemnt/anaesth/Updateanaesth";
import Addanaesth from "./subdepartemnt/anaesth/Addanaesth";
import AllCardio from "./subdepartemnt/cardio/Allcardio";
import UpdateCardio from "./subdepartemnt/cardio/Updatecardio";
import AddCardio from "./subdepartemnt/cardio/Addcardio";
import Allortho from "./subdepartemnt/ortho/Allortho";
import Updateortho from "./subdepartemnt/ortho/Updateortho";
import Addortho from "./subdepartemnt/ortho/Addortho";

const App = () => {
  const { isAuthenticated, loading, logout } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    // Optionally, check authentication status on component mount
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    toast.success("Successfully logged out!"); // Show success toast
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while loading
  }

  return (
    <Router>
      <div className="app">
        <div className="layout">
          {isAuthenticated && <Sidebar onLogout={handleLogout} />}
          <div className="wrapper">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

              {/* Protected Routes */}
              {isAuthenticated ? (
                <>
                  <Route path="/navbar" element={<AllNavbar />} />
                  <Route path="/navbar/addnew" element={<Addnavbar />} />
                  <Route path="/navbar/update/:id" element={<UpdateNavbar />} />
                  <Route path="/intro/getall" element={<Intro />} />
                  <Route path="/intro/update/:id" element={<UpdateIntro />} />
                  <Route path="/intro/addnew" element={<AddIntro />} />

                  {/* Whowe routes */}
                  <Route path="/whowe/getall" element={<Allwhowe />} />
                  <Route path="/whowe/update/:id" element={<Updatewhowe />} />
                  <Route path="/whowe/addnew" element={<Addnewwho />} />

                  {/* CSR routes */}
                  <Route path="/csr/getall" element={<Allcsr />} />
                  <Route path="/csr/update/:id" element={<Updatecsr />} />
                  <Route path="/csr/addnew" element={<Addcsr />} />

                  {/* Blog routes */}
                  <Route path="/blog/getall" element={<Allblog />} />
                  <Route path="/blog/update/:id" element={<Updateblog />} />
                  <Route path="/blog/addnew" element={<Addnewblog />} />

                  {/* Testimonial routes */}
                  <Route path="/Testimonials/getall" element={<AllTestim />} />
                  <Route path="/Testimonials/update/:id" element={<UpdateTest />} />
                  <Route path="/Testimonials/addnew" element={<AddTestim />} />

                  {/* Patient speak routes */}
                  <Route path="/patientspeak/getall" element={<Allpatientspeak />} />
                  <Route path="/patientspeak/update/:id" element={<Updatepatientspeak />} />
                  <Route path="/patientspeak/addnew" element={<Addpatientspeak />} />

                  {/* Infrastructure routes */}
                  <Route path="/infra/getall" element={<Allinfra />} />
                  <Route path="/infra/update/:id" element={<Updateinfra />} />
                  <Route path="/infra/addnew" element={<Newinfra />} />

                  {/* Footer routes */}
                  <Route path="/footer/getall" element={<Allfooter />} />
                  <Route path="/footer/update/:id" element={<Updatefooter />} />
                  <Route path="/footer/addnew" element={<Addfooter />} />

                  {/* Health routes */}
                  <Route path="/health/getall" element={<Allhealth />} />
                  <Route path="/health/update/:id" element={<Updatehalth />} />
                  <Route path="/health/addnew" element={<Addhealth />} />

                  {/* Slider routes */}
                  <Route path="/hero/getall" element={<Allslider />} />
                  <Route path="/hero/update/:id" element={<Updateslider />} />
                  <Route path="/hero/addnew" element={<Addslider />} />


                {/* subdepartment detail routes  */}
                   
                <Route path="/anaesth/getall" element={<Alllanaesth />} />
                  <Route path="/anaesth/update/:id" element={<Updateanaesth />} />
                  <Route path="/anaesth/addnew" element={<Addanaesth />} />


                  <Route path="/cardiology/getall" element={<AllCardio />} />
                  <Route path="/cardiology/update/:id" element={<UpdateCardio />} />
                  <Route path="/cardiology/addnew" element={<AddCardio />} />


                  <Route path="/orthopedics/getall" element={<Allortho />} />
                  <Route path="/orthopedics/update/:id" element={<Updateortho />} />
                  <Route path="/orthopedics/addnew" element={<Addortho />} />



                  {/* Other admin routes */}
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/admin/addnew" element={<AddNewAdmin />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/doctor/addnew" element={<AddNewDoctor />} />
                  <Route path="/doctor/getall" element={<AllDoctors />} />
                  <Route path="/doctor/update/:id" element={<UpdateDoctor />} />
                  <Route path="/department/addnew" element={<AddDept />} />
                  <Route path="/department/getall" element={<AllDepartment />} />
                  <Route path="/department/update/:id" element={<UpdateDepartment />} />
                  <Route path="/about/accreditation/addnew" element={<AddNewAcc />} />
                  <Route path="/about/accreditation/all" element={<GetAccreditation />} />
                  <Route path="/about/accreditation/update/:id" element={<UpdateAccreditation />} />
                  <Route path="/about/director/addnew" element={<AddDirectors />} />
                  <Route path="/about/director/update" element={<UpdateDirector />} />
                  <Route path="/about/director/getall" element={<AllDirector />} />
                  <Route path="/about/equipped/getall" element={<Allequipped />} />
                  <Route path="/about/equipped/update/:id" element={<Updateqp />} />
                  <Route path="/about/equipped/addnew" element={<Addneweqp />} />
                  <Route path="/about/corporate/getall" element={<Allcorporate />} />
                  <Route path="/about/corporate/addnew" element={<AddNewCorporate />} />
                  <Route path="/about/corporate/update/:id" element={<Updatecoporate />} />
                </>
              ) : (
                // Redirect if trying to access protected routes without authentication
                <Route path="*" element={<Navigate to="/login" />} />
              )}

              {/* Login route */}
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
};

export default App;
