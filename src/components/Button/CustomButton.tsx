import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
}: ButtonProps) {
  const sizeStyles = {
    small: 'h-10 px-4 text-sm',
    medium: 'h-12 px-6 text-base',
    large: 'h-14 px-8 text-lg',
  };

  const variantStyles = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
    secondary: 'border border-gray-900 bg-white text-black hover:bg-gray-100',
    ghost: 'text-black',
  };

  const buttonClass = cn(
    'flex items-center justify-center rounded-md font-medium transition text-s-15',
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && 'w-full',
    !fullWidth && 'w-auto',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClass}>
      {icon && iconPosition === 'left' && <span className="mr-2 stroke-gray-700">{icon}</span>}
      {label}
      {icon && iconPosition === 'right' && <span className="ml-2 stroke-gray-700">{icon}</span>}
    </button>
  );
}
