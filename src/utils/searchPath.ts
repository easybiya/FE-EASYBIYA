import { TampResponse, TmapItinerary, TmapResult } from '@/types/tmap';

interface Props {
  sx: string;
  sy: string;
  ex: string;
  ey: string;
}

export async function searchPubTransPathAJAX({ sx, sy, ex, ey }: Props): Promise<TmapItinerary | undefined> {
  try {
    const response = await fetch('https://apis.openapi.sk.com/transit/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY!,
      },
      body: JSON.stringify({
        startX: sx,
        startY: sy,
        endX: ex,
        endY: ey,
        count: 1,
        lang: 0,
        format: 'json',
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: TampResponse = await response.json();
    const itineraries = data.metaData.plan?.itineraries ?? [];
    console.log(itineraries);

    // if (!itineraries.length) throw new Error('경로를 찾을 수 없습니다.');

    return itineraries[0];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return undefined;
  }
}
