import { useEffect, useRef, useState } from "react";
import WhoWeAreee from "../assets/img/whoweare.jpg";
import styles from "../styles/Home.module.css";

const WhoWeAre = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.who_main_cont} ref={ref}>
      <div className={styles.imageWrapper}>
        {!imgLoaded && <div className={styles.imgSkeleton}></div>}
        <img
          src={WhoWeAreee}
          alt="who-we-are"
          onLoad={() => setImgLoaded(true)}
          className={`${styles.img} ${imgLoaded ? styles.loaded : ""}`}
        />
      </div>

      <div
        className={`${styles.Who_details_cont} ${
          isVisible ? styles.animate : ""
        }`}
      >
        <div>
          <h3>Who We Are</h3>
          <h1>The Go-To-Market Platform for Alcohol Brands in India</h1>
          <p>
            At Alcopop Spirits, we provide end-to-end solutions for domestic and
            international alcohol brands, simplifying market entry and driving
            growth in India’s thriving alcohol market.
          </p>
          <p>
            On-ground expertise with strong regulatory knowledge, delivering
            end-to-end services across alcohol procurement and distribution,
            with state-wise experience in licensing, registrations, and
            warehousing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
