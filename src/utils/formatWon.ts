export const formatWon = (price: number): string => {
  if (price < 10_000) {
    return `${price}원`; // 1만 미만은 그냥 숫자
  }

  const million = Math.floor(price / 100_000_000); // 억 단위
  const man = Math.floor((price % 100_000_000) / 10_000); // 나머지 만원 단위

  if (million > 0 && man > 0) {
    return `${million}억 ${man}만`;
  } else if (million > 0) {
    return `${million}억`;
  } else {
    return `${man}`;
  }
};
