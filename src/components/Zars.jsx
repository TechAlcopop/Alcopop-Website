import { useEffect, useRef, useState } from "react";
import Zarsreserve from "../assets/img/zarsvodka.png";
import styles from "../styles/Zars.module.css";

const Zars = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting); 
    },
    { threshold: 0.3 }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);

  return () => {
    if (sectionRef.current) observer.unobserve(sectionRef.current);
  };
}, []);


  return (
    <div
      ref={sectionRef}
      className={`${styles.product_container} ${
        isVisible ? styles.product_reveal : ""
      }`}
    >
      <div className={styles.product_details}>
        <h2>ZARS RESERVE</h2>
        <span>Russian Vodka</span>
        <p> Price : ₹1800-2000</p>
        <div>
          <p>
            Zars reserve is a premium vodka crafted using Russian traditional
            methods and the finest natural ingredients. The highly sought-after
            'Alpha alcohol made from the best Russian grains and purified spring
            water, it undergoes five stages of filtration, including carbon and
            silver filters. This unique vodka is released in a limited edition
            of 100,000 bottles annually.
          </p>
          <p>ABV: 40%</p>
          <p>Presence: Delhi, Haryana</p>
        </div>
      </div>
      <div>
        <img src={Zarsreserve} alt="zars" />
      </div>
    </div>
  );
};

export default Zars;
