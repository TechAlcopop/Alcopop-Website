import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import AlcoPopLogo from "../assets/images/Alcopop-logo.png";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav_container}>
      <div className={styles.logo_cont}>
        <Link to="/" className={styles.nav_link}>
          <img src={AlcoPopLogo} className={styles.main_logo_img} alt="main-logo" />
        </Link>
      </div>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={30} color="#B0976D" /> : <FiMenu size={30} color="#B0976D" />}
      </div>

      <div className={styles.navbar_options}>
        <Link to="/" className={styles.nav_link}>Home</Link>
        <Link to="/about-us" className={styles.nav_link}>About</Link>
        {/* <Link to="/products" className={styles.nav_link}>Products</Link> */}
        <Link to="/contact-us" className={styles.nav_link}>Contact Us</Link>
        <Link to="/appointment" className={styles.navCta}>Book a Consultation</Link>

      </div>

      <div className={`${styles.mobile_menu} ${isOpen ? styles.show_menu : ""}`}>
        <Link to="/" className={styles.nav_link} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about-us" className={styles.nav_link} onClick={() => setIsOpen(false)}>About</Link>
        {/* <Link to="/products" className={styles.nav_link} onClick={() => setIsOpen(false)}>Products</Link> */}
        <Link to="/contact-us" className={styles.nav_link} onClick={() => setIsOpen(false)}>Contact Us</Link>
        <Link to="/appointment" className={styles.navCta} onClick={() => setIsOpen(false)}>Book a Consultation</Link>
      </div>
    </nav>
  );
};

export default Navbar;
