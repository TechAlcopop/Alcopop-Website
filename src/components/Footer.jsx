import styles from "../styles/Footer.module.css";
import Instagram from "../assets/img/mdi_instagram.svg";
import Linkedin from "../assets/img/linkdin.svg";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <h3>ALCOPOP PROMISE</h3>
      <p>
        Driving growth in India’s thriving <br /> alcohol market
      </p>

      <div className={styles.footer_end}>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
          <Link to="/contact-us">Contact</Link>
        </div>

        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/alcopopspirits/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Instagram} alt="Instagram" />
          </a>
          <a
            href="https://in.linkedin.com/company/alcopop-spirits-pvt-ltd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Linkedin} alt="Linkedin" />
          </a>
        </div>

        <div>All Right Reserved 2026</div>
      </div>
    </footer>
  );
};

export default Footer;
