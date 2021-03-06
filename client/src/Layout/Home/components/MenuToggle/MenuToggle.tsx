import * as React from "react";
import { motion } from "framer-motion";
import styles from "./styles/MenuToggle.module.scss";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={props.color}
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({
  toggle,
  color,
}: {
  toggle: any;
  color: string;
}) => (
  <button onClick={toggle} className={styles.container}>
    <svg width="auto" height="auto" viewBox="0 0 23 23" fill="#FF0000">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        color={color}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        color={color}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        color={color}
      />
    </svg>
  </button>
);
