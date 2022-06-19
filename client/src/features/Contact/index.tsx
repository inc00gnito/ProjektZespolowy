import React, { useState } from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./styles/Contact.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";
import { IContactMessage } from "app/model/Contact";
import { useContactStore } from "app/provider/Provider";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";

const schema = yup.object({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
  message: yup.string().required("This field is required"),
});

const Contact = () => {
  const { sendMessage, isSubmitting } = useContactStore();
  const [messageStatus, setMessageStatus] = useState<
    "initial" | "success" | "problem"
  >("initial");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IContactMessage) => {
    sendMessage(data).then(() => {
      setMessageStatus("success");
      setTimeout(() => {
        setMessageStatus("initial");
      }, 5000);
      reset();
    });
  };

  return (
    <HomeLayout>
      <div className={styles.container}>
        <h1 className={styles.header}>NEED A HAND?</h1>
        <h1 className={styles.formHeader}>Contact</h1>
        <div className={styles.formCointaner}>
          <p className={styles.contact}>Contact us</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.firstLine}>
              <div className={styles.line} style={{ marginRight: "20px" }}>
                <label className={styles.label} htmlFor="firstName">
                  FIRST NAME*
                </label>
                <br />
                <input
                  id="firstName"
                  className={cx(styles.input, {
                    [styles.inputError]: errors.firstName,
                  })}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className={styles.errorMessage}>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className={styles.line}>
                <label className={styles.label} htmlFor="lastName">
                  LAST NAME*
                </label>
                <br />
                <input
                  id="lastName"
                  className={cx(styles.input, {
                    [styles.inputError]: errors.lastName,
                  })}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className={styles.errorMessage}>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <label className={styles.label}>E-MAIL ADDRESS*</label>
            <br />
            <input
              id="email"
              className={cx(styles.input, {
                [styles.inputError]: errors.email,
              })}
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
            <br />
            <label className={styles.label} htmlFor="message">
              MESSAGE*
            </label>
            <textarea
              id="message"
              rows={3}
              className={cx(styles.textarea, {
                [styles.inputError]: errors.message,
              })}
              {...register("message")}
            />
            {errors.message && (
              <p className={styles.errorMessage}>{errors.message.message}</p>
            )}
            <button type="submit" className={styles.button}>
              {isSubmitting ? (
                <CircularProgress size={14} sx={{ color: "#800760" }} />
              ) : (
                "Send message"
              )}
            </button>
            {messageStatus === "success" ? (
              <p className={styles.successMessage}>Message has been sent</p>
            ) : null}
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default observer(Contact);
