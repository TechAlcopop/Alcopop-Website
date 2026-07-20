import { motion } from "framer-motion";
import styles from "../styles/About.module.css";
import WhoWeAre from "../assets/img/aboutMap.jpg";
import { Link } from "react-router-dom";
import globe from "../assets/img/streamline-plump_web.svg";
import dist from "../assets/img/carbon_sysplex-distributor.svg"
import retail from "../assets/img/mdi_cloud-access-outline.svg"
import partner from "../assets/img/carbon_partnership.svg"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Aboutus = () => {
  return (
    <div className={styles.about_main_container}>
      {/* Header */}
      <motion.div
        className={styles.about_header_banner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2>
          Alcopop Spirits is revolutionizing the Alcohol Industry in India by
          empowering brands with innovative solutions for manufacturing,
          distribution, and growth in India’s vibrant market.
        </h2>
      </motion.div>
      
      {/* Who We Are */}
      <motion.div
        className={styles.who_we_main}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.who_we_cont}>
          <div className={styles.who_we_content}>
            <h2>Who We Are</h2>
            <h1>
              Alcopop Spirits: Launchpad to India’s <br /> Thriving Alcohol
              Market
            </h1>
            <p>
              Founded in 2021, Alcopop Spirits serves as a multi brand,
              multi-product platform for domestic and international brands
              offering expertise in manufacturing, distribution, logistics,
              sales, and marketing of alcohol brands.
            </p>
            <p>
              Our on-ground expertise, deep regulatory knowledge, and industry
              insights ensure easy market entry across both state-led and
              private markets. Whether you’re a retail partner, or a brand
              looking to grow in the Indian market, we are your gateway to the
              Indian market.
            </p>
            <div className={styles.who_we_grids}>
              <div>
                <div>
                  <img src={globe} alt="globe" />
                  <p>Market Research</p>
                </div>
                <div>
                  <img src={dist} alt="dist" />
                  <p>Access to local Distributors</p>
                </div>
                <div>
                  <img src={partner} alt="partner" />
                  <p>HORECA Partnerships</p>
                </div>
              </div>
              <div>
                <div>
                  <img src={globe} alt="globe" />
                  <p>Digital Infrastructure</p>
                </div>
                <div>
                  <img src={retail} alt="retail" />
                  <p>Access to Retailers</p>
                </div>
              </div>
            </div>
             <p>Current Reach: Goa, Haryana, West Bengal, Uttar Pradesh, Delhi</p>
          </div>
          <div className={styles.who_we_image}>
            <motion.img
              src={WhoWeAre}
              alt="who-we-are"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
         
        </div>
      </motion.div>

      {/* Our Impact */}
      <motion.div
        className={styles.our_impact_cont}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2>Our Reach</h2>
        <h1>Number that define Our Success</h1>
        <div className={styles.our_impact_grid}>
          <motion.div variants={fadeInUp}>
            <h2>5+</h2>
            <h3>STATES</h3>
            <p>Market Presence</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2>500+</h2>
            <h3>RETAILERS</h3>
            <p>Partnership Network</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2>10+</h2>
            <h3>DISTRIBUTORS</h3>
            <p>Local Expertise</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2>4+</h2>
            <h3>BRANDS</h3>
            <p>Successfully Launched</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Partner */}
      <motion.div
        className={styles.partner_cont}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1>Partner with Us</h1>
        <p>
          Alcopop Spirits isn’t just a distributor—it’s a launchpad and end to
          end platform for your success. Whether you’re a global brand entering
          India or a local innovator looking to scale, we’re here to amplify
          your story and deliver growth. Partner with us to build a successful,
          strategic presence in one of the world’s fastest growing markets.
        </p>
        <div className={styles.connect_btn_cont}>
          <Link to={'/contact-us'}>CONNECT</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Aboutus;
