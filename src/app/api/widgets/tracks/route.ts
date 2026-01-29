import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // MiniPlayer용 트랙 데이터 로드 (YouTube ID가 있는 트랙만)
    const tracks = await prisma.track.findMany({
      where: {
        OR: [{ mvUrl: { not: null } }, { audioUrl: { not: null } }],
      },
      select: {
        id: true,
        title: true,
        mvUrl: true,
        audioUrl: true,
        album: {
          select: {
            title: true,
            themeColor: true,
          },
        },
      },
      orderBy: {
        releaseDate: "desc",
      },
      take: 20, // 최신 20곡만
    });

    // YouTube ID 추출 함수
    const extractYouTubeId = (
      url: string | null | undefined,
    ): string | null => {
      if (!url) return null;
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    };

    // MiniPlayer 형식으로 변환
    const playlist = tracks
      .map((track) => {
        const youtubeId = extractYouTubeId(track.mvUrl || track.audioUrl);
        if (!youtubeId) return null;

        return {
          id: youtubeId,
          trackId: track.id,
          title: track.title,
          album: track.album?.title || "Unknown",
          themeColor: track.album?.themeColor,
        };
      })
      .filter(Boolean); // null 제거

    return NextResponse.json(playlist);
  } catch (error) {
    console.error("Failed to fetch tracks for MiniPlayer:", error);
    return NextResponse.json([], { status: 500 });
  }
}
