import React from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./styles/About.module.scss";
import gif from "assets/gif.gif";
const About = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.wrapper1}>
            <h1 className={styles.Team}>Our Team.</h1>
            <p className={styles.text}>Team of students from Warsaw.</p>
            <p className={styles.text}>You are now listening to Trackslance.</p>
            <p className={styles.text}>Welcome to our music family.</p>
          </div>
          <div className={styles.wrappe2r}>
            <div className={styles.trackslance}>TRACKSLANCE.</div>
            <div>
              <img className={styles.gif} src={gif} alt="" />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default About;
