import React from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./styles/Contact.module.scss";

const Contact = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <h1 className={styles.header}>NEED A HAND?</h1>
        <h1 className={styles.formHeader}>Contact</h1>
        <div className={styles.formCointaner}>
          <p className={styles.contact}>Contact us</p>
          <form>
            <div  className={styles.firstLine}>
              <div  className={styles.line} style={{marginRight:"20px"}}>
                <label className={styles.label}>YOUR NAME</label>
                <br />
                <input id="html" name="fav_language" className={styles.input}/>
              </div>
              <div className={styles.line}>
                <label className={styles.label}>USERNAME</label>
                <br />
                <input id="css" name="fav_language" className={styles.input} />
              </div>
            </div>
            <label className={styles.label}>E-MAIL ADDRESS *</label>
                <br />
                <input id="html" name="fav_language" className={styles.input}/><br />
                <label className={styles.label}>MESSAGE</label>
                <br />
                <input id="html" name="fav_language"className={styles.input} />
                <br />
                <input type="submit" value="Send message" className={styles.button}></input>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Contact;
