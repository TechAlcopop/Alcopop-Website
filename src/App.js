import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AgeGate from "./components/AgeGate";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import RouteFallback from "./components/RouteFallback";

// Home is the landing route, so it stays in the main bundle. The rest are
// split into their own chunks: nobody pays for the appointment page's 700+
// lines, or for axios (only Compare uses it), just to look at the homepage.
const Aboutus = lazy(() => import("./pages/Aboutus"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Compare = lazy(() => import("./pages/Compare"));
const Appointment = lazy(() => import("./pages/Appointment"));

// Warm the secondary chunks once the browser is idle, so splitting them out
// costs nothing on the first click through the nav.
const prefetchRoutes = () => {
  const load = () => {
    import("./pages/Aboutus");
    import("./pages/ContactUs");
    import("./pages/Appointment");
  };

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(load, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }

  const id = setTimeout(load, 2500);
  return () => clearTimeout(id);
};

function AppShell() {
  useEffect(prefetchRoutes, []);

  return (
    <div className="main_container_all">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
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
      </Suspense>
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
