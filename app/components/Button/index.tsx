import React from "react";
import styles from "./index.module.css"

type Props = {
  labelName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({labelName, onClick, disabled = false}: Props) => {
  return (
    <div className={styles.container}>
      <button
        type="submit"
        className={styles.btn}
        disabled={disabled}
        onClick={onClick}
      >
        {labelName}
      </button>
    </div>
  )
}