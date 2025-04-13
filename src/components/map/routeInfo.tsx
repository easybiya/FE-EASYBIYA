import { Institution } from '@/types';
import { Result } from '@/types/odsay';
import { getCoordinates } from '@/utils/getCoordinates';
import { searchPubTransPathAJAX } from '@/utils/searchPath';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface Item {
  id: number;
  name: string;
  address: string;
}

const trafficType: Record<number, string> = {
  1: '지하철',
  2: '버스',
  3: '도보',
};

const STABLE_TIME_DAY = 1000 * 60 * 60 * 24;

export default function RouteInfo({
  fixedSpot,
  spotAddress,
}: {
  fixedSpot: Institution;
  spotAddress: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [fixedSpot.institutionAddress, spotAddress],
    queryFn: async () => {
      const fixedCoorder = await getCoordinates(fixedSpot.institutionAddress);
      const spotCoorder = await getCoordinates(spotAddress);
      const result: Result = await searchPubTransPathAJAX({
        sx: String(spotCoorder.x),
        sy: String(spotCoorder.y),
        ex: String(fixedCoorder.x),
        ey: String(fixedCoorder.y),
      });
      return result.path[0];
    },
    staleTime: STABLE_TIME_DAY,
  });

  if (isLoading)
    return (
      <div className="flex h-20 justify-between items-center p-4 bg-gray-200 rounded-lg"></div>
    );

  return (
    <>
      <div
        className="flex h-20 justify-between items-center p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{fixedSpot.institutionName}</p>
        소요시간: {data?.info.totalTime}분
      </div>
      {isOpen && (
        <div className="h-[400px] pl-4">
          {data?.subPath?.map((info, index) => {
            if (info.sectionTime > 0) {
              return (
                <div
                  key={index}
                  className="flex gap-3"
                  style={{
                    height: `${(info.sectionTime / (data.info.totalTime ?? 1)) * 100}%`,
                  }}
                >
                  <div
                    className={`relative w-3 ${
                      info.trafficType === 3 ? 'bg-gray-200' : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex flex-col justify-center">
                    <p>{trafficType[info.trafficType]}</p>
                    <p>{info.lane?.[0]?.busNo || info.lane?.[0]?.name || ''}</p>
                    <p>{info.sectionTime}분</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
