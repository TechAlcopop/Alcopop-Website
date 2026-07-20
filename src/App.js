import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AgeVerification from "./pages/AgeVerification";
import Aboutus from "./pages/Aboutus";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import ContactUs from "./pages/ContactUs";
import Compare from "./pages/Compare";
import Appointment from "./pages/Appointment";

function ProtectedRoute({ children }) {
  const isVerified = localStorage.getItem("isVerified") === "true";
  return isVerified ? children : <Navigate to="/age-verification" />;
}

function App() {
  return (
     <Router>
      <div className="main_container_all">
      <ScrollToTop />
      <Navbar />
      <Routes>
      <Route path="/age-verification" element={<AgeVerification />} />
      <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/about-us" element={<ProtectedRoute><Aboutus /></ProtectedRoute>} />
        <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
        <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/age-verification" />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
