export function stripEmoji(text: string): string {
  // 이모지 제거용 정규식
  return text
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)+/g, '')
    .trim();
}
