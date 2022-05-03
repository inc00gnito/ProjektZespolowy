import React, { useEffect, useState } from "react";
import styles from "./Discounts.module.scss";
import cx from "classnames";
import track1 from "assets/discount1.webp";
import track2 from "assets/discount2.webp";
import track3 from "assets/discount3.webp";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Discounts = () => {
  const [render, setRender] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "-350px",
  });
  const [isPortrait, setPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  useEffect(() => {
    if (inView) setRender(true);
  }, [inView]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerHeight > window.innerWidth) setPortrait(true);
    };
    window.addEventListener("resize", onResize);
  });

  const titleCardVariants = {
    initial: { opacity: 0, x: 100, y: isPortrait ? 0 : "-50%" },
    animate: {
      opacity: 1,
      x: 0,
      y: isPortrait ? 0 : "-50%",
    },
  };
  const tracksVariants = {
    initial: { opacity: 0, x: -100 },
    animate: {
      opacity: 1,
      x: 0,
    },
  };
  const transition = {
    duration: 1.5,
    ease: "easeInOut",
  };
  return (
    <section className={styles.container} ref={ref}>
      <AnimatePresence>
        <div className={styles.content}>
          <motion.div
            className={styles.titleCard}
            initial="initial"
            variants={titleCardVariants}
            whileInView="animate"
            viewport={{ once: true }}
            transition={transition}
          >
            <div className={styles.text}>
              <p className={styles.paragraph}>THIS WEEK'S DEALS</p>
              <h1 className={styles.discount}>10%</h1>
              <h2 className={styles.subTitle}>of all tracks</h2>
            </div>

            <Link to="/tracks" className={styles.button}>
              Shop Now
            </Link>
          </motion.div>
          <motion.div
            className={styles.tracks}
            initial="initial"
            variants={tracksVariants}
            whileInView="animate"
            viewport={{ once: true }}
            transition={transition}
          >
            <div className={cx(styles.track, styles.trackOne)}>
              <img
                src={track1}
                alt="discounted track"
                className={styles.image}
              />
            </div>
            <div className={cx(styles.track, styles.trackTwo)}>
              <img
                src={track2}
                alt="discounted track"
                className={styles.image}
              />
            </div>
            <div className={cx(styles.track, styles.trackThree)}>
              <img
                src={track3}
                alt="discounted track"
                className={styles.image}
              />
            </div>
          </motion.div>
        </div>
        {/* ) : null} */}
      </AnimatePresence>
    </section>
  );
};

export default Discounts;
