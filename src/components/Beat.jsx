import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "../styles/Beat.module.css";
import groupbeat from "../assets/img/Beat-group.jpeg";

const Beat = () => {
  const varieties = [
    { name: "Orange Cinnamon" },
    { name: "Classic Mint Mojito" },
    { name: "Cranberry Blast" },
    { name: "Watermelon Crush" },
  ];

  // attach this ref to the section wrapper
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });

  return (
    <div
      ref={sectionRef}
      className={styles.beat_container}
      style={{ overflowX: "hidden" }}
    >
      <div className={styles.beat_details}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.imageWrapper}
        >
          <img loading="lazy" src={groupbeat} alt="Beat" />
        </motion.div>

        <div className={styles.beat_details_cont}>
          <div>
            <p>4</p>
            <p>SKU'S</p>
          </div>
          <div>
            <p>9.5%</p>
            <p>Alcohol Content</p>
          </div>
          <div>
            <p>3</p>
            <p>States</p>
          </div>
        </div>
      </div>

      <motion.div
        className={styles.beat_variety}
        initial={{ x: 100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2>BEAT</h2>
          <div className={styles.variety_list}>
            {varieties.map((item, index) => (
              <div key={index} className={styles.variety_item}>
                <div className={styles.golden_line}></div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Beat;
