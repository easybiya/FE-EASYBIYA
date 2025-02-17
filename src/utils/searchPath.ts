interface Props {
  sx: string;
  sy: string;
  ex: string;
  ey: string;
}

export async function searchPubTransPathAJAX({ sx, sy, ex, ey }: Props) {
  const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${sx}&SY=${sy}&EX=${ex}&EY=${ey}&apiKey=${process.env.NEXT_PUBLIC_ODSAY_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { result } = await response.json();
    return result;
  } catch (error) {
    return console.error('API 요청 실패:', error);
  }
}
