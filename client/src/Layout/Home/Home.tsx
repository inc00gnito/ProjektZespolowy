import React, { useState } from "react";
import styles from "./styles/Home.module.scss";
import { BiSearch } from "react-icons/bi";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./components/MenuToggle/MenuToggle";
import userPicture from "assets/user.png";
import { Link } from "react-router-dom";
import { useAuthenticationStore, useCartStore } from "app/provider/Provider";
import { GiShoppingBag } from "react-icons/gi";
import Popup from "./components/Popup/Popup";
import { observer } from "mobx-react-lite";
import cx from "classnames";
import UserAccount from "./components/UserAccount/UserAccount";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Home: React.FC<IProps> = ({ children }) => {
  const { isPopup, shoppingList } = useCartStore();
  const { authPopUp, user, isAuthenticated, logout } = useAuthenticationStore();
  const shoppingListLength = shoppingList.size;

  const [isOpen, toggleOpen] = useCycle(false, true);
  const [mobileVisiblity, setMobileVisibility] = useState("visible");

  const { openPopUp } = useAuthenticationStore();

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
      {authPopUp && <div className={styles.overlay} />}

      <nav className={styles.nav}>
        <div className={styles.title}>
          <h1 className={styles.heading}>
            <Link to="/" className={styles.link}>
              TRACKSLANCE.
            </Link>
          </h1>
        </div>

        <div className={styles.mobileIcons}>
          <motion.div
            className={styles.hamburger}
            animate={isOpen ? "open" : "closed"}
            data-testid="homelayout__mobile__hamburger"
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
          aria-labelledby="mobilemenu"
          aria-describedby="mobilemenu"
          role="dialog"
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
          <div className={styles.mobileMenuContainer}>
            <div className={styles.header}>
              {isAuthenticated ? (
                <div className={styles.user}>
                  <div className={styles.circle}>A</div>
                  <span className={styles.name}>Aleksandra Janusz</span>
                </div>
              ) : (
                <div className={styles.loginWrapper}>
                  <button
                    className={styles.login}
                    onClick={() => openPopUp("signin")}
                  >
                    Zaloguj się
                  </button>
                </div>
              )}
            </div>
            <div className={styles.menuM}>
              <ul className={styles.list}>
                {isAuthenticated ? (
                  <>
                    <li className={styles.item}>
                      <Link to="/orders" className={styles.link}>
                        Profile
                      </Link>
                    </li>
                    <li className={styles.item}>
                      <Link to="/settings" className={styles.link}>
                        Settings
                      </Link>
                    </li>
                  </>
                ) : null}

                <li className={styles.item}>
                  <Link to="/tracks" className={styles.link}>
                    Tracks
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to="/about" className={styles.link}>
                    About us
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to="/contact" className={styles.link}>
                    Contact
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li className={styles.item}>
                    <button
                      className={cx(styles.link, styles.buttonItem)}
                      onClick={logout}
                    >
                      Wyloguj
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className={styles.menu}>
          <ul className={styles.menuItems}>
            <li className={styles.item}>
              <Link to="/tracks" className={styles.link}>
                Tracks
              </Link>
            </li>
            {user ? (
              <li className={styles.item}>
                <Link to="/upload" className={styles.link}>
                  Upload
                </Link>
              </li>
            ) : null}

            <li className={styles.item}>
              <Link to="/about" className={styles.link}>
                About us
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
          <div className={styles.cart}>
            <Link to="/cart" className={styles.link}>
              <GiShoppingBag className={styles.icon} />
              {shoppingListLength ? (
                <div className={styles.badge}>{shoppingListLength}</div>
              ) : null}
            </Link>
            {isPopup ? <Popup /> : null}
          </div>
          <div className={styles.search}>
            <BiSearch className={styles.icon} />
          </div>
          <div className={styles.account}>
            {user ? (
              <UserAccount />
            ) : (
              <span className={styles.item} onClick={() => openPopUp("signin")}>
                Log In
              </span>
            )}
          </div>
        </div>
      </nav>
      <div className={styles.padding}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default observer(Home);
