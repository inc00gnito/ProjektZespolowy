import React from "react";
import styles from "./AccountForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryInput from "components/Input/Input";
import Button from "components/Button/Button";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  username: yup.string().required("username is required"),
});

const AccountForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>General </span>
      </div>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <PrimaryInput
              label="E-MAIL ADDRESS"
              inputProps={register("email")}
              error={errors?.email?.message}
            />
          </div>
          <div className={styles.field}>
            <PrimaryInput
              label="USERNAME"
              inputProps={register("username")}
              error={errors?.username?.message}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.button}>
            <Button>Update account information</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
