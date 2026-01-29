// prisma/seeds/06-programs.ts
import type { PrismaClient, ProgramType } from "@prisma/client";
import { logger, ProgressTracker } from "./utils/utils";

/**
 * 방송 프로그램 시드 (프로그램 정보)
 * - 음악방송, 라디오, 예능, 웹 콘텐츠 프로그램 데이터 삽입
 */
// TODO: 방송 프로그램 관련 경로 수정
export async function seedPrograms(prisma: PrismaClient) {
  const programs = [
    // ==================== [KR] 음악방송 ====================
    {
      name: "엠카운트다운",
      displayName: "엠카운트다운 (M COUNTDOWN)",
      aliases: ["엠카운트다운", "엠카"],
      network: "Mnet",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "목요일",
      airTime: "18:00",
      logoUrl: "/content/programs/mcountdown.png",
      officialUrl: "https://www.mnetplus.world/ko",
      notes: "매주 목요일 저녁 6시 Mnet 생방송",
    },
    {
      name: "뮤직뱅크",
      displayName: "뮤직뱅크 (Music Bank)",
      aliases: ["뮤직뱅크", "뮤뱅"],
      network: "KBS 2TV",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "금요일",
      airTime: "17:05",
      logoUrl: "/content/programs/musicbank.png",
      officialUrl:
        "https://program.kbs.co.kr/2tv/enter/musicbank/pc/index.html",
      notes: "KBS 대표 음악 프로그램",
    },
    {
      name: "쇼! 음악중심",
      displayName: "쇼! 음악중심 (Show! Music Core)",
      aliases: ["음악중심", "음중"],
      network: "MBC",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "토요일",
      airTime: "15:15",
      logoUrl: "/content/programs/musiccore.png",
      officialUrl: "https://www.imbc.com/broad/tv/ent/musiccore",
      notes: "MBC 음악 프로그램",
    },
    {
      name: "인기가요",
      displayName: "인기가요 (Inkigayo)",
      aliases: ["인기가요", "인가"],
      network: "SBS",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "일요일",
      airTime: "15:20",
      logoUrl: "/content/programs/inkigayo.png",
      officialUrl: "https://programs.sbs.co.kr/enter/gayo",
      notes: "SBS 대표 음악 프로그램",
    },
    {
      name: "더 쇼",
      displayName: "더 쇼 (The Show)",
      aliases: ["더 쇼", "더쇼"],
      network: "SBS funE",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "화요일",
      airTime: "18:00",
      logoUrl: "/content/programs/theshow.png",
      notes: "SBS funE 음악 프로그램. 2025년 11월 11일 종영.",
    },
    {
      name: "쇼챔피언",
      displayName: "쇼챔피언 (Show Champion)",
      aliases: ["쇼챔피언", "쇼챔"],
      network: "MBC M",
      country: "KR",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "수요일",
      airTime: "17:00",
      logoUrl: "/content/programs/showchampion.png",
      officialUrl:
        "https://www.mbcplus.com/web/program/contentList.do?programInfoSeq=67",
      notes: "MBC 뮤직 음악 프로그램",
    },

    // ==================== [KR] 라디오 ====================
    {
      name: "두시탈출 컬투쇼",
      displayName: "두시탈출 컬투쇼 (Cultwo Show)",
      aliases: ["두시탈출 컬투쇼", "컬투쇼"],
      network: "SBS Power FM",
      country: "KR",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "월-일",
      airTime: "14:00",
      logoUrl: "/content/programs/cultwo.png",
      officialUrl: "https://programs.sbs.co.kr/radio/cultwoshow/main",
      notes: "SBS 대표 라디오 프로그램",
    },
    {
      name: "키스 더 라디오",
      displayName: "키스 더 라디오 (Kiss The Radio)",
      aliases: ["키스 더 라디오"],
      network: "KBS Cool FM",
      country: "KR",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "월-일",
      airTime: "22:00",
      logoUrl: "/content/programs/kisstheradio.png",
      officialUrl:
        "https://program.kbs.co.kr/2fm/radio/hanhaekiss/pc/index.html",
      notes: "KBS 심야 라디오",
    },
    {
      name: "별이 빛나는 밤에",
      displayName: "별이 빛나는 밤에 (Starry Night)",
      aliases: ["별이 빛나는 밤에", "별밤"],
      network: "MBC FM4U",
      country: "KR",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "월-일",
      airTime: "22:00",
      logoUrl: "/content/programs/starrynight.png",
      officialUrl: "https://www.imbc.com/broad/radio/fm4u/starnight",
      notes: "MBC 대표 심야 라디오",
    },
    {
      name: "아이돌 라디오",
      displayName: "아이돌 라디오 (IDOL RADIO)",
      aliases: ["아이돌 라디오"],
      network: "MBC FM4U",
      country: "KR",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "토요일",
      airTime: "22:00",
      logoUrl: "/content/programs/idolradio.png",
      officialUrl: "https://www.imbc.com/broad/radio/fm4u/idolradio/index.html",
      notes: "MBC 아이돌 전문 라디오",
    },

    // ======================= [KR] 예능  ====================
    {
      name: "주간 아이돌",
      displayName: "주간 아이돌 (Weekly Idol)",
      network: "MBC M",
      country: "KR",
      pType: "VARIETY_SHOW" as ProgramType,
      logoUrl: "/content/programs/weeklyidol.png",
      officialUrl:
        "https://www.mbcplus.com/web/program/contentList.do?programInfoSeq=79",
      notes: "아이돌 필수 출연 예능",
    },
    {
      name: "NCT Universe : LASTART (KR)",
      displayName: "NCT Universe : LASTART",
      aliases: ["LASTART", "라스타트"],
      network: "ENA",
      country: "KR",
      pType: "VARIETY_SHOW" as ProgramType,
      dayOfWeek: "목요일",
      airTime: "01:30",
      logoUrl: "/content/programs/lastart.png",
      notes:
        "NCT WISH 데뷔 서바이벌 프로그램. 한국 방영분 (총 8회). (스트리밍: TVING, KOCOWA+)",
    },

    // ==================== [KR] 웹 콘텐츠 ====================
    {
      name: "아이돌 인간극장",
      displayName: "아이돌 인간극장",
      network: "YouTube",
      country: "KR",
      pType: "WEB_CONTENT" as ProgramType,
      logoUrl: "/content/programs/idolhuman.png",
      notes: "KBS Kpop 웹예능",
    },
    {
      name: "동네스타K",
      displayName: "동네스타K",
      network: "YouTube",
      country: "KR",
      pType: "WEB_CONTENT" as ProgramType,
      logoUrl: "/content/programs/kstar.png",
      notes: "조나단 진행 웹예능",
    },
    {
      name: "스튜디오 춤",
      displayName: "스튜디오 춤 (Studio CHOOM)",
      network: "YouTube",
      country: "KR",
      pType: "WEB_CONTENT" as ProgramType,
      logoUrl: "/content/programs/choom.png",
      notes: "고퀄리티 4K 퍼포먼스 채널",
    },
    {
      name: "잇츠라이브",
      displayName: "잇츠라이브 (it's Live)",
      network: "YouTube",
      country: "KR",
      pType: "WEB_CONTENT" as ProgramType,
      logoUrl: "/content/programs/itslive.png",
      notes: "밴드 라이브 퍼포먼스 채널",
    },

    // ==================== [JP] 음악방송 ====================
    {
      name: "CDTV 라이브! 라이브!",
      displayName: "CDTV ライブ! ライブ! (CDTV Live! Live!)",
      network: "TBS",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "월요일",
      airTime: "19:00",
      logoUrl: "/content/programs/cdtv.png",
      officialUrl: "https://www.tbs.co.jp/cdtv_livelive/",
      notes: "일본 TBS 간판 음악 프로그램",
    },
    {
      name: "뮤직 스테이션",
      displayName: "뮤직 스테이션 (M스테)",
      aliases: ["엠스테", "M스테", "Music Station"],
      network: "TV Asahi",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "금요일",
      airTime: "21:00",
      logoUrl: "/content/programs/mstation.png",
      officialUrl: "https://www.tv-asahi.co.jp/music/",
      notes: "일본 대표 장수 음악 프로그램",
    },
    {
      name: "Venue101",
      displayName: "Venue101 (베뉴101)",
      network: "NHK",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "토요일",
      airTime: "23:00",
      logoUrl: "/content/programs/venue101.png",
      officialUrl:
        "https://www.web.nhk/tv/an/venue101/pl/series-tep-WX1N9WR8GY",
      notes: "NHK 음악 프로그램",
    },
    {
      name: "버즈 리듬",
      displayName: "Buzz Rhythm 02 (버즈 리듬)",
      network: "NTV",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "금요일",
      airTime: "24:59",
      logoUrl: "/content/programs/buzzrhythm.png",
      officialUrl: "https://www.ntv.co.jp/buzzrhythm/",
      notes: "NTV 음악 프로그램",
    },
    {
      name: "초음파",
      displayName: "超音波＃ (초음파#)",
      network: "TV Tokyo",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "금요일",
      airTime: "",
      logoUrl: "/content/programs/chouonpa.png",
      officialUrl: "https://www.tv-tokyo.co.jp/choonpa_tokuban/",
      notes: "TV Tokyo 음악 프로그램",
    },
    {
      name: "케이팝 하우스",
      displayName: "K-POP HOUSE",
      network: "Fuji TV",
      country: "JP",
      pType: "MUSIC_SHOW" as ProgramType,
      dayOfWeek: "일요일",
      airTime: "24:58",
      logoUrl: "/content/programs/kpophouse.png",
      officialUrl: "https://www.fujitv.co.jp/b_hp/kpophouse/",
      notes: "후지TV K-POP 전문 음악 프로그램. 2024년 9월 29일 방송 종료.",
    },

    // ==================== [JP] 예능 ====================
    {
      name: "NCT Universe : LASTART (JP)",
      displayName: "NCT Universe : LASTART",
      aliases: ["LASTART", "라스타트"],
      network: "NTV",
      country: "JP",
      pType: "VARIETY_SHOW" as ProgramType,
      dayOfWeek: "목요일",
      airTime: "00:59",
      logoUrl: "/content/programs/lastart.png",
      notes:
        "NCT WISH 데뷔 서바이벌 프로그램. 일본 방영분 (특별편 포함 총 10회). (스트리밍: Hulu)",
    },
    {
      name: "메자마시 TV",
      displayName: "めざましテレビ (메자마시 TV)",
      network: "Fuji TV",
      country: "JP",
      pType: "VARIETY_SHOW" as ProgramType,
      dayOfWeek: "월-금, 토요일",
      airTime: "월~금 5:25~8:14/토 6:00~8:30",
      logoUrl: "/content/programs/mezamashi.png",
      officialUrl: "https://www.fujitv.co.jp/mezamashi/",
      notes: "후지TV 아침 정보 프로그램",
    },
    {
      name: "히루난데스!",
      displayName: "ヒルナンデス! (히루난데스!)",
      network: "NTV",
      country: "JP",
      pType: "VARIETY_SHOW" as ProgramType,
      dayOfWeek: "월-금",
      airTime: "11:55",
      logoUrl: "/content/programs/hirunandesu.png",
      officialUrl: "https://www.ntv.co.jp/hirunan/",
      notes: "NTV 낮 예능 프로그램",
    },
    {
      name: "아노짱의 전전전파",
      displayName: "あのちゃんの電電電波♪ (아노짱의 전전전파)",
      network: "TV Tokyo",
      country: "JP",
      pType: "VARIETY_SHOW" as ProgramType,
      dayOfWeek: "화요일",
      airTime: "26:00",
      logoUrl: "/content/programs/anochan.png",
      officialUrl: "https://www.tv-tokyo.co.jp/dendendenpa/",
      notes: "TV Tokyo 예능 프로그램",
    },

    // ==================== [JP] 라디오 ====================
    {
      name: "CHAT WITH WISH!",
      displayName: "CHAT WITH WISH!",
      network: "TOKYO FM",
      country: "JP",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "목요일",
      airTime: "26:00",
      logoUrl: "/content/programs/chatwithwish.png",
      officialUrl: "https://audee.jp/program/show/300009248",
      notes: "NCT WISH 최초 레귤러 라디오 (JFN 계열 33국 넷).",
    },
    {
      name: "올 더 필즈",
      displayName: "ALL The Feels",
      network: "FM NACK5",
      country: "JP",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "월-목",
      airTime: "23:00",
      logoUrl: "/content/programs/allthefeels.png",
      officialUrl: "https://www.nack5.co.jp/program/allthefeels/",
      notes: "주간 플레이리스트 프로그램",
    },
    {
      name: "스타트 라인",
      displayName: "START LINE",
      network: "J-WAVE",
      country: "JP",
      pType: "RADIO" as ProgramType,
      dayOfWeek: "금요일",
      airTime: "16:30",
      logoUrl: "/content/programs/startline.png",
      officialUrl: "https://www.j-wave.co.jp/original/startline/",
      notes: "J-WAVE 아이돌 전문 프로그램",
    },
  ];

  const createdPrograms = [];
  const progress = new ProgressTracker("Programs Seeded", programs.length);

  for (const programData of programs) {
    try {
      const program = await prisma.program.upsert({
        where: {
          name_country: {
            name: programData.name,
            country: programData.country || "KR",
          },
        },
        update: programData,
        create: programData,
      });

      createdPrograms.push(program);
      progress.increment();
    } catch (error) {
      logger.error(`Failed to upsert program: ${programData.name}`);
      console.error(error);
    }
  }

  progress.complete();
  logger.success(`Programs seeded: ${createdPrograms.length} programs.`);
  return createdPrograms;
}
