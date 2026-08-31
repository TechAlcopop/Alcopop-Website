import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { isAgeVerified } from "./utils/ageVerification";

function ProtectedRoute({ children }) {
  return isAgeVerified() ? children : <Navigate to="/age-verification" replace />;
}

function AppShell() {
  const { pathname } = useLocation();
  // The age gate owns the whole screen: no navbar or footer to scroll or click past
  const isAgeGate = pathname === "/age-verification";

  return (
    <div className="main_container_all">
      <ScrollToTop />
      {!isAgeGate && <Navbar />}
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
        <Route path="*" element={<Navigate to="/age-verification" replace />} />
      </Routes>
      {!isAgeGate && <Footer />}
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
