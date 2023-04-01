import React, { useRef, useEffect } from 'react';
import style from "./Modal.module.css"

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal} ref={modalRef}>
        <div className={style.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
