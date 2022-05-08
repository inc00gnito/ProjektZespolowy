import React from "react";
import styles from "./styles/Authentication.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthenticationStore } from "app/provider/Provider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}
const Authentication: React.FC<IProps> = ({ children }) => {
  const { closePopUp } = useAuthenticationStore();
  return (
    <section
      className={styles.container}
      onClick={closePopUp}
      role="dialog"
      aria-labelledby="authDialog"
      aria-describedby="signinorsignup"
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.button} onClick={closePopUp}>
          <AiOutlineClose className={styles.icon} />
        </button>
        <div className={styles.children}>{children}</div>
      </div>
    </section>
  );
};

export default Authentication;
