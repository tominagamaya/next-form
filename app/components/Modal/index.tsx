import React from "react";
import styles from "./index.module.css"

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string
}

export const Modal: React.FC<Props> = ({setIsModalOpen, text}) => {
  return (
    <>
      <div className={styles.overlayContent}>
        <div className={styles.modalContent}>
          <p>{text}</p>
          <button onClick={() => setIsModalOpen(false)}>OK</button>
        </div>
      </div>
    </>
  )
}