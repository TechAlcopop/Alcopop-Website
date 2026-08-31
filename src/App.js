import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AgeGate from "./components/AgeGate";
import Aboutus from "./pages/Aboutus";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import ContactUs from "./pages/ContactUs";
import Compare from "./pages/Compare";
import Appointment from "./pages/Appointment";

function AppShell() {
  return (
    <div className="main_container_all">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* Old gate URL kept so existing links and search results still land somewhere */}
        <Route path="/age-verification" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {/* Sits above everything until the visitor confirms their age */}
      <AgeGate />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
