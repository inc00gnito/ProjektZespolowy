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
    <section className={styles.container}>
      <button className={styles.button} onClick={closePopUp}>
        <AiOutlineClose className={styles.icon} />
      </button>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Authentication;
