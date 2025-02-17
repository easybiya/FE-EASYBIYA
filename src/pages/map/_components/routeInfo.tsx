'use client';

import { Info, Result, SubPath } from '@/types/odsay';
import { getCoordinates } from '@/utils/getCoordinates';
import { searchPubTransPathAJAX } from '@/utils/searchPath';
import { useEffect, useState } from 'react';

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

export default function RouteInfo({
  fixedSpot,
  spotAddress,
}: {
  fixedSpot: Item;
  spotAddress: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState<Info | null>(null);
  const [subInfo, setSubInfo] = useState<SubPath[] | null>(null);
  useEffect(() => {
    const getRoute = async () => {
      const fixedCoorder = await getCoordinates(fixedSpot.address);
      const spotCoorder = await getCoordinates(spotAddress);
      const reuslt: Result = await searchPubTransPathAJAX({
        sx: String(spotCoorder.x),
        sy: String(spotCoorder.y),
        ex: String(fixedCoorder.x),
        ey: String(fixedCoorder.y),
      });
      const info = reuslt.path[0].info;
      setRouteInfo(info);
      setSubInfo(reuslt.path[0].subPath);
      console.log(reuslt.path[0].subPath);
    };
    getRoute();
  }, [fixedSpot.address, spotAddress]);

  return (
    <>
      <div
        className="flex h-20 justify-between items-center p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{fixedSpot.name}</p>
        소요시간: {routeInfo?.totalTime}분
      </div>
      {isOpen && (
        <div className="h-[400px] pl-4">
          {subInfo?.map((info, index) => {
            if (info.sectionTime > 0) {
              return (
                <div
                  key={index}
                  className="flex gap-3"
                  style={{
                    height: `${(info.sectionTime / (routeInfo?.totalTime ?? 1)) * 100}%`,
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
