import React, { useState } from "react";
import styles from "./styles/Home.module.scss";
import { BiSearch } from "react-icons/bi";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import user from "assets/user.png";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Home: React.FC<IProps> = ({ children }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [mobileVisiblity, setMobileVisibility] = useState("visible");

  const variants = () => {
    if (isOpen)
      return {
        y: 0,
        opacity: 1,
      };
    else
      return {
        y: "-10vh",
        opacity: 0,
      };
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.title}>
          <h1 className={styles.heading}>TRACKSLANCE.</h1>
        </div>

        <div className={styles.mobileIcons}>
          <motion.div
            className={styles.hamburger}
            animate={isOpen ? "open" : "closed"}
          >
            <MenuToggle
              toggle={() => toggleOpen()}
              color={isOpen ? "#000" : "#fff"}
            />
          </motion.div>
          <div className={styles.search}>
            <BiSearch className={styles.icon} />
          </div>
        </div>
        <motion.div
          className={styles.mobileMenu}
          animate={variants()}
          style={{
            visibility: mobileVisiblity as any,
          }}
          initial={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 230,
            damping: 40,
          }}
          onAnimationComplete={() => {
            if (!isOpen) setMobileVisibility("hidden");
          }}
          onAnimationStart={() => {
            if (isOpen) setMobileVisibility("visible");
          }}
        >
          <div className={styles.header}>
            <div className={styles.user}>
              <img src={user} alt="user" className={styles.image} />
            </div>
          </div>
          <div className={styles.menuM}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a href="" className={styles.link}>
                  Tracks
                </a>
              </li>
              <li className={styles.item}>
                <a href="" className={styles.link}>
                  On Sale
                </a>
              </li>
              <li className={styles.item}>
                <a href="" className={styles.link}>
                  About Us
                </a>
              </li>
              <li className={styles.item}>
                <a href="" className={styles.link}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

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
