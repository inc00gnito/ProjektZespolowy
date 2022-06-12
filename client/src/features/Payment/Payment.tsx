import React, { useEffect, useState } from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./Payment.module.scss";
import * as yup from "yup";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BiCalendar } from "react-icons/bi";
import cx from "classnames";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Form from "./components/Form/Form";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [paymentVerification, setPaymentVerification] = useState<
    "accept" | "decline" | null
  >(null);

  const onSubmit = (data: any) => {
    setLoading(true);
  };

  useEffect(() => {
    let timeout: any;
    if (isLoading) {
      timeout = setTimeout(() => {
        setLoading(false);
        setPaymentVerification("accept");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    let timeout: any;

    if (paymentVerification) {
      timeout = setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [paymentVerification]);

  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.leftEmptySpace} />
        <div className={styles.content}>
          <h1 className={styles.title}>PAY BY CARD</h1>
          {paymentVerification === "accept" ? (
            <PaymentSuccess />
          ) : paymentVerification === "decline" ? null : (
            <Form onSubmit={onSubmit} isLoading={isLoading} />
          )}
        </div>
        <div className={styles.rightEmptySpace} />
      </div>
    </HomeLayout>
  );
};

export default Payment;
