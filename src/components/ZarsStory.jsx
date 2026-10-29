import { useEffect, useRef, useState } from "react";
import zarsStory from "../assets/img/zars-story.jpg";
import styles from "../styles/ZarsStory.module.css";

const highlights = [
  { value: "100,000", label: "Bottles a Year" },
  { value: "5-Stage", label: "Filtration" },
  { value: "40%", label: "ABV" },
];

const ZarsStory = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Reveal once when scrolled into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.story} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.imageWrap}>
        <img
          src={zarsStory}
          alt="Zars Reserve artwork: Moscow by moonlight meets Delhi at sunrise, joined by a crowned lion crest"
          width="900"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>The Zars Story</p>
        <h2>
          Russian in Spirit.
          <br />
          <em>Indian at Heart.</em>
        </h2>
        <span className={styles.rule} />
        <p className={styles.text}>
          Born in the imagination of imperial Russia, Zars Reserve journeys
          east, from the frozen grandeur of Moscow to the restless spirit of
          India. A vodka created for those who carry their own kingdom within.
        </p>
        <div className={styles.highlights}>
          {highlights.map((h) => (
            <div key={h.label}>
              <span className={styles.value}>{h.value}</span>
              <span className={styles.label}>{h.label}</span>
            </div>
          ))}
        </div>
        <p className={styles.route}>Russia — India</p>
      </div>
    </section>
  );
};

export default ZarsStory;
