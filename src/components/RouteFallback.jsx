import styles from "../styles/RouteFallback.module.css";

/**
 * Shown while a lazily-loaded route chunk is being fetched. The navbar and
 * footer stay put, so this only needs to hold the space in between and keep
 * the page from collapsing to nothing for the split second it takes.
 */
const RouteFallback = () => (
  <div className={styles.route_fallback} role="status" aria-label="Loading">
    <span className={styles.track}>
      <i className={styles.bar} />
    </span>
  </div>
);

export default RouteFallback;
