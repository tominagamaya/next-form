import React from "react";
import styles from "./index.module.css"

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Next app</h1>
    </div>
  )
}