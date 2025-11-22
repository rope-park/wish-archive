/**
 * TrackTable 컴포넌트
 * 
 * 앨범 트랙 리스트 테이블
 * - 트랙 번호, 제목, 길이, MV 링크 등 표시
 */

'use client';

import type { Track } from '@prisma/client';
import Badge from '@/components/ui/Badge';

interface TrackTableProps {
  tracks: Track[];
  onTrackClick?: (track: Track) => void;
  className?: string;
}

export default function TrackTable({
  tracks,
  onTrackClick,
  className = '',
}: TrackTableProps) {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">제목</th>
            <th className="hidden px-4 py-3 sm:table-cell">길이</th>
            <th className="hidden px-4 py-3 md:table-cell">타입</th>
            <th className="px-4 py-3 text-center">MV</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tracks.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                트랙 정보가 없습니다
              </td>
            </tr>
          ) : (
            tracks.map((track) => (
              <tr
                key={track.id}
                onClick={() => onTrackClick?.(track)}
                className={[
                  'transition-colors hover:bg-gray-50',
                  onTrackClick && 'cursor-pointer',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* 트랙 번호 */}
                <td className="px-4 py-3 font-medium text-gray-900">
                  {track.trackNumber}
                </td>

                {/* 제목 & 뱃지 */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">
                      {track.title}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {track.isTitle && (
                        <Badge variant="danger" size="sm" rounded>
                          타이틀
                        </Badge>
                      )}
                      {track.isSingle && (
                        <Badge variant="warning" size="sm" rounded>
                          싱글
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>

                {/* 길이 */}
                <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                  {formatDuration(track.durationSec)}
                </td>

                {/* 언어 */}
                <td className="hidden px-4 py-3 md:table-cell">
                  <Badge variant="info" size="sm">
                    {track.language}
                  </Badge>
                </td>

                {/* MV 링크 */}
                <td className="px-4 py-3 text-center">
                  {track.hasMv && track.mvUrl ? (
                    <a
                      href={track.mvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
