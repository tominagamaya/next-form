import React from "react";
import styles from "./index.module.css"

type Props = {
  labelName: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "middle" | "small";
}

export const Button = ({labelName, onClick, disabled = false, variant = "middle"}: Props) => {
  return (
    <div className={styles.container}>
      <button
        type="submit"
        className={`${styles.btn} ${variant === "small"  ? styles.small : ""}`}
        disabled={disabled}
        onClick={onClick}
      >
        {labelName}
      </button>
    </div>
  )
}