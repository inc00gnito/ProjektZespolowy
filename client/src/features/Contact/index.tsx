import React from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./styles/Contact.module.scss";
import { useForm } from "react-hook-form";

const Contact = () => {



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);



  return (
    <HomeLayout>
      <div className={styles.container}>
        <h1 className={styles.header}>NEED A HAND?</h1>
        <h1 className={styles.formHeader}>Contact</h1>
        <div className={styles.formCointaner}>
          <p className={styles.contact}>Contact us</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div  className={styles.firstLine}>
              <div  className={styles.line} style={{marginRight:"20px"}}>
                <label className={styles.label}>YOUR NAME</label>
                <br />
                <input id="html" {...(errors.email ? {style:{borderColor:"red"}} : {})}  className={styles.input} {...register('name',{ pattern: /^[a-zA-Z]+$/ })} />
                {errors.name && <p style={{"color":"red",marginBottom:5}}>name is invalid.</p>}
              </div>
              <div className={styles.line}>
                <label className={styles.label } >USERNAME</label>
                <br />
                <input id="css" {...(errors.email ? {style:{borderColor:"red"}} : {})} className={styles.input}  {...register('username' ,{ pattern: /^[a-zA-Z]+$/ })} />
                {errors.username && <p style={{"color":"red",marginBottom:5}}>userName is invalid.</p>}
              </div>
            </div>
            <label className={styles.label}>E-MAIL ADDRESS *</label>
                <br />
                <input id="html" {...(errors.email ? {style:{borderColor:"red"}} : {})} className={styles.input} {...register('email', { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}/>
                {errors.email && <p style={{"color":"red",marginBottom:5}}>Email is invalid.</p>}<br />
                
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
