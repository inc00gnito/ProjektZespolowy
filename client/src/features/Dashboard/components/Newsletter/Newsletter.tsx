import { motion } from "framer-motion";
import React, { useState } from "react";
import styles from "./Newsletter.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNewsletterStore } from "app/provider/Provider";

const schema = yup.object({
  email: yup.string().required("Enter your email").email("Email is invalid"),
});

interface IForm {
  email: string;
}

const Newsletter = () => {
  const { subscribeNewsletter } = useNewsletterStore();
  const [emailSent, setEmailSent] = useState(false);
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const transition = {
    duration: 2,
    ease: "easeInOut",
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: IForm) => {
    subscribeNewsletter(values.email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 6000);
      })
      .catch((error: Error) => {
        setError("email", { type: "custom", message: error.message });
      });
  };
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.text}
          initial="initial"
          whileInView="animate"
          variants={variants}
          transition={transition}
          viewport={{ once: true }}
        >
          <h1 className={styles.title}>NEWSLETTER</h1>
          <p className={styles.paragraph}>Sign up to recive updates on new</p>
          <p className={styles.paragraph}>products and special offers</p>
        </motion.div>
        <motion.form
          className={styles.form}
          initial="initial"
          whileInView="animate"
          variants={variants}
          transition={transition}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className={styles.fieldName}>Email*</p>
          <div className={styles.field}>
            <input
              type="text"
              className={styles.input}
              {...register("email")}
            />

            <button className={styles.button}>Submit</button>
          </div>
          {errors.email ? (
            <p className={styles.error}>{errors.email.message}</p>
          ) : null}
          {emailSent ? (
            <p className={styles.emailSent}>You have signed to newsletter</p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
