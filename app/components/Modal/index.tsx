import React from "react";
import styles from "./index.module.css"

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  onClick: () => void;
}

export const Modal = ({setIsModalOpen, text, onClick}: Props) => {

  const submit = () => {
    onClick();
    setIsModalOpen(false);
  }
  
  return (
    <>
      <div className={styles.overlayContent}>
        <div className={styles.modalContent}>
          <p>{text}</p>
          <button onClick={submit}>OK</button>
        </div>
      </div>
    </>
  )
}