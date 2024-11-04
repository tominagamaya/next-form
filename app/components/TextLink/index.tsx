import React from "react";
import styles from "./index.module.css"

type Props = {
  name: string;
  onClick: () => void;
}

export const TextLink = ({name, onClick}: Props) => {
  return (
    <div className={`${styles.btn} ${styles.container}`}>
      <a onClick={onClick}>
        {name}
      </a>
    </div>
  )
}