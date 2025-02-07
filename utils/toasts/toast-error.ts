import { toast } from 'react-toastify';

export const toastError = (message: string): void => {
  toast(message, { type: 'error', position: 'top-right' });
};
