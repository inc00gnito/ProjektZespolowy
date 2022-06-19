import React, { useState } from "react";
import styles from "./UserAccount.module.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthenticationStore } from "app/provider/Provider";

const UserAccount = () => {
  const { logout, user } = useAuthenticationStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.profile}>
      <button
        className={styles.icon}
        onClick={toggleMenu}
        tabIndex={0}
        type="button"
        aria-haspopup="true"
        aria-label="Account settings"
      >
        <span className={styles.text}>
          {user?.username.slice(0, 1).toUpperCase()}
        </span>
      </button>
      {isMenuOpen ? (
        <div className={styles.menuContainer} tabIndex={-1}>
          <div className={styles.overlay} onClick={closeMenu} />
          <div className={styles.menu}>
            <ul className={styles.options} role="menu" tabIndex={-1}>
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
