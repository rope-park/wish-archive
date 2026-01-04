/**
 * LRC Parser Utility
 * LRC 포맷: [mm:ss.xx] 가사 텍스트
 */

export interface LyricLine {
  time: number; // 초 단위
  text: string;
}

export function parseLRC(lrcContent: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const lrcLines = lrcContent.split('\n');

  for (const line of lrcLines) {
    // [mm:ss.xx] 형식 매칭
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const centiseconds = parseInt(match[3], 10);
      const text = match[4].trim();

      const time = minutes * 60 + seconds + centiseconds / 100;
      lines.push({ time, text });
    }
  }

  // 시간순 정렬
  return lines.sort((a, b) => a.time - b.time);
}

export function getCurrentLyricIndex(lines: LyricLine[], currentTime: number): number {
  if (lines.length === 0) return -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (currentTime >= lines[i].time) {
      return i;
    }
  }

  return -1;
}

export function searchLyrics(lines: LyricLine[], query: string): number[] {
  const normalizedQuery = query.toLowerCase();
  const indices: number[] = [];

  lines.forEach((line, index) => {
    if (line.text.toLowerCase().includes(normalizedQuery)) {
      indices.push(index);
    }
  });

  return indices;
}
