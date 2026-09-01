import { useEffect, useRef, useState } from "react";
import pipemajor from "../assets/img/pipemajor_product.png";
import styles from "../styles/Home.module.css";

const PipeMajor = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
  
    const section = ref.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <div
      className={`${styles.product_container} ${
        visible ? styles.product_reveal : ""
      }`}
      ref={ref}
    >
      <div className={styles.product_img}>
        {!imgLoaded && <div className={styles.skeleton}></div>}
        <img
          src={pipemajor}
          alt="pipe-major"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`${styles.lazyImg} ${imgLoaded ? styles.loaded : ""}`}
        />
      </div>

      <div className={styles.product_details}>
        <h2>Pipe Major</h2>
        <span>Blended Scotch Whisky</span>
        <p> Price : ₹1500-2000</p>
        <div>
          <p>
            Pipe Major is a blended Scotch whisky that offers a smooth,
            well-rounded flavor with notes of oak, caramel, and malt. Inspired
            by Scotland’s rich heritage, it’s an approachable whisky, perfect
            for enjoying neat, on the rocks, or in cocktails.
          </p>
          <p>- ABV: 40%</p>
          <p>- Presence: Delhi, West Bengal, Haryana</p>
        </div>
      </div>
    </div>
  );
};

export default PipeMajor;
