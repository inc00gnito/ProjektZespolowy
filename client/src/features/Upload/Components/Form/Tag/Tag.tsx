import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./Tag.module.scss";
interface IProps {
  item: {
    value: string;
  };
  remove: () => void;
}
const Tag: React.FC<IProps> = ({ item, remove }) => {
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={styles.tag}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={remove}
    >
      {isHover ? (
        <div className={styles.delete}>
          <FaTrash className={styles.icon} />
          <span className={styles.text}>Delete</span>
        </div>
      ) : (
        <span className={styles.text}>#{item.value}</span>
      )}
    </div>
  );
};

export default Tag;
