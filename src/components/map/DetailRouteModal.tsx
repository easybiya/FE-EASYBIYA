import { Institution, MapProperty } from '@/types';
import CloseIcon from '@/public/icons/close.svg?react';
import ArrowDownIcon from '@/public/icons/arrow-down.svg?react';
import { ReactNode } from 'react';
import SubwayIcon from '@/public/icons/subway-icon.svg?react';
import BusIcon from '@/public/icons/bus-icon.svg?react';
import WalkIcon from '@/public/icons/walk-icon.svg?react';
import TrainIcon from '@/public/icons/subway-icon.svg?react';
import { getTransitColor } from '@/utils/transferColor';
import usePath from '@/hooks/institution/usePath';
import { cn } from '@/lib/utils';
import { TmapLeg, TmapMode } from '@/types/tmap';

type Traffic = {
  name: string;
  icon: ReactNode;
};

const trafficMode: Record<TmapMode, Traffic> = {
  SUBWAY: { name: '지하철', icon: <SubwayIcon width={20} height={20} className="fill-current" /> },
  BUS: { name: '버스', icon: <BusIcon width={20} height={20} className="fill-current" /> },
  WALK: { name: '도보', icon: <WalkIcon width={20} height={20} className="fill-current" /> },
  TRAIN: { name: '열차', icon: <TrainIcon width={20} height={20} className="fill-current" /> },
  EXPRESSBUS: { name: '버스', icon: <BusIcon width={20} height={20} className="fill-current" /> },
  AIRPLANE: {
    name: '비행기',
    icon: undefined,
  },
  FERRY: {
    name: '페리',
    icon: undefined,
  },
};

const getRouteLabel = (leg: TmapLeg): string => {
  if (!leg.route) return '';
  const parts = leg.route.split(':');
  return parts.length > 1 ? parts[1] : leg.route;
};

interface Props {
  institution: Institution;
  currentAddress: MapProperty;
  isClose: () => void;
}

export default function DetailRouteModal({ institution, currentAddress, isClose }: Props) {
  const { data, isLoading } = usePath(currentAddress, institution);

  if (isLoading)
    return <div className="flex h-80 justify-between items-center p-16 bg-gray-200 rounded-lg" />;

  const visibleLegs = data?.legs.filter((leg) => leg.sectionTime > 0) ?? [];
  const totalTime = Math.round((data?.totalTime ?? 0) / 60);

  return (
    <div className="absolute inset-0 z-50 bg-white">
      <div className="px-12 py-8 flex items-center justify-center relative">
        <div className="flex h-30 justify-center items-center">
          <p className="text-center text-lg font-bold">대중교통 보기</p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-12 size-24 z-50 flex items-center justify-center">
          <CloseIcon
            width={10}
            height={10}
            onClick={isClose}
            className="cursor-pointer stroke-black"
          />
        </div>
      </div>
      <div className="px-24 py-8 flex flex-col gap-32">
        <div className="flex justify-center gap-4 items-center py-8 w-full font-bold text-24">
          <p>{totalTime}분</p>
          <p className="text-gray-500">소요</p>
        </div>
        <div className="flex w-full">
          {visibleLegs.map((leg, index) => {
            const color = getTransitColor(leg.mode, leg.routeColor);
            return (
              <div
                key={index}
                className={cn(
                  'relative h-16 flex items-center justify-center mr-2',
                  index === 0 && 'rounded-l-full',
                  index === visibleLegs.length - 1 && 'rounded-r-full mr-0',
                )}
                style={{
                  backgroundColor: color,
                  color,
                  width: `${(leg.sectionTime / (data?.totalTime ?? 1)) * 100}%`,
                }}
              >
                <div className="font-semibold absolute left-1/2 -translate-x-1/2 -bottom-26 h-23 text-nowrap text-[11px] text-black">
                  {Math.round(leg.sectionTime / 60)}분
                </div>
                <div className="absolute -top-22 w-20 h-20 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  {trafficMode[leg.mode]?.icon}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-10">
          {visibleLegs.map((leg, index) => {
            const color = getTransitColor(leg.mode, leg.routeColor);
            return (
              <div className="flex justify-between" key={index}>
                <div className="flex gap-4 items-center text-14 font-semibold leading-tight">
                  <span className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
                  {leg.mode === 'SUBWAY' || leg.mode === 'BUS' || leg.mode === 'EXPRESSBUS' ? (
                    <div className="flex gap-4">
                      {(leg.mode === 'BUS' || leg.mode === 'EXPRESSBUS') && <p>버스</p>}
                      <p>{getRouteLabel(leg)}</p>
                    </div>
                  ) : (
                    <p>{trafficMode[leg.mode]?.name}</p>
                  )}
                  <p>{Math.round(leg.sectionTime / 60)}분</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-6 leading-normal items-center">
          <div className="flex flex-col items-center gap-2 px-16 py-12 border rounded-lg w-full bg-gray-100">
            <p className="text-15 font-bold">{currentAddress.name}</p>
            <p className="text-14">{currentAddress.address}</p>
          </div>
          <ArrowDownIcon width={16} height={16} />
          <div className="flex flex-col items-center gap-2 px-16 py-12 border rounded-lg w-full bg-gray-100">
            <p className="text-15 font-bold">{institution.institutionName}</p>
            <p className="text-14">{institution.institutionAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
