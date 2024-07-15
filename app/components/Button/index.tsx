import React from "react";
import styles from "./index.module.css"

type Props = {
  labelName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({labelName, onClick, disabled = false}) => {
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