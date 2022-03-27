import { motion } from "framer-motion";
import React from "react";
import styles from "./Newsletter.module.scss";

const Newsletter = () => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const transition = {
    duration: 2,
    ease: "easeInOut",
  };
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.text}
          initial="initial"
          whileInView="animate"
          variants={variants}
          transition={transition}
          viewport={{ once: true }}
        >
          <h1 className={styles.title}>NEWSLETTER</h1>
          <p className={styles.paragraph}>Sign up to recive updates on new</p>
          <p className={styles.paragraph}>products and special offers</p>
        </motion.div>
        <motion.form
          className={styles.form}
          initial="initial"
          whileInView="animate"
          variants={variants}
          transition={transition}
          viewport={{ once: true }}
        >
          <p className={styles.fieldName}>Email *</p>
          <div className={styles.field}>
            <input type="text" className={styles.input} />
            <button className={styles.button}>Submit</button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
