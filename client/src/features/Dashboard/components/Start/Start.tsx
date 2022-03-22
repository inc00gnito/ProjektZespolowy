import React from "react";
import styles from "./Start.module.scss";
const Start = () => {
  return (
    <div className={styles.start}>
      <div className={styles.content}>
        <div className={styles.boxes}>
          <div className={styles.pinkCard}>
            <h1 className={styles.heading}>
              TRACKS FOR <br /> ALL SORT OF <br /> MOODS
            </h1>
            <span className={styles.subHeading}>
              Now Available on PC &#38; Mobile
            </span>
            <button className={styles.button}>Buy Now</button>
          </div>
          <div className={styles.composerCard}>
            <div className={styles.text}>
              <div className={styles.first}>
                <div className={styles.firstContent}>
                  <span className={styles.firstLetter}>L</span>
                  <span className={styles.restLetters}>ANCE</span>
                </div>

                <div className={styles.second}>
                  <span className={styles.text}>TRACKS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
