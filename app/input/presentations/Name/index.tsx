import React from "react";
import { useFormContext } from "react-hook-form";
import { inputForm } from "../../page";
import styles from "./index.module.css"
import { InputText } from "@/app/components/InputText";

export const Name = () => {
  const { register, formState: { errors } } = useFormContext<inputForm>()
  return (
    <>
      <div className={styles.inputContainer}>
        <InputText
          placeholder={"苗字"}
          errorMessage={errors.lastName && errors.lastName.message}
          {...register("lastName", { required: "苗字は必須です" })}
        />
        <InputText
          placeholder={"名前"}
          errorMessage={errors.firstName && errors.firstName.message}
          {...register("firstName", { required: "名前は必須です" })}
        />
      </div>
    </>
  )
}