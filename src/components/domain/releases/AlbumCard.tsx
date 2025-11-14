// src/components/domain/releases/AlbumCard.tsx
import BaseCard, { type BaseCardProps } from '@/components/base/BaseCard'
import type { Album } from '@prisma/client'
import Link from 'next/link'

/**
 * 앨범 카드 - BaseCard를 상속받아 구조화
 */
interface AlbumCardProps extends Omit<BaseCardProps, 'children'> {
  album: Album
  href?: string
  showTracks?: boolean
}

export default function AlbumCard({
  album,
  href = `/releases/${album.id}`,
  showTracks = false,
  ...baseProps
}: AlbumCardProps) {
  return (
    <Link href={href}>
      <BaseCard hoverable {...baseProps}>
        {/* 커버 이미지 */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          {album.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.coverUrl}
              alt={album.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* 메타 정보 */}
        <div className="mt-3 space-y-1">
          <h3 className="line-clamp-2 font-semibold text-gray-900">
            {album.title}
          </h3>
          <p className="text-xs text-gray-500">
            {album.type} · {new Date(album.releaseDate).toLocaleDateString()}
          </p>
          {showTracks && album.trackCount && (
            <p className="text-xs text-gray-500">
              Tracks: {album.trackCount}
            </p>
          )}
        </div>
      </BaseCard>
    </Link>
  )
}