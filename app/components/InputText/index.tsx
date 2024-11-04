import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./index.module.css"

type Props = {
  placeholder: string;
  errorMessage?: string;
}

type ChildProps = ComponentPropsWithoutRef<'input'> & Props;


export const InputText = forwardRef<HTMLInputElement, ChildProps>(function InputTextBase({ placeholder, errorMessage, ...props }, ref) {
  return (
    <div className={styles.inputContents}>
      <label className={styles.inputLabel}>
        <input
          type={"text"}
          {...props}
          className={styles.inputText}
          placeholder={placeholder}
          ref={ref}
        />
      </label>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  )
});