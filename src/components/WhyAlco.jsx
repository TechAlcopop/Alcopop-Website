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

const VIDEO_SRC =
  "https://res.cloudinary.com/dj0ysu3nb/video/upload/v1743144552/d3oqyeyfy5te7azknh81.mp4";

const WhyAlco = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [startCount, setStartCount] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

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

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // This section is well below the fold, but the video used to start
  // downloading the moment the page loaded, stealing bandwidth from the hero
  // artwork. Hold it back until the visitor is nearly scrolled to it — the
  // margin gives it a head start so it is still playing by the time it shows.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // <source> is rendered rather than assigned, so the element needs a nudge to
  // pick it up and honour autoPlay.
  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video) return;

    video.load();
    const play = video.play();
    // Autoplay can still be refused (battery saver, reduced data). Muted
    // inline video is normally allowed, and a refusal is not worth surfacing.
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, [loadVideo]);

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
            ref={videoRef}
            className={styles.foreground_video}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            {loadVideo && <source src={VIDEO_SRC} type="video/mp4" />}
          </video>
        </div>
      </div>
    </div>
  );
};

export default WhyAlco;
