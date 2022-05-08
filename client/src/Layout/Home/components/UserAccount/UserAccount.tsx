import React, { useState } from "react";
import styles from "./UserAccount.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthenticationStore } from "app/provider/Provider";

const UserAccount = () => {
  const { logout } = useAuthenticationStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.profile}>
      <div className={styles.icon} onClick={toggleMenu}>
        <span className={styles.text}>A</span>
      </div>
      {isMenuOpen ? (
        <div className={styles.menuContainer}>
          <div className={styles.overlay} onClick={closeMenu} />
          <div className={styles.menu}>
            <ul className={styles.options}>
              <li className={styles.item}>
                <Link to="/profile" className={styles.itemLink}>
                  <div className={styles.iconContainer}>
                    <FaRegUserCircle className={styles.itemIcon} />
                  </div>
                  <span className={styles.itemName}>Profile</span>
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/settings" className={styles.itemLink}>
                  <div className={styles.iconContainer}>
                    <FiSettings className={styles.itemIcon} />
                  </div>
                  <span className={styles.itemName}>Settings</span>
                </Link>
              </li>

              <li className={styles.item} onClick={logout}>
                <div className={styles.itemLink}>
                  <div className={styles.iconContainer}>
                    <AiOutlineLogout className={styles.itemIcon} />
                  </div>
                  <span className={styles.itemName}>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserAccount;
