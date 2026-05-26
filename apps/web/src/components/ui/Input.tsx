import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-text-primary">
            {label}
            {props.required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border bg-white text-text-primary',
              'placeholder:text-text-muted text-sm',
              'focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400',
              'transition-all duration-200',
              error
                ? 'border-danger focus:ring-red-200'
                : 'border-gray-200 hover:border-gray-300',
              isPassword && 'pr-10',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
