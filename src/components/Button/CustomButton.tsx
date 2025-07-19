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
    small: 'h-40 px-16 text-sm',
    medium: 'h-48 px-16 text-base',
    large: 'h-56 px-32 text-lg',
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
      {icon && iconPosition === 'left' && <span className="mr-8 stroke-gray-700">{icon}</span>}
      {label}
      {icon && iconPosition === 'right' && <span className="ml-8 stroke-gray-700">{icon}</span>}
    </button>
  );
}
