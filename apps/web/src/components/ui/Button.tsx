import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-brand-700 text-white hover:bg-brand-800 focus:ring-brand-500 shadow-sm': variant === 'primary',
          'bg-surface-tertiary text-text-primary hover:bg-gray-200 focus:ring-gray-300': variant === 'secondary',
          'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary': variant === 'ghost',
          'bg-danger text-white hover:bg-red-600 focus:ring-red-400': variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
