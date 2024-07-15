import React from "react";
import styles from "./index.module.css"

type Props = {
  name: string;
  onClick: () => void;
}

export const TextLink: React.FC<Props> = ({name, onClick}) => {
  return (
    <div className={`${styles.btn} ${styles.container}`}>
      <a onClick={onClick}>
        {name}
      </a>
    </div>
  )
}