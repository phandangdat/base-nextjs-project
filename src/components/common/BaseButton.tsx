import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

interface BaseButtonProps extends ButtonProps {
  loading?: boolean;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { loading, disabled, children, sx, variant = 'contained', ...rest } = props;

  return (
    <Button {...rest} sx={{ position: 'relative', ...sx }} ref={ref} variant={variant} disabled={disabled || loading}>
      {loading && <CircularProgress size={20} thickness={5} />}
      {children}
    </Button>
  );
});

BaseButton.displayName = 'BaseButton';
