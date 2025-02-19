import { toast } from 'react-toastify';

export const toastSuccess = (message: string): void => {
  toast(message, { type: 'success', position: 'top-right' });
};
