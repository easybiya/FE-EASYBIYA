import { ICONS } from '@/constants/asset';
import Image from 'next/image';

export interface IconComponentProps {
  name: keyof typeof ICONS;
  alt?: string;
  width?: number;
  height?: number;
  isBtn?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function IconComponent({
  name,
  alt = '',
  width,
  height,
  isBtn = false,
  className = '',
  onClick,
}: IconComponentProps) {
  const iconSrc = ICONS[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found in ICONS`);
    return null;
  }

  if (typeof iconSrc === 'string') {
    return (
      <div
        className={`flex items-center justify-center ${
          isBtn ? 'cursor-pointer' : 'cursor-default'
        } ${className}`}
      >
        <Image
          src={iconSrc as string}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          className="object-cover"
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        />
      </div>
    );
  }

  return null;
}
