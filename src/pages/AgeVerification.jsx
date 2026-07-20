import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AgeVerification.module.css";
import BannerImage from "../assets/images/Thank-You.webp";

const AgeVerification = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isDenied, setIsDenied] = useState(false);
  const navigate = useNavigate();

  // Check if user is verified & if 24 hours have passed
  useEffect(() => {
    const verificationTimestamp = localStorage.getItem("verificationTime");
    if (verificationTimestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(verificationTimestamp, 10);

      // 24 hours = 24 * 60 * 60 * 1000 ms (1 Day)
      if (timeDifference < 24 * 60 * 60 * 1000) {
        navigate("/"); // Redirect if still within 24 hours
      }
    }
  }, [navigate]);

  const handleVerification = (ageConfirmed) => {
    if (ageConfirmed) {
      localStorage.setItem("isVerified", "true");
      localStorage.setItem("verificationTime", new Date().getTime()); // Store current time
      setIsPopupVisible(false);
      navigate("/"); // Redirect to Home
    } else {
      setIsDenied(true);
    }
  };

  return (
    <div className={styles.age_verification}>
      {/* Background Image */}
      <div className={styles.banner_container_age}>
        <img src={BannerImage} alt="age-banner" />
      </div>
      {/* Age Verification Popup */}
      {isPopupVisible && (
        <div className={styles.popup_overlay}>
          <div className={styles.popup}>
            {isDenied ? (
              <h3>You are not eligible to access this website.</h3>
            ) : (
              <>
                <p>
                  The content on our website is NOT for people below the legal
                  drinking age in their country/region.
                </p>
                <h3>Are you of legal drinking age or above in your country?</h3>
                <div className={styles.button_container}>
                  <button
                    onClick={() => handleVerification(true)}
                    className={styles.yes_btn}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleVerification(false)}
                    className={styles.no_btn}
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeVerification;
