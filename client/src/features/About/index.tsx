import React from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./styles/About.module.scss";
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
              <img
                className={styles.gif}
                src="https://static.wixstatic.com/media/53f1e3_8b07c51aea4e4fdf8e54862a5ff0e33b~mv2.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default About;
