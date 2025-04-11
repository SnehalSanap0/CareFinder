import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceCategories from "./components/ServiceCategories";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Safety from "./components/Safety";
import Services from "./components/Services";
import ChildCare from "./components/ChildCare";
import PetCare from "./components/PetCare";
import SeniorCare from "./components/SeniorCare";
import HouseKeeping from "./components/HouseKeeping";
import FindCaregiver from "./components/FindCaregiver";
import Becomecaregiver from "./components/Becomecaregiver";
import CaregiverApplicationForm from "./components/CaregiverApplicationForm";
import CaregiverDashboard from "./components/CargiverDashboard";
import UserDashboard from "./components/UserDashboard";


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ServiceCategories />
                <HowItWorks />
                <Testimonials />
                <CallToAction />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/safety" element={<PrivateRoute><Safety /></PrivateRoute>} />
          <Route path="/how-it-works" element={<PrivateRoute><HowItWorks /></PrivateRoute>} />
          <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/caregiver-dashboard" element={<PrivateRoute><CaregiverDashboard /></PrivateRoute>} />

          {/* Services Routes */}
          <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
          <Route path="/child-care" element={<PrivateRoute><ChildCare /></PrivateRoute>} />
          <Route path="/pet-care" element={<PrivateRoute><PetCare /></PrivateRoute>} />
          <Route path="/senior-care" element={<PrivateRoute><SeniorCare /></PrivateRoute>} />
          <Route path="/house-keeping" element={<PrivateRoute><HouseKeeping /></PrivateRoute>} />
      
          {/* Caregiver Routes */}
          <Route path="/find-caregiver" element={<PrivateRoute><FindCaregiver /></PrivateRoute>} />
          <Route path="/become-caregiver" element={<PrivateRoute><Becomecaregiver /></PrivateRoute>} />
          <Route path="/caregiver-form" element={<PrivateRoute><CaregiverApplicationForm /></PrivateRoute>} />
                  </Routes>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
