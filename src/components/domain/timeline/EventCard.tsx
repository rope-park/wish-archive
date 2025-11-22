import type { Event, Era, EventOnAlbum, MemberOnEvent, EventSeries } from '@prisma/client';
import { ymdUTC } from '@/lib/date';
import Link from 'next/link';

// Prisma include 결과 형태를 위한 타입
export type EventWithJoins = Event & {
  era: Era | null;
  series: EventSeries | null;
  albums: (EventOnAlbum & {
    album: { id: string; title: string; coverUrl: string | null };
  })[];
  members: (MemberOnEvent & {
    member: { id: string; stageName: string; emoji: string | null };
  })[];
}

// 이벤트 타입별 아이콘 매핑
const EVENT_TYPE_ICONS: Record<string, string> = {
  RELEASE: '💿',
  MUSIC_SHOW: '🎤',
  CONCERT: '🎸',
  FAN_EVENT: '💚',
  BROADCAST: '📺',
  ANNOUNCEMENT: '📢',
};

// 이벤트 타입별 색상 매핑
const EVENT_TYPE_COLORS: Record<string, string> = {
  RELEASE: 'bg-wish-green',
  MUSIC_SHOW: 'bg-wish-pink',
  CONCERT: 'bg-wish-purple',
  FAN_EVENT: 'bg-wish-sky',
  BROADCAST: 'bg-wish-lemon',
  ANNOUNCEMENT: 'bg-gray-200',
};

export default function EventCard({ event }: { event: EventWithJoins }) {
  const cover = event.albums[0]?.album.coverUrl
  const albumTitle = event.albums[0]?.album.title
  const typeIcon = EVENT_TYPE_ICONS[event.type] || '✨';
  const typeColor = EVENT_TYPE_COLORS[event.type] || 'bg-gray-100';

  return (
    <article className="era-card hover-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* 날짜 & 타입 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-press-start-2p text-[10px] text-gray-600">
              {ymdUTC(event.date)}
            </span>
            <span className={`${typeColor} text-black px-2 py-0.5 rounded-full text-xs font-bold border border-black shadow-hard`}>
              {typeIcon} {event.type.replace(/_/g, ' ')}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="font-bagel-fat-one text-lg text-text-dark line-clamp-2 mb-2">
            {event.title}
          </h3>

          {/* Era 배지 */}
          {event.era ? (
            <div className="mb-2">
              <span
                className="inline-block bg-wish-purple/80 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-hard"
                title={event.era.description ?? undefined}
              >
                ✨ {event.era.name}
              </span>
            </div>
          ) : null}
        </div>

        {/* 우측 썸네일 */}
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={albumTitle ?? 'cover'}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover border-4 border-black shadow-hard"
          />
        ) : null}
      </div>

      {/* 설명 */}
      {event.description ? (
        <p className="mt-3 line-clamp-3 text-sm text-gray-700 font-jua">
          {event.description}
        </p>
      ) : null}

      {/* 메타 정보 */}
      <div className="mt-3 flex flex-wrap gap-2 text-sm font-jua">
        {event.location ? <span className="text-gray-600">📍 {event.location}</span> : null}
        {event.programName ? <span className="text-gray-600">📺 {event.programName}</span> : null}
        {event.series ? <span className="text-gray-600">🎫 {event.series.name}</span> : null}
        {event.url ? (
          <Link
            href={event.url}
            className="text-wish-sky hover:underline font-bold"
            target="_blank"
            rel="noreferrer"
          >
            🔗 공식 링크
          </Link>
        ) : null}
      </div>

      {/* 참여 멤버 */}
      {event.members.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {event.members.map((m) => (
            <span
              key={`${event.id}-${m.member.id}`}
              className="bg-wish-green/80 text-black px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-hard"
              title={m.role ?? undefined}
            >
              {m.member.emoji ?? '👤'} {m.member.stageName}
            </span>
          ))}
        </div>
      ) : null}

      {/* 관련 앨범 */}
      {event.albums.length > 0 ? (
        <div className="mt-3 pt-3 border-t-2 border-dashed border-gray-300">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-press-start-2p text-[10px] text-gray-500">💿 ALBUMS:</span>
            {event.albums.map(({ album }) => (
              <Link
                key={album.id}
                href={`/releases?id=${album.id}`}
                className="truncate bg-wish-pink/80 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                title={album.title}
              >
                {album.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  )
}
