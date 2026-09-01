import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import pipebottle from "../assets/img/pipemajor_headerimage.png";
import zars from "../assets/img/ZarsReserve.png";

const Home_header = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Only one bottle is in the DOM at a time, so without this the second one
  // would not start downloading until the rotation first reached it — leaving
  // an empty slot mid-animation. Warm both up front; the browser serves the
  // swap straight from cache.
  useEffect(() => {
    [zars, pipebottle].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev === 0 ? 1 : 0));
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.header_container}>
      {index === 0 ? (
        <>
          <div
            className={styles.text_container}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <p className={styles.typing1}> ZARS RESERVE</p>
            <p className={styles.typing2}>Russian Vodka</p>
          </div>
          <div
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            id={styles.zars_header}
          >
            <img src={zars} alt="Zars Reserve" className={styles.fade_in_img} />
          </div>
        </>
      ) : (
        <>
          <div
            className={styles.text_container}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <p className={styles.typing1}>PIPE MAJOR</p>
            <p className={styles.typing2}>
              Blended Scotch Whisky
            </p>
          </div>
          <div
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <img
              src={pipebottle}
              alt="Pipe Major"
              className={styles.fade_in_img}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home_header;
