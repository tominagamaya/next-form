import React from "react";
import { useFormContext } from "react-hook-form";
import { inputForm } from "../page";
import styles from "./index.module.css"

export const Name: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<inputForm>()
  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputContents}>
          <label className={styles.inputLabel}>
            <input
                type="text"
                id="lastName"
                className={styles.inputText}
                placeholder="苗字"
                {...register("lastName", { required: "苗字を入力してください" })}
              />
          </label>
          <p className={styles.errorMessage}>{errors.lastName && errors.lastName.message}</p>
        </div>
        <div className={styles.inputContents}>
          <label className={styles.inputLabel}>
            <input
                type="text"
                id="firstName"
                className={styles.inputText}
                placeholder="名前"
                {...register("firstName", { required: "名前を入力してください" })}
              />
          </label>
          <p className={styles.errorMessage}>{errors.firstName && errors.firstName.message}</p>
        </div>
      </div>
    </>
  )
}