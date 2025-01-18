import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';
import { v4 as uuidv4 } from 'uuid';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message, duration = 3000) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, type, message, duration }]);
  
    setTimeout(() => {
      removeToast(id);
    }, duration + 300);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </ToastContext.Provider>
  );
};
