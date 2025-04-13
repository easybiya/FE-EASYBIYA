export const formatWon = (price: number) => {
  if (price < 10000) return `${price}`; // 1만 원 미만은 그대로 표시
  return `${(price / 10000).toLocaleString()}`; // 만원 단위 변환
};
