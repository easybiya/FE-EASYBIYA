import { TmapMode } from '@/types/tmap';

const BUS_TYPE_COLORS: Record<number, string> = {
  1: '#59BE0A',
  2: '#F59B22',
  3: '#59BE0A',
  4: '#F59B22',
  5: '#FFB400',
  6: '#4BA3F7',
  10: '#9CA455',
  11: '#1E7BDB',
  12: '#59BE0A',
  13: '#F2CB00',
  14: '#E43506',
  15: '#E43506',
  16: '#94896A',
  20: '#59BE0A',
  22: '#2D4F8B',
  26: '#E43506',
  30: '#0087CE',
};

const DEFAULT_COLOR = '#94896A';

export const getTransitColor = (mode: TmapMode, routeColor?: string, busType?: number): string => {
  if (routeColor) return `#${routeColor}`;
  if (mode === 'WALK') return '#9099A5';
  if ((mode === 'BUS' || mode === 'EXPRESSBUS') && busType != null) {
    return BUS_TYPE_COLORS[busType] ?? DEFAULT_COLOR;
  }
  return DEFAULT_COLOR;
};
