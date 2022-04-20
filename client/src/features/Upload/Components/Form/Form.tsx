import React from "react";
import styles from "./Form.module.scss";

const Form = () => {
  return (
    <form action="">
      <div className={styles.row}>
        <div className={styles.fileUploader}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.name}>
              TITLE*
            </label>
            <input id="title" type="text" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.name}>
              TAGS*
            </label>
            <div className={styles.fieldRow}>
              <input id="title" type="text" className={styles.input} />
              <button> Add Tag +</button>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.name}>
              PRICE*
            </label>
            <input id="title" type="text" className={styles.input} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.imageUpload}></div>
          <div className={styles.trackType}></div>
        </div>
      </div>
      <div className={styles.row}>
        <button>Publish</button>
      </div>
    </form>
  );
};

export default Form;
