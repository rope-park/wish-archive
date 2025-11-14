import type { Event, Era, EventOnAlbum, MemberOnEvent } from '@prisma/client';
import { ymdUTC } from '@/lib/date';
import Link from 'next/link';

// Prisma include 결과 형태를 위한 타입
export type EventWithJoins = Event & {
  era: Era | null;
  albums: (EventOnAlbum & {
    album: { id: string; title: string; coverUrl: string | null };
  })[];
  members: (MemberOnEvent & {
    member: { id: string; stageName: string; emoji: string | null };
  })[];
}

export default function EventCard({ event }: { event: EventWithJoins }) {
  const cover = event.albums[0]?.album.coverUrl
  const albumTitle = event.albums[0]?.album.title

  return (
    <article className="rounded-xl border bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-gray-500">
            {ymdUTC(event.date)} · {event.type}
          </div>
          <h3 className="mt-0.5 line-clamp-2 text-lg font-semibold text-gray-900">
            {event.title}
          </h3>
          {event.era ? (
            <div className="mt-1 text-xs">
              Era:{' '}
              <span
                className="rounded bg-gray-100 px-2 py-0.5"
                title={event.era.description ?? undefined}
              >
                {event.era.name}
              </span>
            </div>
          ) : null}
        </div>

        {/* 우측 썸네일: 첫 연결 앨범 커버 */}
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={albumTitle ?? 'cover'}
            className="h-16 w-16 shrink-0 rounded-md object-cover ring-1 ring-black/5"
          />
        ) : null}
      </div>

      {event.description ? (
        <p className="mt-2 line-clamp-3 text-sm text-gray-700">
          {event.description}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {event.location ? <span>📍 {event.location}</span> : null}
        {event.programName ? <span>📺 {event.programName}</span> : null}
        {event.seriesName ? <span>🎫 {event.seriesName}</span> : null}
        {event.url ? (
          <Link
            href={event.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            공식 링크
          </Link>
        ) : null}
      </div>

      {event.members.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1 text-xs">
          {event.members.map((m) => (
            <span
              key={`${event.id}-${m.member.id}`}
              className="rounded border bg-gray-50 px-2 py-0.5 text-gray-700"
              title={m.role ?? undefined}
            >
              {m.member.emoji ?? '👤'} {m.member.stageName}
            </span>
          ))}
        </div>
      ) : null}

      {event.albums.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Albums:</span>
          {event.albums.map(({ album }) => (
            <Link
              key={album.id}
              href={`/releases?id=${album.id}`}
              className="truncate rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-200"
              title={album.title}
            >
              {album.title}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  )
}
