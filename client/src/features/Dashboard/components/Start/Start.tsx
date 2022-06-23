import React from "react";
import styles from "./Start.module.scss";
import background from "assets/starterBgc.jpg";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigaiton = useNavigate();
  return (
    <div className={styles.start}>
      <div className={styles.background}>
        <img src={background} alt="concert" className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.boxes}>
          <div className={styles.pinkCard}>
            <div className={styles.textContainer}>
              <h1 className={styles.heading}>
                TRACKS FOR <br /> ALL SORT OF <br /> MOODS
              </h1>
              <span className={styles.subHeading}>
                Now Available on PC &#38; Mobile
              </span>
              <button
                className={styles.button}
                onClick={() => navigaiton("/tracks")}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className={styles.composerCard}>
            <div className={styles.composerText}>
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
          <div className={styles.composerTextMobile}>
            <div className={styles.text}>
              <div className={styles.second}>
                <span className={styles.text}>TRACKS</span>
                <div className={styles.first}>
                  <div className={styles.firstContent}>
                    <span className={styles.firstLetter}>L</span>
                    <span className={styles.restLetters}>ANCE</span>
                  </div>
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
