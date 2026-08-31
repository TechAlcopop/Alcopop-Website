import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AgeVerification.module.css";
import AlcoPopLogo from "../assets/images/Alcopop-logo.png";
import { isAgeVerified, setAgeVerified } from "../utils/ageVerification";

const AgeVerification = () => {
  const [isDenied, setIsDenied] = useState(false);
  const navigate = useNavigate();

  // Skip the gate if it was already cleared in the last 24 hours
  useEffect(() => {
    if (isAgeVerified()) navigate("/", { replace: true });
  }, [navigate]);

  // Lock the page while the gate is up: nothing scrolls until "Yes"
  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, []);

  const handleVerification = (ageConfirmed) => {
    if (ageConfirmed) {
      setAgeVerified();
      navigate("/", { replace: true });
    } else {
      setIsDenied(true);
    }
  };

  return (
    <div className={styles.age_gate}>
      <div
        className={styles.gate_card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age_gate_title"
      >
        <img src={AlcoPopLogo} className={styles.gate_logo} alt="Alcopop Spirits" />

        {isDenied ? (
          <>
            <h2 id="age_gate_title" className={styles.gate_title}>
              Sorry, you can&rsquo;t enter
            </h2>
            <p className={styles.gate_copy}>
              You must be of legal drinking age in your country or region to
              view this website.
            </p>
            <button
              type="button"
              className={styles.back_btn}
              onClick={() => setIsDenied(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <span className={styles.gate_eyebrow}>Age Verification</span>
            <span className={styles.gate_divider} />
            <h2 id="age_gate_title" className={styles.gate_title}>
              Are you of legal drinking age?
            </h2>
            <p className={styles.gate_copy}>
              The content on this website is not intended for anyone below the
              legal drinking age in their country or region.
            </p>
            <div className={styles.button_container}>
              <button
                type="button"
                onClick={() => handleVerification(true)}
                className={styles.yes_btn}
              >
                Yes, I am
              </button>
              <button
                type="button"
                onClick={() => handleVerification(false)}
                className={styles.no_btn}
              >
                No
              </button>
            </div>
            <p className={styles.gate_note}>
              By entering, you confirm you are of legal drinking age.
              Please drink responsibly.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
