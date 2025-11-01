import { Institution, MapProperty } from '@/types';
import { Result } from '@/types/odsay';
import { searchPubTransPathAJAX } from '@/utils/searchPath';
import { useQuery } from '@tanstack/react-query';
import CloseIcon from '@/public/icons/close.svg?react';
import ArrowDownIcon from '@/public/icons/arrow-down.svg?react';
import { ReactNode } from 'react';
import SubwayIcon from '@/public/icons/subway-icon.svg?react';
import BusIcon from '@/public/icons/bus-icon.svg?react';
import WalkIcon from '@/public/icons/walk-icon.svg?react';
import TrainIcon from '@/public/icons/subway-icon.svg?react';
import { getTransitColor } from '@/utils/odsayColor';

type Traffic = {
  name: string;
  color: string;
  icon: ReactNode;
};

const trafficType: Record<number, Traffic> = {
  1: {
    name: '지하철',
    color: '',
    icon: <SubwayIcon width={20} height={20} className="fill-current" />,
  },
  2: { name: '버스', color: '', icon: <BusIcon width={20} height={20} className="fill-current" /> },
  3: {
    name: '도보',
    color: '',
    icon: <WalkIcon width={20} height={20} className="fill-current" />,
  },
  4: {
    name: '열차',
    color: '',
    icon: <TrainIcon width={20} height={20} className="fill-current" />,
  },
};

const STABLE_TIME_DAY = 1000 * 60 * 60 * 24;

interface Props {
  institution: Institution;
  currentAddress: MapProperty;
  isClose: () => void;
}

export default function DetailRouteModal({ institution, currentAddress, isClose }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [institution.institutionAddress, currentAddress],
    queryFn: async () => {
      const result: Result = await searchPubTransPathAJAX({
        sx: String(currentAddress.propertyLongitude),
        sy: String(currentAddress.propertyLatitude),
        ex: String(institution.institutionLongitude),
        ey: String(institution.institutionLatitude),
      });
      return result.path[0];
    },
    staleTime: STABLE_TIME_DAY,
  });

  if (isLoading)
    return <div className="flex h-80 justify-between items-center p-16 bg-gray-200 rounded-lg" />;

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
          <p>{data?.info.totalTime}분</p>
          <p className="text-gray-500">소요</p>
        </div>
        <div className="flex w-full gap-4">
          {data?.subPath?.map((info, index) => {
            if (info.sectionTime > 0) {
              return (
                <div
                  key={index}
                  className={`relative h-16 flex items-center justify-center ${
                    trafficType[info.trafficType].color
                  } ${index === 0 && 'rounded-l-full'} ${
                    index === data.subPath.length - 1 && 'rounded-r-full'
                  }`}
                  style={{
                    backgroundColor: getTransitColor(
                      info.trafficType,
                      info.lane?.[0]?.subwayCode ?? 0,
                      info.lane?.[0]?.type ?? 0,
                    ),
                    color: getTransitColor(
                      info.trafficType,
                      info.lane?.[0]?.subwayCode ?? 0,
                      info.lane?.[0]?.type ?? 0,
                    ),
                    width: `${(info.sectionTime / (data.info.totalTime ?? 1)) * 100}%`,
                  }}
                >
                  <div className="text-11 font-semibold absolute left-0 -bottom-26 h-23 text-black text-nowrap">
                    {info.sectionTime}분
                  </div>
                  <div className="absolute -top-22 w-20 h-20 left-0">
                    {trafficType[info.trafficType].icon}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col gap-10">
          {data?.subPath?.map((info, index) => {
            if (info.sectionTime > 0) {
              return (
                <div className="flex justify-between" key={index}>
                  <div className="flex gap-4 items-center text-14 font-semibold leading-tight">
                    <span
                      className={`w-8 h-8 rounded-full`}
                      style={{
                        backgroundColor: getTransitColor(
                          info.trafficType,
                          info.lane?.[0]?.subwayCode ?? 0,
                          info.lane?.[0]?.type ?? 0,
                        ),
                      }}
                    />
                    {info.trafficType === 1 || info.trafficType === 2 ? (
                      <div className="flex gap-4">
                        {info.trafficType === 2 && <p>버스</p>}
                        <p>{info.lane?.[0]?.busNo || info.lane?.[0]?.name || ''}</p>
                      </div>
                    ) : (
                      <p>{trafficType[info.trafficType].name}</p>
                    )}
                    <p>{info.sectionTime}분</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col gap-6 leading-normal items-center">
          <div className="flex flex-col items-center gap-2 px-16 py-12 border rounded-lg w-full bg-gray-100">
            <p className="text-15 font-bold">{currentAddress.propertyName}</p>
            <p className="text-14">{currentAddress.propertyAddress}</p>
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
