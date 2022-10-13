import { useState } from 'react';

import { AlertColor } from '@mui/material/Alert';

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const onShow = (severity: AlertColor, message: string) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const onClose = (_, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return {
    open,
    message,
    severity,
    onShow,
    onClose
  };
}
