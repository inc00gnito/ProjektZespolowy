import React from "react";
import styles from "./styles/Home.module.scss";
import { BiSearch } from "react-icons/bi";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Home: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.title}>
          <h1 className={styles.heading}>TRACKSLANCE.</h1>
        </div>

        <div className={styles.menu}>
          <ul className={styles.menuItems}>
            <li className={styles.link}>Tracks</li>
            <li className={styles.link}>On Sale</li>
            <li className={styles.link}>About Us</li>
            <li className={styles.link}>Contact Us</li>
          </ul>
          <div className={styles.search}>
            <BiSearch className={styles.icon} />
          </div>
          <div className={styles.account}>
            <span className={styles.item}>Log In</span>
          </div>
        </div>
      </nav>
      <div className={styles.padding}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Home;
