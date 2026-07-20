import { useEffect, useRef, useState } from "react";
import styles from "../styles/WhyAlco.module.css";

const useCountUp = (end, duration = 2000, startCount = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return; // don't start counting yet
    let start = 0;
    const increment = end / (duration / 16); // approx 60fps
    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, startCount]);

  return count;
};

const WhyAlco = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const retailCount = useCountUp(500, 2000, startCount);
  const promotersCount = useCountUp(10, 2000, startCount);
  const StatesCount = useCountUp(5, 2000, startCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true); // start counting when visible
        }
      },
      { threshold: 0.3 } // trigger when 30% of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.whyalco_container}>
      <div>
        <div className={styles.whyalco_content}>
          <p>WHY ALCOPOP</p>
          <p>
            At Alcopop Spirits, we provide end-to-end solutions for domestic and
            international alcohol brands, simplifying market entry and driving
            growth in India’s thriving alcohol market.
          </p>
          <div>
            <p>{retailCount}+</p>
            <p>Retail Partnerships</p>
          </div>
          <div>
            <p>{promotersCount}+</p>
            <p> Local Distributors</p>
          </div>
          <div>
            <p>{StatesCount}+</p>
            <p>States</p>
          </div>
        </div>

        <div>
          <video
            className={styles.foreground_video}
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/dj0ysu3nb/video/upload/v1743144552/d3oqyeyfy5te7azknh81.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default WhyAlco;
