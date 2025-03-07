import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
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
  className = '',
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center rounded-md font-medium transition text-s-15';
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

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} 
        ${fullWidth ? 'w-full' : 'w-auto'} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {icon && <span className="ml-2 stroke-gray-700">{icon}</span>}
      {label}
    </button>
  );
}
