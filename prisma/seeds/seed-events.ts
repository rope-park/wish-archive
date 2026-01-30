// prisma/seeds/seed-events.ts
import {
  PrismaClient,
  ContentType,
  Platform,
  ExternalLinkType,
  Era,
  Program,
  EventSeries,
  Album,
  Member,
  Track,
  GalleryCategory
} from "@prisma/client";

// 월별 이벤트 데이터 import
// 2023년
import { events202305 } from "./05-events-2023/05-events-2023-05";
import { events202306 } from "./05-events-2023/05-events-2023-06";
import { events202307 } from "./05-events-2023/05-events-2023-07";
import { events202308 } from "./05-events-2023/05-events-2023-08";
import { events202309 } from "./05-events-2023/05-events-2023-09";
import { events202310 } from "./05-events-2023/05-events-2023-10";
import { events202311 } from "./05-events-2023/05-events-2023-11";
import { events202312 } from "./05-events-2023/05-events-2023-12";

// 2024년
import { events202401 } from "./05-events-2024/05-events-2024-01";
import { events202402 } from "./05-events-2024/05-events-2024-02";
import { events202403 } from "./05-events-2024/05-events-2024-03";
import { events202404 } from "./05-events-2024/05-events-2024-04";
import { events202405 } from "./05-events-2024/05-events-2024-05";
import { events202406 } from "./05-events-2024/05-events-2024-06";
import { events202407 } from "./05-events-2024/05-events-2024-07";
import { events202408 } from "./05-events-2024/05-events-2024-08";
import { events202409 } from "./05-events-2024/05-events-2024-09";
import { events202410 } from "./05-events-2024/05-events-2024-10";
import { events202411 } from "./05-events-2024/05-events-2024-11";
import { events202412 } from "./05-events-2024/05-events-2024-12";

// 2025년
import { events202501 } from "./05-events-2025/05-events-2025-01";
import { events202502 } from "./05-events-2025/05-events-2025-02";
import { events202503 } from "./05-events-2025/05-events-2025-03";
import { events202504 } from "./05-events-2025/05-events-2025-04";
import { events202505 } from "./05-events-2025/05-events-2025-05";
import { events202506 } from "./05-events-2025/05-events-2025-06";
import { events202507 } from "./05-events-2025/05-events-2025-07";
import { events202508 } from "./05-events-2025/05-events-2025-08";
import { events202509 } from "./05-events-2025/05-events-2025-09";
import { events202510 } from "./05-events-2025/05-events-2025-10";
import { events202511 } from "./05-events-2025/05-events-2025-11";
import { events202512 } from "./05-events-2025/05-events-2025-12";

// 2026년
import { events202601 } from "./05-events-2026/05-events-2026-01";

import {
  findEraIdByDate,
  findProgramIdByTitle,
  findSeriesIdByName,
  findAlbumIdByTitle,
  findMemberByName,
  findTrackIdByTitle,
} from "./events-mapper";
import { EventInput } from "../../src/types/event";

export async function seedEvents(prisma: PrismaClient) {
  // 1. Context Loading
  const eras = await prisma.era.findMany();
  const programs = await prisma.program.findMany();
  const programMap = new Map(programs.map((p) => [p.name, p.id]));
  const seriesList = await prisma.eventSeries.findMany();
  const albums = await prisma.album.findMany();
  const members = await prisma.member.findMany();
  const tracks = await prisma.track.findMany();
  programs.forEach((p) => programMap.set(p.name, p.id));

  // ==========================================
  // 2. 데이터 병합
  // ==========================================
  const allEventsData = [
    ...events202305,
    ...events202306,
    ...events202307,
    ...events202308,
    ...events202309,
    ...events202310,
    ...events202311,
    ...events202312,
    ...events202401,
    ...events202402,
    ...events202403,
    ...events202404,
    ...events202405,
    ...events202406,
    ...events202407,
    ...events202408,
    ...events202409,
    ...events202410,
    ...events202411,
    ...events202412,
    ...events202501,
    ...events202502,
    ...events202503,
    ...events202504,
    ...events202505,
    ...events202506,
    ...events202507,
    ...events202508,
    ...events202509,
    ...events202510,
    ...events202511,
    ...events202512,
    ...events202601,
  ];

  // Sort by date
  allEventsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log(`Processing ${allEventsData.length} events...`);

  // 3. Process Events
  for (const event of allEventsData) {
    await processEvent(
      event,
      prisma,
      eras,
      programs,
      programMap,
      seriesList,
      albums,
      members,
      tracks
    );
  }
}

// ==========================================
// 개별 이벤트 처리 함수
// ==========================================
async function processEvent(
  eventData: EventInput,
  prisma: PrismaClient,
  eras: Era[],
  programs: Program[],
  programMap: Map<string, string>,
  seriesList: EventSeries[],
  albums: Album[],
  members: Member[],
  tracks: Track[],
) {
  const eventDate = new Date(eventData.date);
  const uniqueKey = `${eventData.date}_${eventData.title.replace(/[\/\s]/g, "_")}`;

  const eraId = findEraIdByDate(eventDate, eras);

  let programId: string | undefined = undefined;
  const targetProgramName =
    eventData.appearance?.programName ||
    (eventData.type === "ONLINE_CONTENT" ? eventData.seriesName : undefined);

  if (targetProgramName) {
    programId = programMap.get(targetProgramName);

    if (!programId && eventData.type === "ONLINE_CONTENT") {
      try {
        const newProgram = await prisma.program.create({
          data: {
            name: targetProgramName,
            displayName: targetProgramName,
            pType: "WEB_CONTENT",
            network: "YouTube",
            country: "KR",
          },
        });
        programId = newProgram.id;
        programMap.set(targetProgramName, newProgram.id);
      } catch {
        const existing = await prisma.program.findFirst({
          where: { name: targetProgramName },
        });
        if (existing) {
          programId = existing.id;
          programMap.set(targetProgramName, existing.id);
        }
      }
    }

    if (!programId && eventData.appearance?.programName) {
      const target = programs.find(
        (p) => p.name === eventData.appearance?.programName,
      );
      programId = target?.id;
    }
  }

  if (!programId) {
    programId = findProgramIdByTitle(eventData.title, programs);
  }

  const seriesId = findSeriesIdByName(eventData.seriesName, seriesList);
  const albumId = findAlbumIdByTitle(eventData.albumTitle, albums);
  const preDebutEra = eras.find((e) => e.name === "Pre-Debut");
  const isPreDebut = eraId === preDebutEra?.id;

  const memberRelations: Array<{
    memberId: string;
    isAbsent: boolean;
    role?: string;
    note?: string | null;
  }> = [];

  if (eventData.participants) {
    const { memberNames, type, note, role } = eventData.participants;

    if (type === "ABSENT") {
      for (const m of members) {
        const isTarget = memberNames.includes(m.stageName);
        memberRelations.push({
          memberId: m.id,
          isAbsent: isTarget,
          note: isTarget ? note : null,
        });
      }
    } else if (type === "ONLY") {
      for (const name of memberNames) {
        const member = findMemberByName(name, members);
        if (member) {
          memberRelations.push({
            memberId: member.id,
            isAbsent: false,
            role: role,
            note: note,
          });
        }
      }
    }
  } else {
    members.forEach((m) => {
      memberRelations.push({ memberId: m.id, isAbsent: false });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let appearanceCreates: any[] = [];

  if (eventData.appearance && programId) {
    const { performedTrack, isPerformance, episode, role } =
      eventData.appearance;

    const trackTitles = Array.isArray(performedTrack)
      ? performedTrack
      : performedTrack
        ? [performedTrack]
        : [undefined];

    appearanceCreates = trackTitles.map((title) => {
      const tId = title ? findTrackIdByTitle(title, tracks) : undefined;
      return {
        programId: programId,
        date: eventDate,
        isPerformance: isPerformance || false,
        episode: episode,
        role: role,
        trackId: tId,
      };
    });
  }

  const contentCreates =
    eventData.linkedContents?.map((content) => {
      let contentMemberIds: string[] = [];

      if (content.cast && content.cast.length > 0) {
        content.cast.forEach((name) => {
          const targetMember = findMemberByName(name, members);
          if (targetMember) {
            contentMemberIds.push(targetMember.id);
          }
        });
      } else {
        contentMemberIds = memberRelations
          .filter((mr) => !mr.isAbsent)
          .map((mr) => mr.memberId);
      }

      return {
        title: content.title,
        url: content.url,
        platform: content.platform as Platform,
        cType: content.type as ContentType,
        publishedAt: eventDate,
        program: programId ? { connect: { id: programId } } : undefined,
        members: {
          create: contentMemberIds.map((mid) => ({
            member: { connect: { id: mid } },
          })),
        },
      };
    }) || [];

  const externalLinkCreates =
    eventData.externalLinks?.map((link, index) => ({
      url: link.url,
      type: link.type || ExternalLinkType.OTHER,
      description: link.label,
      title: link.label || "Link",
      isOfficial: true,
      order: index,
    })) || [];

  await prisma.event.upsert({
    where: { id: uniqueKey },
    update: {
      type: eventData.type,
      date: eventDate,
      time: eventData.time,
      startDate: eventData.startDate
        ? new Date(eventData.startDate)
        : undefined,
      endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      country: eventData.country,
      city: eventData.city,
      relatedUrl: eventData.relatedUrl,
      ticketUrl: eventData.ticketUrl,
      galleryFolderPath: eventData.galleryFolderPath,
      isPreDebut,
      eraId,
      programId,
      seriesId,
      albums: {
        deleteMany: {},
        create: albumId ? [{ album: { connect: { id: albumId } } }] : [],
      },
      members: {
        deleteMany: {},
        create: memberRelations.map((mr) => ({
          member: { connect: { id: mr.memberId } },
          isAbsent: mr.isAbsent,
          role: mr.role,
          note: mr.note,
        })),
      },
      appearances: { deleteMany: {}, create: appearanceCreates },
      contents: { deleteMany: {}, create: contentCreates },
      externalLinks: { deleteMany: {}, create: externalLinkCreates },
      galleryPosts: {
        deleteMany: {},
        create: eventData.galleryPosts?.map((post) => ({
          originalUrl: post.url,
          imageUrl: post.url,
          platform: post.platform,
          category: (post.type as GalleryCategory) || GalleryCategory.OFFICIAL,
          caption: post.caption,
        })) || []
      },
    },
    create: {
      id: uniqueKey,
      type: eventData.type,
      date: eventDate,
      time: eventData.time,
      startDate: eventData.startDate
        ? new Date(eventData.startDate)
        : undefined,
      endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      country: eventData.country,
      city: eventData.city,
      relatedUrl: eventData.relatedUrl,
      ticketUrl: eventData.ticketUrl,
      galleryFolderPath: eventData.galleryFolderPath,
      isPreDebut,
      era: eraId ? { connect: { id: eraId } } : undefined,
      program: programId ? { connect: { id: programId } } : undefined,
      series: seriesId ? { connect: { id: seriesId } } : undefined,
      albums: {
        create: albumId ? [{ album: { connect: { id: albumId } } }] : [],
      },
      members: {
        create: memberRelations.map((mr) => ({
          member: { connect: { id: mr.memberId } },
          isAbsent: mr.isAbsent,
          role: mr.role,
          note: mr.note,
        })),
      },
      appearances: { create: appearanceCreates },
      contents: { create: contentCreates },
      externalLinks: { create: externalLinkCreates },
      galleryPosts: {
        create: eventData.galleryPosts?.map((post) => ({
          originalUrl: post.url,
          imageUrl: post.url,
          platform: post.platform,
          category: (post.type as GalleryCategory) || GalleryCategory.OFFICIAL,
          caption: post.caption,
        })) || []
      },
    },
  });

  if (eventData.musicShowResult && programId) {
    const trophyTrackId =
      appearanceCreates.length > 0 ? appearanceCreates[0].trackId : undefined;

    const trophyData = {
      score: eventData.musicShowResult.score,
      note: eventData.musicShowResult.note,
      isTripleCrown: eventData.musicShowResult.isTripleCrown || false,
      trackId: trophyTrackId,
      programId: programId,
      date: eventDate,
    };

    await prisma.musicShowTrophy.upsert({
      where: { eventId: uniqueKey },
      update: trophyData,
      create: {
        ...trophyData,
        eventId: uniqueKey,
      },
    });
  }
}
