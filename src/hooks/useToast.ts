// src/hooks/useToast.ts
import { useState } from 'react';

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const useToast = () => {
  const [toastState, setToastState] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info'
  });

  const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToastState({
      open: true,
      message,
      severity
    });
  };

  const hideToast = () => {
    setToastState(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    showToast,
    hideToast,
    toastState
  };
};

export default useToast;