import { memo, useEffect } from 'react';
import { Toaster, useToasterStore, toast } from 'react-hot-toast';
import { MAX_TOAST_COUNT } from '../../constants';

export const ToastController = memo(() => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_COUNT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  return (
    <Toaster
      toastOptions={{
        duration: 7000,
        style: {
          borderRadius: '10px',
          background: 'var(--grey-950)',
          color: '#fff',
        },
      }}
    />
  );
});
