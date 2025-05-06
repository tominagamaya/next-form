import React from "react";
import styles from "./index.module.css"
import { Button } from "../Button";

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
          <p className={styles.text}>{text}</p>
          <Button labelName={"OK"} variant="small" onClick={submit} />
        </div>
      </div>
    </>
  )
}