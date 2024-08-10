import { Icon } from '@iconify/react';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 ">
      <div className="bg-white p-6 rounded-lg border border-gray-400 ">
        <button onClick={onClose} className="float-right">
        <Icon icon="mdi:times" style={{ fontSize: "24px" }} />
        </button>
        {children}
      </div>
    </div>, document.body
  );
};

export default Modal;