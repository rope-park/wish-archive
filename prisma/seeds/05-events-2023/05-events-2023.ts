// prisma/seeds/05-events-2023.ts
import { EventType, ContentType, Platform, ExternalLinkType } from '@prisma/client';
import type { EventInput } from '../types-event';

export const events2023: EventInput[] = [
    // ==========================================
    // MAY 2023
    // ==========================================
    {
        date: '2023-05-24',
        type: EventType.ANNOUNCEMENT,
        title: '[Announcement] SM 3.0: NEW IP 2023',
        description: 'SM 엔터테인먼트 장철혁 대표가 NCT의 마지막 팀 런칭 계획 및 일본인/한국인 멤버 공개 예고.',
        relatedUrl: 'https://youtu.be/KqWyfGHc-3M',
    },

    // ==========================================
    // JUNE 2023
    // ==========================================
    {
        date: '2023-06-28',
        type: EventType.RELEASE,
        title: '[SMROOKIES] 시온, 유우시 공개',
        description: 'SR23B 시온(SION), 유우시(YUSHI)의 프로필 및 티저 영상 공개.',
        linkedContents: [
            {
                title: 'SMROOKIES: SION 시온',
                url: 'https://youtu.be/pjdaQUlI-zc',
                type: ContentType.TEASER,
                platform: Platform.YOUTUBE,
                cast: ['시온'],
            },
            {
                title: 'SMROOKIES: YUSHI 유우시',
                url: 'https://youtu.be/ybNm9aXVVjs',
                type: ContentType.TEASER,
                platform: Platform.YOUTUBE,
                cast: ['유우시'],
            }
        ]
    },
    {
        date: '2023-06-30',
        type: EventType.ANNOUNCEMENT,
        title: '[Announcement] NCT Universe : LASTART 런칭 및 출연진 안내',
        description: 'NCT의 마지막 팀 선발 과정을 담은 서바이벌 프로그램 7월 26일 첫 방송 공지. 보아/은혁 디렉터 참여 및 데뷔 인원(4명 선발) 공개',
        relatedUrl: 'https://nct-jp.net/ko/news/detail.php?id=1109310',
        externalLinks: [
            {
                url: 'https://www.ntv.co.jp/nctuniverse-lastart/',
                type: ExternalLinkType.OFFICIAL,
                label: 'NTV 공식 사이트',
            },
            {
                url: 'https://x.com/SM_NCTUniverse',
                type: ExternalLinkType.SNS,
                label: 'NCT Universe 공식 X',
            },
            {
                url: 'https://www.instagram.com/sm_nctuniverse/',
                type: ExternalLinkType.SNS,
                label: 'NCT Universe 공식 Instagram',
            },
            {
                url: 'https://www.tiktok.com/@sm_nctuniverse',
                type: ExternalLinkType.SNS,
                label: 'NCT Universe 공식 TikTok',
            },
            {
                url: 'https://www.hulu.jp/nct-universe-lastart',
                type: ExternalLinkType.STREAMING,
                label: 'Hulu Japan 공식 사이트',
            }
        ],
        linkedContents: [
            {
                title: 'NCT Universe : LASTART 공식 클립 영상 및 무대 등 모음 재생목록',
                url: 'https://www.youtube.com/playlist?list=PLA91TLEzZINtF4_JdXdklKkTQEaX2KNXS',
                type: ContentType.VARIETY_CLIP,
                platform: Platform.YOUTUBE,
            }
        ]
    },

    // ==========================================
    // JULY 2023
    // ==========================================
    {
        date: '2023-07-19',
        type: EventType.RELEASE,
        title: '[Teaser] NCT Universe : LASTART (Main Trailer)',
        description: 'NCT Universe : LASTART 프로그램의 메인 트레일러 영상 공개.',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART',
            episode: 'Trailer',
        },
        linkedContents: [
            {
                title: '[#라스타트] NCT Universe : LASTART | MAIN TRAILER 💫 [EN/JP]',
                url: 'https://youtu.be/NX25eMLdkKY',
                type: ContentType.TEASER,
                platform: Platform.YOUTUBE,
            }
        ]
    },
    {
        date: '2023-07-27',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.1)",
        description: '연습생 10인 최초 공개 및 첫 번째 관문 <2인 무대> 미션 시작.\n스페셜 디렉터: KEY (SHINee)',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '1회',
        },
        linkedContents: [
            {
                title: "시온 & 유우시 'Afrolex' 무대 다시 보기",
                url: 'https://youtu.be/1Oi_qc5cMEc',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '유우시'],
            },
            {
                title: "하루타 & 앤더슨 'Believer' 무대 다시 보기",
                url: 'https://youtu.be/IT6Bm1fcGyY',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
            }
        ],
    },

    // AUGUST 2023
    /*
    https://www.reddit.com/r/kpop/comments/166pdo7/nct_universe_lastart_nct_tokyo_predebut_reality/
*/
    {
        date: '2023-08-03',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.2)",
        description: '2인 무대 미션 계속, 첫 번째 순위 및 베네핏 공개.\n스페셜 디렉터: KEY (SHINee)',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '2회',
        },
        linkedContents: [
            {
                title: "캇쇼 & 헤이테츠 'Shawty Fishin' 무대 다시 보기",
                url: 'https://youtu.be/CkxNdeRqORA',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
            },
            {
                title: "료 & 사쿠야 'Chewing Gum' 무대 다시 보기",
                url: 'https://youtu.be/Ou1johGLhGo',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['사쿠야', '료'],
            },
            {
                title: "리쿠 & 류 'FIRE' 무대 다시 보기",
                url: 'https://youtu.be/Qe5ok1_KQuQ',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['리쿠'],
            },
            {
                title: "정민 & 민재 '하늘을 달리다' 무대 다시 보기",
                url: 'https://youtu.be/s3j2x7g8ygA',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
            }
        ],
    },
    {
        date: '2023-08-10',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.3)",
        description: '두 번째 관문 <SM 명곡 그룹 미션> 시작.\n게스트: 려욱, 태민, 동해',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '3회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 'Lucifer' 무대 다시 보기",
                url: 'https://youtu.be/2FeFi2bXud8',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '유우시', '료', '사쿠야']
            },
        ],
    },
    {
        date: '2023-08-10',
        type: EventType.ANNOUNCEMENT,
        title: '[Announcement] NCT Universe : LASTART Pre-Debut Event 개최 확정',
        description: '프리 데뷔 이벤트 일본 개최 확정 공지. 최종 선발 멤버들의 프리 데뷔 쇼케이스 진행 예정.',
        relatedUrl: 'https://nct-jp.net/ko/news/detail.php?id=1110102',
    },
    {
        date: '2023-08-17',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.4)",
        description: '두 번째 미션 순위 발표식 & NEW 연습생 대영(재희) 합류.\n스페셜 디렉터: 려욱, 효연',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '4회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 'U' 무대 다시 보기",
                url: 'https://youtu.be/gRcS_sFiEGA',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '유우시', '사쿠야']
            },
        ],
    },
    {
        date: '2023-08-24',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.5)",
        description: '세 번째 관문 <SM 명곡 그룹 미션 일본어 Ver>.\n게스트: 효연, 최강창민, 시우민',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '5회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 'Electric Kiss' 무대 다시 보기",
                url: 'https://youtu.be/b9_jGVuBNB8',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '유우시', '료', '사쿠야']
            },
        ],
    },
    {
        date: '2023-08-31',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.6)",
        description: '세 번째 순위 발표식 & 최종 관문 <NCT 미션> 시작.\n게스트: 효연, 강타, 이특, 쟈니, 해찬, 텐',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '6회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 'Why?' 무대 다시 보기",
                url: 'https://youtu.be/GK0qmS5H7gI',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '유우시', '재희']
            },
        ],
    },

    // SEPTEMBER 2023
    /*
***

### **🏆 최종 데뷔 멤버 (6명)**

| 순위 | 이름 | 국가 | 특이사항 |
|------|------|------|---------|
| **1위** | 리쿠(陸生) | 🇯🇵 | 메인댄서, 최종 1위 |
| **확정** | 시온(シオン) | 🇰🇷 | 리더, 리드보컬 (사전 확정) |
| **확정** | 유우시(ユウシ) | 🇯🇵 | 메인댄서 (사전 확정) |
| **2위** | 사쿠야(桜也) | 🇯🇵 | 보컬 |
| **3위** | 료(遼) | 🇯🇵 | 보컬 |
| **(추가)** | 대영(大英) | 🇰🇷 | **Ep.4 추가 합류, 메인보컬** |

✅ **최종 멤버 6명 확정**: 시온, 유우시, 리쿠(1위), 사쿠야, 료, 대영  
✅ **프리 데뷔 투어**: 10월 8일~12월 20일 (9개 도시, 24회)  
***
*/
    {
        date: '2023-09-07',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.7)",
        description: '최종 관문 무대 공개 및 데뷔 멤버 확정.\n게스트: 강타, 이특, 쟈니, 해찬, 태용',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '7회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 '90's Love' 무대 다시 보기",
                url: 'https://youtu.be/OhKD0W3WsTc',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '유우시', '재희', '료', '사쿠야']
            },
        ],
    },
    {
        date: '2023-09-07',
        type: EventType.ONLINE_CONTENT,
        title: '[SM C&C STUDIO] NCT NEW TEAM 프리 데뷔 멤버를 소개합니다!',
        description: 'NCT NEW TEAM(가칭) 프리 데뷔 멤버 소개 영상 공개.',
        linkedContents: [
            {
                title: '[#라스타트] NCT NEW TEAM 프리 데뷔 멤버를 소개합니다! | NCT Universe : LASTART💫',
                url: 'https://youtu.be/FjUjpPrUV3Y',
                type: ContentType.OTHER,
                platform: Platform.YOUTUBE,
            }
        ]
    },
    {
        date: '2023-09-09',
        type: EventType.CONCERT,
        title: '[Concert] NCT NATION : To The World-in JAPAN (Day 1)',
        description: 'NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.',
        location: '나가이 육상 경기장 (얀마 스타디움 나가이)',
        country: 'JP',
        city: '오사카 (Osaka)',
        linkedContents: [
            {
                title: "NCT NEW TEAM 'Hands Up' Opening act @2023 NCT CONCERT - NCT NATION : To The World",
                url: 'https://youtu.be/3SWbFIdzAX4',
                type: ContentType.BROADCAST_STAGE,
                platform: Platform.YOUTUBE,
            },
        ],
    },
    {
        date: '2023-09-10',
        type: EventType.CONCERT,
        title: '[Concert] NCT NATION : To The World-in JAPAN (Day 2)',
        description: 'NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.',
        location: '나가이 육상 경기장 (얀마 스타디움 나가이)',
        country: 'JP',
        city: '오사카 (Osaka)',
    },
    {
        date: '2023-09-14',
        type: EventType.VARIETY_SHOW,
        title: "[ENA] NCT Universe : LASTART (Ep.8)",
        description: '데뷔 멤버 발표식 이후 & 단합 대회.\n(한국 방영분 최종회)',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (KR)',
            episode: '8회',
        },
        linkedContents: [
            {
                title: "SM 명곡 그룹 미션 'BOSS' 무대 다시 보기",
                url: 'https://youtu.be/xvfHSpE_zO8',
                type: ContentType.REALITY,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '유우시']
            },
        ],
    },
    {
        date: '2023-09-16',
        type: EventType.CONCERT,
        title: '[Concert] NCT NATION : To The World-in JAPAN (Day 3)',
        description: 'NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.',
        location: '아지노모토 스타디움',
        country: 'JP',
        city: '도쿄 (Tokyo)',
    },
    {
        date: '2023-09-17',
        type: EventType.CONCERT,
        title: '[Concert] NCT NATION : To The World-in JAPAN (Day 4)',
        description: 'NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.',
        location: '아지노모토 스타디움',
        country: 'JP',
        city: '도쿄 (Tokyo)',
    },
    {
        date: '2023-09-21',
        type: EventType.ONLINE_CONTENT,
        title: '[NTV] NCT Universe : LASTART (Ep.9) (일본 특별편)',
        description: '일본 NTV 단독 방영분.',
        country: 'JP',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (JP)',
            episode: '9회',
        },
    },
    {
        date: '2023-09-28',
        type: EventType.ONLINE_CONTENT,
        title: '[NTV] NCT Universe : LASTART (Ep.10) (일본 특별편)',
        description: '지상파 첫 프리데뷔 Hands Up 무대 및 비하인드. (일본 최종회)',
        country: 'JP',
        seriesName: 'NCT Universe: LASTART',
        appearance: {
            programName: 'NCT Universe : LASTART (JP)',
            episode: '10회',
        },
    },
    /* SMTOWN Friends, 제목없음 UTSM 콘텐츠 링크 추가 필요 */

    // ==========================================
    // OCTOBER 2023
    // ==========================================
    /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1103062 
## 📺 **2023년 10월 활동 관련 링크 종합**

### **📋 10월 공연 일정**

| 날짜 | 도시 | 공연장 | 회차 | 시간 | 특이사항 |
|------|-----|-------|------|------|---------|
| **10.08 (일)** | 도쿄 | LINE CUBE SHIBUYA | 1~2회 | 15:30 / 19:00 | ⭐ **프리 데뷔 투어 첫 공연** |
| **10.09 (월)** | 도쿄 | LINE CUBE SHIBUYA | 3~4회 | 13:30 / 17:00 | - |
| **10.25 (수)** | 고베(효고) | 고베 국제회관 국제홀 | 5~6회 | 18:00 | - |
| **10.26 (목)** | 고베(효고) | 고베 국제회관 국제홀 | 7~8회 | 18:00 | - |

***

### **📍 10월 공연장**

| 도시 | 공연장 | 특징 |
|------|--------|------|
| **도쿄** | LINE CUBE SHIBUYA | 약 2,700명, 시부야역 근처 |
| **고베** | 고베 국제회관 국제홀 | 중규모 컨벤션 시설 |

***
    */
    {
        date: '2023-10-02',
        type: EventType.ANNOUNCEMENT,
        title: '[Announcement] 멤버 정민 하차 및 6인 체제 확정',
        description: 'SM 엔터테인먼트 공식 발표. 건강 회복을 최우선으로 하기 위해 연습생 신분으로 돌아가 치료에 전념하기로 결정.',
        relatedUrl: 'https://nct-jp.net/ko/news/detail.php?id=1111526',
    },
    {
        date: '2023-10-04',
        type: EventType.ANNOUNCEMENT,
        title: '[Open] NCT NEW TEAM 공식 SNS 채널 개설',
        description: 'X, Instagram, YouTube 오픈',
        relatedUrl: '',
    },
    {
        /* TODO: 링크 추가 필요 */
        date: '2023-10-07',
        type: EventType.RELEASE,
        title: '[Teaser] Hands Up (Image)',
        description: "프리 데뷔 싱글 'Hands Up' 이미지 티저 공개.",
        country: 'JP',
        albumTitle: 'Hands Up',
        relatedUrl: '',
    },
    {
        date: '2023-10-08',
        type: EventType.RELEASE,
        title: '[Album] 프리 데뷔 싱글《Hands Up》',
        description: "타이틀곡 'Hands Up'과 수록곡 'We Go!' 수록.",
        country: 'JP',
        albumTitle: 'Hands Up',
        relatedUrl: '',
    },
    {
        date: '2023-10-08',
        time: '15:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 1) (1회차)',
        description: '프리 데뷔 투어 일본 공연',
        location: '라인 큐브 시부야 (Line Cube Shibuya)',
        country: 'JP',
        city: '도쿄 (Tokyo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://nct-jp.net/ko/live/tour.php?id=1002368',
    },
    {
        date: '2023-10-08',
        time: '19:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 1) (2회차)',
        description: '프리 데뷔 투어 일본 공연',
        location: '라인 큐브 시부야 (Line Cube Shibuya)',
        country: 'JP',
        city: '도쿄 (Tokyo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://nct-jp.net/ko/live/tour.php?id=1002368',
    },
    {
        date: '2023-10-09',
        time: '13:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 2) (1회차 13:30 / 2회차 17:00)',
        description: '프리 데뷔 투어 일본 공연',
        location: '라인 큐브 시부야 (Line Cube Shibuya)',
        country: 'JP',
        city: '도쿄 (Tokyo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-10-09',
        time: '17:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 2) (2회차 13:30 / 2회차 17:00)',
        description: '프리 데뷔 투어 일본 공연',
        location: '라인 큐브 시부야 (Line Cube Shibuya)',
        country: 'JP',
        city: '도쿄 (Tokyo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-10-13',
        type: EventType.ANNOUNCEMENT,
        title: '[Announcement] NCT NEW TEAM 라디오 코멘트 출연 안내',
        description: '라디오 프로그램 코멘트 출연.',
        country: 'JP',
        relatedUrl: 'https://nct-jp.net/ko/schedule/detail.php?id=1103062',
    },
    {
        date: '2023-10-13',
        time: '19:00',
        type: EventType.RADIO,
        title: "[J-WAVE] START LINE (코멘트)",
        description: "16:30~20:00 방송 중 19:00경 'MILA'S TOO MUCH K-POP INFORMATION' 코너 코멘트 출연.",
        country: 'JP',
        relatedUrl: 'https://www.j-wave.co.jp/original/startline/',
        appearance: {
            programName: '스타트 라인',
        }
    },
    {
        date: '2023-10-13',
        time: '23:00',
        type: EventType.RADIO,
        title: "[CBC Radio] 츄-모리 금요일 (チュウモリ金曜日) MIX YOUTH RADIO (코멘트)",
        description: "22:00~24:00 방송 중 23:00대 코멘트 출연.",
        country: 'JP',
        relatedUrl: 'https://hicbc.com/radio/mixyouthradio/',
    },
    {
        date: '2023-10-17',
        time: '09:00',
        type: EventType.RADIO,
        title: "[J-WAVE] STEP ONE (코멘트)",
        description: "09:00~13:00 방송 내 코멘트 출연.",
        country: 'JP',
        relatedUrl: 'https://www.j-wave.co.jp/original/stepone/',
    },
    {
        date: '2023-10-17',
        time: '23:30',
        type: EventType.RADIO,
        title: "[bayfm] ジェネZZ (GENE ZZ) (코멘트)",
        description: "23:30~23:57 방송 출연.",
        country: 'JP',
        relatedUrl: 'https://www.bayfm.co.jp/program/genez/',
    },
    {
        date: '2023-10-18',
        time: '20:00',
        type: EventType.RADIO,
        title: "[TOKYO FM] Roomie Roomie! (코멘트)",
        description: "20:00~21:00 방송 출연.",
        country: 'JP',
        relatedUrl: 'https://www.tfm.co.jp/roomie/',
    },
    {
        date: '2023-10-22',
        time: '02:00',
        type: EventType.RADIO,
        title: "[FM Yokohama] Radio HITS Radio (코멘트)",
        description: "방송표기: 10/21(토) 26:00~28:30 (심야 방송).",
        country: 'JP',
        relatedUrl: 'https://www.fmyokohama.jp/snu/',
    },
    {
        date: '2023-10-22',
        time: '11:00',
        type: EventType.RADIO,
        title: "[α-STATION] KP CONNECTION (코멘트)",
        description: "11:00~12:00 방송 출연.",
        country: 'JP',
        relatedUrl: 'https://fm-kyoto.jp/blog/kp_connection/',
    },
    {
        date: '2023-10-19',
        type: EventType.RELEASE,
        title: "[MV] Hands Up",
        description: "프리 데뷔 싱글 타이틀곡 'Hands Up' 뮤직비디오 공개.",
        country: 'JP',
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "NCT NEW TEAM 'Hands Up' MV",
                url: 'https://youtu.be/ZVcy7bQkBhA',
                type: ContentType.MV,
                platform: Platform.YOUTUBE,
            }
        ]
    },
    {
        date: '2023-10-20',
        type: EventType.ONLINE_CONTENT,
        title: '[Shorts] Hand Up 쇼츠 #NCTNEWTEAM',
        description: "Hands Up 챌린지",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "🙋‍♂️ 〰 올라 올라 〰 🙋‍♂️ #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=LSPihEbs8so",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '유우시']
            },
            {
                title: "Bet you wanna du du du du ♫ #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=D9R5eUfWWLM",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE,
            },
            {
                title: "Let’s go #NCTNEWTEAM 🤩",
                url: "https://www.youtube.com/watch?v=9vCQCEN9ZCQ",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE,
                cast: ['시온', '리쿠', '료', '사쿠야']
            },
            {
                title: "Behind the Scene 👀 #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=pDR7FDPFtRE",
                type: ContentType.SHORTS,
                platform: Platform.YOUTUBE
            },
            {
                title: "🦭 リョウ&サクヤ are ready 🥐 #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=AGfaasRlp5U",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE,
                cast: ['료', '사쿠야']
            },
            {
                title: "We fly We fly ⋆｡˚ ☁︎ ˚｡⋆｡ #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=ldPDahq4hPo",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE
            },
            {
                title: "So let me see you fly 三🚀🪽 #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=MWSOO4CfnQ8",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE
            },
            {
                title: "some cute #HandsUp crumbs ♡ #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=cmUixtmy3Mk",
                type: ContentType.BEHIND,
                platform: Platform.YOUTUBE,
                cast: ['료', '사쿠야']
            },
            {
                title: "2 BE ☝️ #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=9c0Fv4YCiM8",
                type: ContentType.CHALLENGE,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-10-23',
        type: EventType.RELEASE,
        title: "[Dance Practice] We Go! (Moving Ver.)",
        description: "NCT NEW TEAM 'We Go!' 안무 연습 영상 (Moving Ver.)",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "NCT NEW TEAM 'We Go!' Dance Practice (Moving Ver.)",
                url: "https://www.youtube.com/watch?v=4jsh9hu7Bng",
                type: ContentType.DANCE_PRACTICE,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-10-24',
        type: EventType.RELEASE,
        title: "[Dance Practice] Hands Up",
        description: "NCT NEW TEAM 'Hands Up' 안무 연습 영상",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "NCT NEW TEAM 'Hands Up' Dance Practice",
                url: "https://www.youtube.com/watch?v=ZiDnpDJ9Z_Y",
                type: ContentType.DANCE_PRACTICE,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-10-25',
        type: EventType.ONLINE_CONTENT,
        title: "[Reaction] 'Hands Up' MV Reaction",
        description: "NCT NEW TEAM 'Hands Up' 뮤직비디오 리액션",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "REACTION to ⚾️’Hands Up’💥 MVㅣNCT NEW TEAM Reaction",
                url: "https://www.youtube.com/watch?v=3Xw1PtOgeWA",
                type: ContentType.REACTION,
                platform: Platform.YOUTUBE
            }
        ],
    },
    {
        date: '2023-10-25',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 효고 (Day 1)',
        description: '프리 데뷔 투어 일본 공연',
        location: '고베 국제회관 국제홀',
        country: 'JP',
        city: '효고 (Hyogo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },

    {
        date: '2023-10-26',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 효고 (Day 2)',
        description: '프리 데뷔 투어 일본 공연',
        location: '고베 국제회관 국제홀',
        country: 'JP',
        city: '효고 (Hyogo)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-10-27',
        type: EventType.OTHER,
        title: "[Etc] 'NCT WISH' 상표권 출원",
        description: "SM 엔터테인먼트, 'NCT WISH' 상표 출원 확인",
    },
    {
        date: '2023-10-28',
        type: EventType.ANNOUNCEMENT,
        title: '[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 1)',
        description: '대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소',
        location: '마쿠하리 멧세 이벤트홀',
        country: 'JP',
        city: '치바 (Chiba)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://nct-jp.net/news/detail.php?id=1111570'
    },
    {
        date: '2023-10-29',
        type: EventType.ANNOUNCEMENT,
        title: '[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 2)',
        description: '대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소',
        location: '마쿠하리 멧세 이벤트홀',
        country: 'JP',
        city: '치바 (Chiba)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://nct-jp.net/news/detail.php?id=1111570'
    },
    {
        date: '2023-10-30',
        type: EventType.ANNOUNCEMENT,
        title: '[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 3)',
        description: '대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소',
        location: '마쿠하리 멧세 이벤트홀',
        country: 'JP',
        city: '치바 (Chiba)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://nct-jp.net/news/detail.php?id=1111570'
    },

    // ==========================================
    // NOVEMBER 2023
    // ==========================================
    /*
    ## 📺 **2023년 11월 활동 관련 링크 종합**

### **🎬 핵심 페이지**

| 콘텐츠 | URL | 설명 |
|--------|-----|------|
| **프리 데뷔 투어** | https://namu.wiki/w/NCT%20Universe%20:%20LASTART%20PRE-DEBUT%20TOUR | 11월 아이치, 오사카, 이시카와 공연 일정 |
| **NCT 일본 공식 웹사이트** | https://nct-jp.net/ko/live/tour.php?id=1002368 | 투어 정보, 티켓 예매 |
| **MTV VMAJ 2023 공식** | https://www.vmaj.jp/ | VMAJ 시상식 정보 |

***

### **📋 11월 주요 일정**

| 날짜 | 행사 | 장소 | 특이사항 |
|------|------|------|---------|
| **11.09~10** | 투어 아이치 | 나고야 국제회의장 센추리 홀 | 2회 공연 |
| **11.16~17** | 투어 오사카 | 오릭스 극장 | ⭐ **Hulu 생중계** (11/17) |
| **11.22** | **MTV VMAJ Pre-Show** | 피아 아레나 MM | ⭐⭐⭐ **오프닝 액트** |
| **11.23** | **MTV VMAJ -THE LIVE-** | K-아레나 요코하마 | ⭐⭐⭐ **오프닝 액트** |
| **11.25~26** | 투어 이시카와 | 혼다노모리 호쿠텐 홀 | 4회 공연 |

***

### **🏆 MTV VMAJ 2023 출연**

#### Pre-Show (11월 22일)
| 정보 | 내용 |
|------|------|
| **공연장** | 피아 아레나 MM, 요코하마 |
| **시간** | 개장 16:30 / 공연 18:00 |
| **역할** | **오프닝 액트** |
| **곡** | "Hands Up" (프리 데뷔 싱글) |
| **영상** | https://www.youtube.com/watch?v=vfrpZjN6U_o (3분 20초) |

#### THE LIVE (11월 23일)
| 정보 | 내용 |
|------|------|
| **공연장** | K-아레나 요코하마 |
| **시간** | 개장 12:30 / 공연 14:00 |
| **역할** | **본행사 오프닝 액트** |
| **특징** | 대규모 K-아레나 무대 |

***

### **🎬 공식 영상**

| 제목 | URL | 길이 | 설명 |
|------|-----|------|------|
| **Pre-Show 클립** | https://www.youtube.com/watch?v=vfrpZjN6U_o | 3:20 | Hands Up 무대 |
| **Pre-Show 풀버전** | https://www.youtube.com/watch?v=TV7ecCR_MuY | 7:45 | 인터뷰 포함 |
| **오사카 공연 풀버전** | https://www.youtube.com/watch?v=CqA4Gcq6SNo | 43분 | 멤버 인터뷰 포함 |

***

### **📰 관련 기사**

| 날짜 | 제목 | URL |
|------|------|-----|
| **2023.10.27** | NCT NEW TEAM 출연 공식 발표 | https://www.reddit.com/r/NCT/comments/17hgwcp/231027_nct_new_team_will_appear_as_the_opening/ |
| **2023.10.27** | NCT 공식 공지 | https://nct-jp.net/news/detail.php?id=1112126 |
| **2023.12.21** | 투어 성료 기사 | https://www.newsis.com/view/NISX20231221_0002567303 |

***

### **🎟️ 생중계 & 스트리밍**

| 채널 | 날짜 | 내용 |
|------|------|------|
| **Hulu 스토어** | 11/17 18:00 | 오사카 공연 독점 생중계 |
| **YouTube** | 상시 | MTV VMAJ 무대 영상 |

***

### **📊 11월 투어 진행 현황**

- **누적 도시**: 4개 (도쿄 → 고베 → 아이치 → 오사카 + 이시카와)
- **누적 공연**: 약 12회 (전체 24회 중 50% 달성)
- **다음**: 12월 최종 3개 도시(후쿠오카, 히로시마, 오카야마, 홋카이도) 완성

***
*/
    {
        date: '2023-11-03',
        type: EventType.ONLINE_CONTENT,
        title: "[Behind] 'Hands Up' MV Behind the Scene",
        description: "'Hands Up' 뮤직비디오 촬영 비하인드",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "初めてのMV撮影⚾️ 緊張😖 ワクワク💗 | 첫 뮤비 촬영🎥 긴장되고 설레요😝 | ‘Hands Up’ MV Behind the Scene",
                url: "https://www.youtube.com/watch?v=VYAUcccFkuM",
                type: ContentType.BEHIND,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-11-07',
        type: EventType.ONLINE_CONTENT,
        title: "[Vlog] NCT NEW TEAM in KOBE",
        description: "NCT NEW TEAM의 고베 브이로그",
        country: 'JP',
        city: '고베 (Kobe)',
        linkedContents: [
            {
                title: "神戸牛モッパン🍖 とってもおいしいです😋 | 고베규 먹방🍖 완전 맛있어요💛 | NCT NEW TEAM in KOBE",
                url: "https://www.youtube.com/watch?v=Xvgylx950lE",
                type: ContentType.VLOG,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-11-09',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 아이치 (Day 1)',
        description: '프리 데뷔 투어 일본 공연',
        location: '나고야 국제회의장 센추리 홀',
        country: 'JP',
        city: '아이치 (Aichi)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-09',
        type: EventType.ONLINE_CONTENT,
        title: '[Behind] Behind the scene in #NAGOYA 👀',
        description: "아이치 공연 비하인드",
        country: 'JP',
        city: '아이치 (Aichi)',
        linkedContents: [
            {
                title: 'Behind the scene in #NAGOYA 👀',
                url: 'https://x.com/nct_newteam/status/1722600189100486688',
                type: ContentType.BEHIND,
                platform: Platform.X_TWITTER
            },
            {
                title: 'Behind the scene in #NAGOYA 👀',
                url: 'https://www.instagram.com/reel/CzbRaH9rzlM',
                type: ContentType.BEHIND,
                platform: Platform.INSTAGRAM
            }
        ]
    },
    {
        date: '2023-11-10',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 아이치 (Day 2)',
        description: '프리 데뷔 투어 일본 공연',
        location: '나고야 국제회의장 센추리 홀',
        country: 'JP',
        city: '아이치 (Aichi)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-11',
        time: '02:55',
        type: EventType.MUSIC_SHOW,
        title: "[ytv] 카미오토 밤 (カミオト夜)",
        description: "방송표기: 11/10(금) 26:55~ (심야 방송).",
        country: 'JP',
        relatedUrl: 'https://www.ytv.co.jp/kamioto-yoru/',
        appearance: {
            programName: '카미오토 밤',
        }
    },
    {
        date: '2023-11-12',
        type: EventType.ONLINE_CONTENT,
        title: "[Content] WE GO! WE FLY! EP.1",
        description: "자체 콘텐츠 WE GO! WE FLY! 에피소드 1",
        appearance: {
            programName: 'WE GO! WE FLY!',
            episode: '1회',
        },
        linkedContents: [
            {
                title: "サッカーとゲームをして⚽️ ご飯はいつ？👀 | 축구하고 게임하고⛳ 밥은 언제 먹지?🤔 | WE GO! WE FLY! EP. 1",
                url: "https://www.youtube.com/watch?v=YeoDK2ZSuBc",
                type: ContentType.WEB_VARIETY,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-11-15',
        time: '11:55',
        type: EventType.VARIETY_SHOW,
        title: "[NTV] 히루난데스! (Hirunandesu!!)",
        description: "시온, 리쿠 생방송 게스트 출연.",
        country: 'JP',
        relatedUrl: 'https://www.ntv.co.jp/hirunan/',
        participants: {
            type: 'ONLY',
            memberNames: ['시온', '리쿠'],
            role: 'Guest'
        },
        appearance: {
            programName: '히루난데스!',
            role: 'Guest'
        }
    },
    {
        date: '2023-11-16',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오사카 (Day 1)',
        description: '프리 데뷔 투어 일본 공연',
        location: '오릭스 극장',
        country: 'JP',
        city: '오사카 (Osaka)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-09',
        type: EventType.ONLINE_CONTENT,
        title: '[Behind] Behind the scene in #OSAKA 💥',
        description: "오사카 공연 비하인드",
        country: 'JP',
        city: '오사카 (Osaka)',
        linkedContents: [
            {
                title: 'Behind the scene in #OSAKA 💥',
                url: 'https://x.com/nct_newteam/status/1725154820535841132',
                type: ContentType.BEHIND,
                platform: Platform.X_TWITTER
            },
            {
                title: 'Behind the scene in #OSAKA 💥',
                url: 'https://www.instagram.com/reel/CztbJO9rC8C',
                type: ContentType.BEHIND,
                platform: Platform.INSTAGRAM
            }
        ]
    },
    {
        date: '2023-11-17',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오사카 (Day 2)',
        description: '프리 데뷔 투어 일본 공연. Hulu 스토어 독점 생중계 진행.',
        location: '오릭스 극장',
        country: 'JP',
        city: '오사카 (Osaka)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        relatedUrl: 'https://x.com/hulu_japan/status/1722886815127089594'
    },
    {
        date: '2023-11-22',
        type: EventType.AWARD_SHOW,
        title: '[Awards] MTV VMAJ 2023 Pre-Show',
        description: "레드카펫 행사 참석 및 오프닝 무대 출연.",
        location: '피아 아레나 MM',
        country: 'JP',
        city: '요코하마 (Yokohama)',
        linkedContents: [
            {
                title: 'Hands Up @ MTV VMAJ 2023 Pre-Show',
                url: 'https://www.youtube.com/watch?v=vfrpZjN6U_o',
                type: ContentType.BROADCAST_STAGE,
                platform: Platform.YOUTUBE,
            },
            {
                title: 'NCT WISH MTV VMAJ 2023 Red Carpet',
                url: 'https://x.com/nctwishofficial/status/1727247882699596126',
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.X_TWITTER,
            }
        ],
    },
    {
        date: '2023-11-23',
        type: EventType.AWARD_SHOW,
        title: '[Awards] MTV VMAJ 2023 -THE LIVE-',
        description: '본 행사 무대 오프닝 액트(Opening Act) 공연 출연.',
        location: 'K-아레나 요코하마',
        country: 'JP',
        city: '요코하마 (Yokohama)',
        linkedContents: [
            {
                title: 'NCT WISH MTV VMAJ 2023 Red Carpet',
                url: 'https://x.com/mtv_japan/status/1727593695191744784',
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.X_TWITTER,
            }
        ],
    },
    {
        date: '2023-11-24',
        type: EventType.ONLINE_CONTENT,
        title: "[Content] WE GO! WE FLY! EP.2",
        description: "자체 콘텐츠 WE GO! WE FLY! 에피소드 2",
        appearance: {
            programName: 'WE GO! WE FLY!',
            episode: '2회',
        },
        linkedContents: [
            {
                title: "おいしい夕ご飯🍖 幸せなキャンプファイヤー🪵| 맛있는 저녁 식사🍽️ 행복한 캠프파이어🔥| WE GO! WE FLY! EP. 2",
                url: "https://www.youtube.com/watch?v=1SqkKQdUgYM",
                type: ContentType.WEB_VARIETY,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-11-25',
        time: '15:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 1) (1회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '혼다노모리 호쿠텐 홀',
        country: 'JP',
        city: '이시카와 (Ishikawa)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-25',
        time: '18:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 1) (2회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '혼다노모리 호쿠텐 홀',
        country: 'JP',
        city: '이시카와 (Ishikawa)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-26',
        time: '13:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 2) (1회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '혼다노모리 호쿠텐 홀',
        country: 'JP',
        city: '이시카와 (Ishikawa)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-26',
        time: '17:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 2) (2회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '혼다노모리 호쿠텐 홀',
        country: 'JP',
        city: '이시카와 (Ishikawa)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-11-27',
        type: EventType.ONLINE_CONTENT,
        title: "[Vlog] NCT NEW TEAM in NAGOYA",
        description: "NCT NEW TEAM의 나고야 브이로그",
        country: 'JP',
        city: '나고야 (Nagoya)',
        linkedContents: [
            {
                title: "外はサクサクヤな🥐 ひつまぶし🥢🤩 | 겉은 바삭쿠야한🥐 히츠마부시😝 | NCT NEW TEAM in NAGOYA",
                url: "https://www.youtube.com/watch?v=sMew82jFdMQ",
                type: ContentType.VLOG,
                platform: Platform.YOUTUBE
            }
        ]
    },

    // ==========================================
    // DECEMBER 2023
    // ==========================================
    /*
    ## 📺 **2023년 12월 활동 관련 링크 종합**

### **🎬 핵심 페이지**

| 콘텐츠 | URL | 설명 |
|--------|-----|------|
| **프리 데뷔 투어 공식** | https://namu.wiki/w/NCT%20Universe%20:%20LASTART%20PRE-DEBUT%20TOUR | 12월 공연 일정 및 최종 성과 |

***

### **📋 12월 공연 일정**

| 날짜 | 도시 | 공연장 | 회차 | 특이사항 |
|------|------|--------|------|---------|
| **12.03~04** | 후쿠오카 | 기타큐슈 솔레이유 홀 | 3회 | - |
| **12.07** | 히로시마 | 히로시마 문화학원 HBG 홀 | 1회 | - |
| **12.09~10** | 오카야마 | 구라시키 시민회관 | 4회 | 최다 공연 도시 |
| **12.19~20** | 홋카이도 | 카나모토 홀 | 2회 | ⭐ **FINAL** (12/20) |

***

### **📀 앨범 발매**

| 항목 | 내용 |
|------|------|
| **타이틀** | **《Hands Up》** 실물(Physical) CD |
| **발매일** | 2023년 12월 20일 (최종 공연과 동일) |
| **버전** | A/B 2종 |
| **특전** | 셀카 트레이딩 카드 (랜덤 1종/6종) |
| **공식 공지** | https://nct-jp.net/en/news/detail.php?id=1112965 |

### **🎤 프리 데뷔 투어 최종 성과**

| 구분 | 수치 |
|------|------|
| **기간** | 2023.10.08 ~ 2023.12.20 (약 2.5개월) |
| **도시** | **9개 도시** (도쿄, 고베, 아이치, 오사카, 이시카와, 후쿠오카, 히로시마, 오카야마, 홋카이도) |
| **공연 회차** | **24회** |
| **누적 관객** | 약 54,000명 |
| **최종 공연** | 2023.12.20 홋카이도 카나모토 홀 |

***

### **🎯 12월 주요 성과**

✅ **프리 데뷔 투어 완성**: 9개 도시 24회 공연 성공적 완료  
✅ **앨범 발매**: Hands Up 실물 CD 12월 20일 발매  
✅ **팬 대면**: 약 54,000명 일본 팬과의 만남 완성  
✅ **2024년 준비**: 도쿄돔 정식 데뷔를 향한 완벽한 준비 
*/
    {
        date: '2023-12-03',
        time: '15:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 1) (1회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '기타큐슈 솔레이유 홀',
        country: 'JP',
        city: '후쿠오카 (Fukuoka)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-03',
        time: '18:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 1) (2회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '기타큐슈 솔레이유 홀',
        country: 'JP',
        city: '후쿠오카 (Fukuoka)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-04',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 2)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '기타큐슈 솔레이유 홀',
        country: 'JP',
        city: '후쿠오카 (Fukuoka)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-06',
        type: EventType.ONLINE_CONTENT,
        title: "[Vlog] NCT NEW TEAM on SHINKANSEN",
        description: "NCT NEW TEAM의 신칸센 브이로그 (이시카와행)",
        country: 'JP',
        city: '이시카와 (Ishikawa)',
        linkedContents: [
            {
                title: "新幹線に乗って石川へ🚅 | 신칸센 타고 이시카와로 가요💨 | NCT NEW TEAM on SHINKANSEN",
                url: "https://www.youtube.com/watch?v=dTcsSQkFw4A",
                type: ContentType.VLOG,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-12-07',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 히로시마',
        description: '프리 데뷔 투어 일본 공연',
        location: '히로시마 문화학원 HBG 홀',
        country: 'JP',
        city: '히로시마 (Hiroshima)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-08',
        type: EventType.MAGAZINE,
        title: '[Magazine] 피아 MUSIC COMPLEX(PMC) 신문 VMAJ 2023호',
        description: 'NCT NEW TEAM 단독 인터뷰 게재 (타블로이드판 16P). Mrs. GREEN APPLE 인터뷰, VMAJ 시상식 리포트 등 수록.',
        country: 'JP',
        relatedUrl: 'https://nct-jp.net/ko/schedule/detail.php?id=1103719',
    },
    {
        date: '2023-12-09',
        time: '15:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 1) (1회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '구라시키 시민회관',
        country: 'JP',
        city: '오카야마 (Okayama)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-09',
        time: '18:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 1) (2회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '구라시키 시민회관',
        country: 'JP',
        city: '오카야마 (Okayama)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-10',
        time: '13:30',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 2) (1회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '구라시키 시민회관',
        country: 'JP',
        city: '오카야마 (Okayama)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
        {
        date: '2023-12-10',
        time: '17:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 2) (2회차)',
        description: '프리 데뷔 투어 일본 공연.',
        location: '구라시키 시민회관',
        country: 'JP',
        city: '오카야마 (Okayama)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-15',
        type: EventType.ONLINE_CONTENT,
        title: "[Behind] VCR Behind the Scenes",
        description: "NCT Universe : LASTART PRE-DEBUT TOUR VCR 촬영 비하인드",
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
        linkedContents: [
            {
                title: "少しぎこちなくても大丈夫😉 | 조금 서툴러도 괜찮아🫂 | NCT Universe : LASTART PRE-DEBUT TOUR VCR Behind the Scenes",
                url: "https://www.youtube.com/watch?v=rinBf5MRB9w",
                type: ContentType.BEHIND,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-12-19',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 홋카이도 (Day 1)',
        description: '프리 데뷔 투어 일본 공연',
        location: '카나모토 홀',
        country: 'JP',
        city: '홋카이도 (Hokkaido)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-20',
        type: EventType.RELEASE,
        title: '[Physical] 프리 데뷔 싱글 《Hands Up》 (CD)',
        description: '일본 현지 발매. A/B 버전 및 특전 포토카드 포함.',
        country: 'JP',
        albumTitle: 'Hands Up',
        relatedUrl: 'https://nct-jp.net/en/news/detail.php?id=1112965',
    },
    {
        date: '2023-12-20',
        time: '18:00',
        type: EventType.TOUR,
        title: '[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 홋카이도 (Day 2)',
        description: '프리 데뷔 투어 일본 공연 마지막 회.',
        location: '카나모토 홀',
        country: 'JP',
        city: '홋카이도 (Hokkaido)',
        seriesName: 'NCT Universe : LASTART PRE-DEBUT TOUR',
    },
    {
        date: '2023-12-21',
        type: EventType.ONLINE_CONTENT,
        title: "[Vlog] NCT NEW TEAM @ USJ",
        description: "NCT NEW TEAM의 유니버셜 스튜디오 재팬 브이로그 (with 막내 16살 생일)",
        location: '유니버셜 스튜디오 재팬',
        country: 'JP',
        city: '오사카 (Osaka)',
        linkedContents: [
            {
                title: "16歳になった末っ子と🥐 ユニバーサルスタジオジャパンへ🌏 | 16살이된 막내랑🩷 유니버셜 스튜디오 재팬에🌏 | NCT NEW TEAM @ USJ",
                url: "https://www.youtube.com/watch?v=IXKZXtBhZvM",
                type: ContentType.VLOG,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-12-24',
        type: EventType.ONLINE_CONTENT,
        title: "[Christmas] Merry Christmas with #NCTNEWTEAM",
        description: "크리스마스 메시지 영상",
        linkedContents: [
            {
                title: "Merry Christmas with #NCTNEWTEAM",
                url: "https://www.youtube.com/watch?v=uM6vjCvIMQQ",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE
            },
            {
                title: "⋆ ₊❆* Christmas with #SION 💐*❆ ₊⋆",
                url: "https://www.youtube.com/watch?v=5VLyQGd1NNQ",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['시온']
            },
            {
                title: "₊❅.✨Have a #RIKU Christmas✨⋆⁺₊❅.",
                url: "https://www.youtube.com/watch?v=8kUKEgJOb4Y",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['리쿠']
            },
            {
                title: "⋆⁺₊✧🧁A Lovely Christmas Day with #SAKUYA🧁⋆⁺₊✧",
                url: "https://www.youtube.com/watch?v=qRDUhrJFBfc",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['사쿠야']
            },
            {
                title: "🎄meet #DAEYOUNG under the mistletoe🎄",
                url: "https://www.youtube.com/watch?v=tOPGG_jqxOo",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['재희']
            },
            {
                title: "﹡˖˟༝🤍 Peace, joy and #YUSHI 🤍˖˟ ༝˖˟",
                url: "https://www.youtube.com/watch?v=YvS8H9H3nu0",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['유우시']
            },
            {
                title: "｡*̥❄︎‧˚₊✧⛄️Santa baby #RYO 🦌*:･❄️",
                url: "https://www.youtube.com/watch?v=HIx9Lr4i2j4",
                type: ContentType.ANNOUNCEMENT,
                platform: Platform.YOUTUBE,
                cast: ['료']
            }
        ]
    },
    {
        date: '2023-12-28',
        type: EventType.ONLINE_CONTENT,
        title: "[Vlog] NCT NEW TEAM @ USJ (Part 2)",
        description: "NCT NEW TEAM의 유니버셜 스튜디오 재팬 브이로그 (호그와트 & 롤러코스터)",
        location: '유니버셜 스튜디오 재팬',
        country: 'JP',
        city: '오사카 (Osaka)',
        linkedContents: [
            {
                title: "ときめくホグワーツと🧙🏻ローラーコースターチャレンジ🎢 | 설레이는 호그와트와🪄  롤러코스터 도전👊 | NCT NEW TEAM @ USJ",
                url: "https://www.youtube.com/watch?v=Nypn2bYdP1s",
                type: ContentType.VLOG,
                platform: Platform.YOUTUBE
            }
        ]
    },
    {
        date: '2023-12-29',
        type: EventType.ONLINE_CONTENT,
        title: "[Behind] Love the way that we go.",
        description: "We Go! 비하인드",
        albumTitle: 'Hands Up',
        linkedContents: [
            {
                title: "Love the way that we go.",
                url: "https://www.youtube.com/watch?v=gMxXljBBjI8",
                type: ContentType.BEHIND,
                platform: Platform.YOUTUBE
            }
        ]
    },
];
/**https://nct-jp.net/ko/live/tour.php?id=1002368
https://maily.so/kpopmukzzibba/posts/g1o4mjplove
https://x.com/SM_NCTUniverse/status/1693549249202426233
https://www.joynews24.com/view/1736775 */
