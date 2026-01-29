/**
 * Seed: Lore 데이터
 * 
 * NCT WISH 세계관 종합 분석 기반
 * "아키텍처 오브 어스피레이션(Architecture of Aspiration)" 보고서 참조
 */

import { PrismaClient, LoreType, LoreStatus } from '@prisma/client';

export async function seedLore(prisma: PrismaClient) {
  console.log('🌌 Seeding Lore data...');

  const lores: Array<{
    title: string;
    type: LoreType;
    status: LoreStatus;
    era?: string;
    description: string;
    solution?: string;
    tags: string[];
    discoveryDate?: Date;
    solvedDate?: Date;
    upvotes: number;
    downvotes?: number;
    isApproved: boolean;
  }> = [
    // ==================== 핵심 세계관 (Cupid Scouting Society) ====================
    {
      title: 'Cupid Scouting Society',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `NCT WISH 세계관의 핵심 설정. 멤버들은 "견습 큐피드"로서 사람들의 소원을 찾아내고 이루어주는 임무를 수행한다.

이들은 전지전능한 신이 아니라 훈련 중인 큐피드로서:
- 때로는 실수하고 엉뚱한 결과를 초래하기도 함
- 완벽하지 않지만 순수한 의도와 열정으로 세상을 긍정적으로 변화시킴
- 현실과 환상이 교차하는 '매지컬 리얼리즘' 세계관 속에 존재

"WISH for Our WISH" - 대중의 소원과 꿈을 응원하고 음악과 사랑을 통해 함께 이루어간다는 철학.`,
      tags: ['worldview', 'cupid', 'core-concept', 'wish', 'magical-realism'],
      discoveryDate: new Date('2024-02-28'),
      upvotes: 1247,
      isApproved: true
    },
    {
      title: 'Wichu - The Star Mascot',
      type: LoreType.OBJECT,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `위츄(Wichu)는 NCT WISH의 마스코트 캐릭터이자 세계관의 핵심 매개체.

역할과 의미:
- 멤버들의 힘이 투영된 매개체 혹은 또 다른 자아
- 에스파의 나이비스(Naevis)와 유사한 조력자이자 정령
- 현실 세계에 물리적으로 개입하는 방식을 상징

뮤직비디오에서 멤버들이 위츄의 모습으로 변하거나 위츄 인형을 통해 마법을 부리는 장면이 등장.

상표권 등록: 2024.02.22 SM Entertainment가 공식 출원`,
      tags: ['wichu', 'mascot', 'worldview', 'magical-object', 'nct-universe'],
      discoveryDate: new Date('2024-02-22'),
      upvotes: 834,
      isApproved: true
    },
    {
      title: 'Dream vs Wish: 우주론적 관계',
      type: LoreType.CONNECTION,
      status: LoreStatus.ONGOING,
      era: 'NASA',
      description: `NCT Dream과 NCT WISH의 철학적 관계 설정:

NCT Dream:
- 수면 중의 꿈, 무의식
- 이상향(Goal) 그 자체
- 꿈의 공간을 공유하는 수동적 연결

NCT WISH:
- 깨어있는 상태에서의 의식적 갈망(Desire)
- 실현하려는 능동적 행위(Action)
- 꿈을 현실로 만드는 주체

《NCT: Dream Contact 'Our Wish'》 티저에서 두 그룹의 연결고리 암시.
태용(NCT 127) 등 기존 멤버 등장 → NCT 유니버스 다중우주(Multiverse) 내 존재 확인.`,
      tags: ['nct-dream', 'nct-universe', 'philosophy', 'multiverse', 'dream-contact'],
      discoveryDate: new Date('2024-01-20'),
      upvotes: 1523,
      downvotes: 43,
      isApproved: true
    },

    // ==================== 멤버별 상징 체계 ====================
    {
      title: 'Sion - The Ocean Guardian',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `시온(SION)의 상징 체계:

상징물:
- 바다(Ocean) 🌊
- 튤립 🌷
- 토끼 🐰

의미 분석:
- 본명(Oh Sion)과 고향(목포)에서 유래한 '바다' 이미지
- 팀의 포용적이고 넓은 기반
- 멤버들을 감싸는 리더십

원형(Archetype): 수호자(Guardian), 어린 왕자(Little Prince)
- 어머니가 선물한 '어린 왕자' 목걸이 에피소드
- 팀 내에서 관계를 맺고 책임지는 '길들이는 자(Tamer)' 역할`,
      tags: ['sion', 'ocean', 'leader', 'symbol', 'archetype', 'little-prince'],
      discoveryDate: new Date('2024-03-01'),
      upvotes: 678,
      isApproved: true
    },
    {
      title: 'Riku - The Trickster Protagonist',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `리쿠(RIKU)의 상징 체계:

상징물:
- 다람쥐 🐿️
- 고양이 🐈

서사적 역할:
- 일본 데뷔곡 뮤직비디오의 주인공
- 서툰 큐피드로서 좌충우돌 미션 수행
- 서사의 중심에 서는 인물

원형(Archetype): 트릭스터(Trickster)
- 자신감 넘치고 장난기 어린 캐릭터
- 정적일 수 있는 큐피드 서사에 활력과 의외성 부여
- 행동대장 역할

배경: 모닝구 무스메의 다카하시 아이가 사촌 → 타고난 '아이돌 DNA'`,
      tags: ['riku', 'trickster', 'protagonist', 'archetype', 'japan-debut'],
      discoveryDate: new Date('2024-02-28'),
      upvotes: 892,
      isApproved: true
    },
    {
      title: 'Yushi - Star Butterfly',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `유우시(YUSHI)의 상징 체계:

상징물:
- 별 ⭐️
- 날개/나비 🦋
- 고양이 🐈

《Dream Contact》 티저 묘사:
- 파란 나비로 등장
- 날개를 가진 존재
- 몽환적이고 비현실적인 존재감

의미:
- 소원을 하늘(우주)로 전달하는 매개자
- 현실과 꿈의 경계를 넘나드는 신비로운 존재
- 5년 연습생 기간 → 인내와 결실의 아이콘

무대 갭: 폭발적 에너지 ↔ 평소 조용한 성격
→ 내면에 강력한 소원(별)을 품고 있음을 상징`,
      tags: ['yushi', 'star', 'butterfly', 'wings', 'dream-contact', 'trainee'],
      discoveryDate: new Date('2024-01-20'),
      upvotes: 1156,
      isApproved: true
    },
    {
      title: 'Jaehee - The Growing Tree',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `재희(JAEHEE, 본명: 대영)의 상징 체계:

상징물:
- 나무 🌳

이름 변경의 의미:
- 대영 → 재희
- '다시 태어남'과 '성장'의 서사
- 2024년 공식 활동명 변경

나무 상징의 의미:
- "큰 나무처럼 성장하여 그늘이 되어주겠다"
- 팀의 음악적 중심 (메인보컬)
- 뿌리 깊은 안정감과 지속적 성장

세계관 내 역할:
- WISH 뮤비에서 나무는 중요한 매개체로 등장
- 잘못 발사된 사랑의 총알로 인해 여주인공이 나무(재희)와 사랑에 빠지는 장면

보컬 계보: SM 정통 보컬 라인(백현, 도영) 계승`,
      tags: ['jaehee', 'tree', 'main-vocal', 'growth', 'name-change', 'sm-vocal'],
      discoveryDate: new Date('2024-03-05'),
      upvotes: 743,
      isApproved: true
    },
    {
      title: 'Ryo - The Witness Bridge',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `료(RYO)의 상징 체계:

상징물:
- 물개 🦭
- 말티즈 🐕

특별한 기원 스토리:
- NCT 콘서트장에서 캐스팅
- '성덕(성공한 덕후)' 서사
- 팬덤(NCTzen)과 아이돌을 잇는 가교

팀 내 역할:
- 활력소(Vitamin)
- 분위기 메이커(Mood Maker)

세계관 내 기능:
- 소원을 가장 먼저 발견하는 '목격자(Witness)'
- 상황을 관찰하고 타깃을 찾아내는 역할

의미: 팬과 아이돌의 경계를 허무는 존재`,
      tags: ['ryo', 'witness', 'bridge', 'fan-to-idol', 'casting-story'],
      discoveryDate: new Date('2024-03-01'),
      upvotes: 567,
      isApproved: true
    },
    {
      title: 'Sakuya - The Innocent Baker',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `사쿠야(SAKUYA)의 상징 체계:

상징물:
- 크루아상 🥐
- 판다 🐼

원형(Archetype): 순수의 결정체(Innocence)
- 팀의 막내
- 순수함 그 자체를 상징

'위시 베이커리(WISH Bakery)' 로어:
- 빵을 좋아한다는 설정에서 파생
- 행복(빵)을 구워내는 창작자
- 사람들에게 따뜻함을 전달

뮤직비디오 서사:
- WISH: 짝사랑에 빠지는 주인공 (사쿠야 시점)
- Steady: 유령 여학생과 사랑에 빠지는 이야기
- 로맨스와 감정 변화의 중심 인물

의미: 세상의 경이로움과 사랑을 가장 먼저, 가장 깊이 받아들이는 열린 존재`,
      tags: ['sakuya', 'innocent', 'bakery', 'maknae', 'romance', 'first-love'],
      discoveryDate: new Date('2024-02-28'),
      upvotes: 1034,
      isApproved: true
    },

    // ==================== 뮤직비디오 서사 분석 ====================
    {
      title: 'Hands Up - The Awakening Signal',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'NASA',
      description: `프리 데뷔곡 "Hands Up" 뮤직비디오 서사 분석:

컨셉: SF적이고 미래지향적
핵심 장면: 멤버들이 신호를 받고 하늘을 향해 손을 뻗음

서사적 의미:
- 큐피드로서의 자각(Awakening)
- 팀으로서의 소집(召集)
- 기원 설화(Origin Story)

시각적 특징:
- 역동적인 카메라 워킹
- 강렬한 조명
- 잠재된 에너지와 세상 밖으로 나가려는 열망 시각화

발매: 2023.10.19 (Pre-Debut Single)

의미: 아직 구체적인 큐피드 모습보다는 '팀의 결성' 자체에 초점`,
      tags: ['hands-up', 'nasa', 'pre-debut', 'awakening', 'origin-story', 'sf'],
      discoveryDate: new Date('2023-10-19'),
      upvotes: 456,
      isApproved: true
    },
    {
      title: 'WISH MV - Dual Narrative Structure',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `데뷔곡 "WISH" 뮤직비디오의 이원화된 서사 구조:

【일본어 버전 - 리쿠의 시점】
- 주인공: 리쿠
- 서사: 초보 큐피드의 좌충우돌 미션
- 실수를 연발하지만 사랑스러운 모습
- 그룹 정체성: 완벽하지 않지만 순수한 의도

【한국어 버전 - 사쿠야의 시점】
- 주인공: 사쿠야
- 장르: 로맨틱 코미디
- 서사: 짝사랑에 빠지는 이야기

핵심 설정: 잘못 발사된 '사랑의 총알'
- 여주인공이 나무(재희의 상징)와 사랑에 빠짐
- 멤버가 총알을 대신 맞으며 희생(?)

철학적 메시지:
- 사랑은 통제 불가능하고 예측할 수 없음
- 큐피드조차 사랑 앞에서는 실수함

발매: 2024.02.28 (Debut Single)`,
      tags: ['wish', 'debut', 'dual-narrative', 'riku', 'sakuya', 'cupid-arrow', 'love'],
      discoveryDate: new Date('2024-02-28'),
      upvotes: 1678,
      isApproved: true
    },
    {
      title: 'Songbird - Wish Delivery Service',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Songbird',
      description: `"Songbird" 뮤직비디오 서사 분석:

역할 확장: Scouting → Delivery
- 소원을 찾는 단계에서 전달하는 단계로 성장
- 본격적인 '소원 배달 서비스' 운영

상징: 파랑새(Songbird)
- 행복과 소식을 전하는 메신저
- 희망의 전파자

시각적 특징:
- 빠른 템포의 편집
- 레이어링 된 비주얼
- 하늘을 날아다니며 전 세계에 희망을 전파하는 속도감

성장 서사:
- 데뷔 초기의 서툰 모습 → 능숙한 배달부로 성장
- 대중에게 행복을 전달하는 아이돌의 역할 완성

발매: 2024.06.24 (2nd Single)`,
      tags: ['songbird', 'delivery', 'bluebird', 'growth', 'messenger', 'hope'],
      discoveryDate: new Date('2024-06-24'),
      upvotes: 923,
      isApproved: true
    },
    {
      title: 'Steady - Ghost Love & Memory',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Steady',
      description: `"Steady" 뮤직비디오 서사 분석 - 성숙한 테마로의 전환:

배경: 학교
주인공: 사쿠야
서사: 유령 여학생과의 사랑

스토리 전개:
1. 사쿠야가 유령 소녀와 만남
2. 행복한 시간을 보냄
3. 클라이맥스: 유령 소녀가 애니메이션 효과와 함께 사라짐

테마:
- 상실(Loss)과 기억(Memory)
- 청춘의 한순간은 영원할 수 없음
- 첫사랑은 필연적으로 추억으로 남음

역설적 의미: 'Steady(변함없음)'
→ 변해가는 세상 속에서 영원히 간직하고 싶은 순간에 대한 갈망

연출: 시네마틱(Cinematic)
→ 단순한 '귀여움'을 넘어 감성적 영역(Emotional Pop)까지 확장

발매: 2024.09.24 (1st EP)`,
      tags: ['steady', 'ghost', 'first-love', 'memory', 'loss', 'cinematic', 'emotional'],
      discoveryDate: new Date('2024-09-24'),
      upvotes: 1345,
      isApproved: true
    },
    {
      title: 'Wishful Winter - The Toy Shop Healer',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Wishful Winter',
      description: `겨울 시즌 송 "Wishful Winter" 뮤직비디오 서사:

설정: 장난감 가게
역할: 망가진 것을 고치는 치유자(Healer)

스토리:
- 부서진 인형들을 수리하여 아이들에게 돌려줌
- 강아지를 보고 싶어 하는 아이를 위해 강아지 장난감 제작

큐피드의 또 다른 역할:
- 사랑의 전달자 → 치유자로 확장
- 상처받은 동심과 꿈을 복원
- 잃어버린 행복을 되찾아줌

메시지: "WISH for Our WISH"의 가장 직관적인 표현
→ 대중의 소원을 듣고 이루어주는 본질

발매: 2024.12.16 (Winter Single)

평가: 그룹명의 철학을 가장 완벽하게 구현한 작품`,
      tags: ['wishful-winter', 'toy-shop', 'healer', 'childhood', 'winter', 'restoration'],
      discoveryDate: new Date('2024-12-16'),
      upvotes: 876,
      isApproved: true
    },
    {
      title: 'COLOR - Restoring the Colorless World',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'COLOR',
      description: `"COLOR" 세계관 확장 - 색(Color)을 매개로 한 구원:

티저: "Color is Missing"
- 색을 잃어버린 회색빛 도시
- 무기력과 우울에 빠진 현대사회 은유

뮤직비디오 서사:
- 멤버들이 미술관 그림 속으로 들어감
- 도시 곳곳을 누비며 색채를 복원
- 프리즘 효과와 빛의 산란 연출

상징적 의미:
- NCT WISH의 존재 = 세상에 다양성과 생기를 불어넣음
- 예술적 구원(Artistic Salvation)
- 무채색 → 스펙트럼으로의 전환

음악적 성숙:
- 귀엽고 청량한 '위시코어' → 세련되고 몽환적인 일렉트로 팝
- R&B 장르로 음악적 스펙트럼 확장

발매: 2025.09.02 (3rd EP)`,
      tags: ['color', 'art', 'spectrum', 'restoration', 'electro-pop', 'maturity'],
      discoveryDate: new Date('2025-09-02'),
      upvotes: 1567,
      isApproved: true
    },
    {
      title: 'Baby Blue - Coming-of-Age Blue',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'COLOR',
      description: `"Baby Blue" 뮤직비디오 서사 분석:

형식: 옴니버스(Omnibus)
테마: 소년에서 청년으로의 과도기

'베이비 블루'의 의미:
- 성장기의 불안과 설렘
- 청춘의 감성적 색감
- 순수함과 성숙함 사이의 경계

시각적 오브제:
- 바다 🌊
- 사진 📷
- 작은 배 ⛵

서정성:
- 각자의 성장통과 추억을 엮어냄
- 개인적이면서도 보편적인 서사
- 시네마틱한 깊이

발매: 2025.08.26 (COLOR EP 수록곡)

특징: NCT WISH의 감성적 성숙도를 보여주는 작품`,
      tags: ['baby-blue', 'coming-of-age', 'ocean', 'youth', 'growth', 'omnibus'],
      discoveryDate: new Date('2025-08-26'),
      upvotes: 1123,
      isApproved: true
    },
    {
      title: 'Hello Mellow & Wishlist - Gamification of Daily Life',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'WISHLIST',
      description: `일본 1st EP의 타이틀곡들 - 일상의 게임화:

배경: 학교와 일상
문법: 비디오 게임 시스템

스토리:
- 사소한 불운으로 에너지 고갈
- 미소를 잃는 멤버들
- 친구들과의 우정을 통해 회복 (HP 회복)

메시지:
- 거창한 소원뿐만 아니라 일상의 작은 행복도 중요
- 큐피드의 임무 = 소소한 행복 지키기
- 회복탄력성(Resilience)

게임 UI 연출:
- HP 바
- 레벨 업 이펙트
- 아이템 획득 연출

발매: 2025.04.01 (Japan 1st EP)

Z세대 친화적: 게임 언어로 감정 표현`,
      tags: ['hello-mellow', 'wishlist', 'gamification', 'school', 'friendship', 'hp-recovery'],
      discoveryDate: new Date('2025-04-01'),
      upvotes: 734,
      isApproved: true
    },

    // ==================== 추가 세계관 요소 ====================
    {
      title: 'Wishcore Aesthetic',
      type: LoreType.OBJECT,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `'위시코어(Wishcore)' - NCT WISH만의 독특한 미적 양식:

특징:
- 청량하고 밝은 색감
- 귀엽고 사랑스러운 비주얼
- 몽환적이고 꿈같은 분위기
- 동화적 서사 구조

기존 NCT와의 차별점:
- NCT 127: 어둡고 강렬한 'Neo' 미학
- NCT DREAM: 청춘과 성장의 'Dream' 미학
- NCT WISH: 밝고 희망적인 'Wish' 미학

시각적 요소:
- 파스텔 톤
- 반짝이는 이펙트
- 별, 구름, 하늘 모티프
- 큐피드 상징물 (화살, 날개, 하트)

음악적 요소:
- 경쾌한 멜로디
- 청량한 보컬
- 팝 기반의 접근성

진화: COLOR 앨범부터 세련되고 몽환적인 방향으로 성숙`,
      tags: ['wishcore', 'aesthetic', 'visual', 'pastel', 'dreamy', 'cute'],
      discoveryDate: new Date('2024-03-15'),
      upvotes: 2134,
      isApproved: true
    },
    {
      title: 'Dream Lab & Reality Bridge',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'NASA',
      description: `꿈의 실험실(Dream Lab)과 현실 세계의 연결 고리:

설정:
- NCT WISH는 Dream Lab과 현실을 오가는 존재
- 사람들의 염원을 배달하는 메신저 역할

Dream Lab:
- NCT 유니버스의 핵심 공간
- 꿈과 소원이 모이는 곳
- 무의식과 의식의 경계

NCT WISH의 역할:
- Dream Lab에서 소원을 수집
- 현실 세계로 전달
- 꿈을 현실로 만드는 가교

시각적 표현:
- NASA 티저의 우주 공간
- WISH 뮤비의 환상적 공간
- Songbird의 하늘을 나는 장면

의미: 관념(Dream)과 실천(Wish)의 연결자`,
      tags: ['dream-lab', 'reality', 'bridge', 'nct-universe', 'messenger'],
      discoveryDate: new Date('2024-01-20'),
      upvotes: 987,
      isApproved: true
    },
    {
      title: 'Into The Wish Tour - Immersive Storytelling',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'COLOR',
      description: `"Into The Wish: Our Wish" 투어 - 스토리텔링형 공연:

컨셉:
- 단순한 콘서트를 넘어선 경험
- 세계관을 집약적으로 보여주는 무대
- 관객이 직접 NCT WISH 세계관 속으로 들어감

예상 구성:
- Act 1: NASA / 큐피드의 각성
- Act 2: WISH / 첫 임무
- Act 3: Songbird / 배달의 시작
- Act 4: Steady / 성장과 상실
- Act 5: COLOR / 세상을 바꾸는 힘

무대 연출:
- 몰입형 세트 디자인
- AR/VR 기술 활용
- 관객 참여형 인터랙션

의미: 2025-2026 확장 전략의 핵심`,
      tags: ['tour', 'concert', 'storytelling', 'immersive', 'into-the-wish'],
      discoveryDate: new Date('2025-10-01'),
      upvotes: 1234,
      isApproved: true
    },

    // ==================== 미스터리 & 미회수 떡밥 ====================
    {
      title: '사쿠야 유령설 - 존재론적 미스터리',
      type: LoreType.THEORY,
      status: LoreStatus.UNSOLVED,
      era: 'Steady',
      description: `팀의 막내 사쿠야의 존재론적 지위에 관한 논쟁적 가설.

핵심 증거:
1. Steady 뮤비에서 유령 소녀와 독대하며 소통
2. 다른 멤버들이나 배경 인물들이 사쿠야를 인지하지 못하는 듯한 연출
3. 'Finding Psyche' 무드 샘플러에서 사쿠야, 리쿠, 재희만 눈을 뜨고 있음

팬덤 가설:
- 사쿠야가 유령과 소통할 수 있었던 이유 = 본인도 유령이거나 영적 존재
- 멤버들의 상상 속 존재 또는 유년기의 순수함을 상징하는 환상적 존재
- Steady 결말에서 유령이 사라지자 사쿠야만 홀로 남아 눈물 흘림

철학적 의미:
- 유년기의 순수함은 실재하지 않거나 금방 사라지는 환상
- 성장은 곧 순수함의 일부를 잃는 과정

출처: 유튜브 채널 '윗집아랫집', 팬덤 집단 분석`,
      tags: ['sakuya', 'ghost', 'mystery', 'steady', 'unsolved', 'existence', 'finding-psyche'],
      discoveryDate: new Date('2024-09-24'),
      upvotes: 2347,
      downvotes: 156,
      isApproved: true
    },
    {
      title: '료의 부치지 못한 편지',
      type: LoreType.THEORY,
      status: LoreStatus.UNSOLVED,
      era: 'Baby Blue',
      description: `Baby Blue 뮤직비디오의 핵심 미스터리.

스토리:
- 멤버들은 각자의 상징물을 뗏목에 실어 바다로 떠나보냄
- 유우시: 책/꽃
- 재희: 시계
- 리쿠: 셔츠
- 료: 편지를 쓰는 장면이 비중있게 나옴

미스터리:
- 뗏목 위에 료의 편지가 실려있는지 불분명하거나 누락된 것으로 보임

팬덤 해석:
【가설 1 - 미련설】
- 료는 아직 유년기를 떠나보낼 준비가 안됨
- 편지를 부치지 못한 것 = 성장 거부/유예

【가설 2 - 기록자설】
- 료는 3인칭 화법("료는...")을 사용 → 서술자(Narrator) 역할
- 뗏목은 사라지는 것들의 무덤
- 료의 기록(편지)은 사라지면 안되고 남아서 이야기를 전해야 함
- 따라서 편지는 의도적으로 제외됨

의미: 성장은 완료형이 아니라 현재진행형의 후회를 동반`,
      tags: ['ryo', 'letter', 'baby-blue', 'narrator', 'raft', 'unsolved', 'coming-of-age'],
      discoveryDate: new Date('2025-08-26'),
      upvotes: 1823,
      downvotes: 89,
      isApproved: true
    },
    {
      title: '유우시의 날개 - 금기의 위반자',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Hello Mellow',
      description: `유우시의 경계인(Boundary Figure) 서사.

핵심 설정:
티저의 경고 문구:
"본 모습은 결코 알려져서는 안 된다"
"본 모습을 들킨 자는 그 세계에 머물 수 없다"

유우시의 특이점:
1. Hello Mellow 뮤비에서 유일하게 코트를 열어젖힘
2. 날개를 암시하는 깃털 오브제와 함께 등장
3. 멤버들이 앞으로 걸어갈 때 유우시만 뒤(인간 세계)를 돌아봄

팬덤 해석:
- 유우시가 인간 세계에 가장 깊은 애착을 가짐
- 교통사고 위기의 아이들을 구하기 위해 날개를 펼침 (금기 위반)
- 이로 인해 인간계 추방 확정

성경적 모티프:
- 소돔과 고모라를 탈출할 때 뒤를 돌아본 '롯의 아내'
- 미련은 그를 비극적 운명의 주인공으로 만듦

의미: 이상(천상)과 현실(지상) 사이의 갈등. 아이돌의 숙명.`,
      tags: ['yushi', 'wings', 'forbidden', 'hello-mellow', 'boundary', 'sacrifice', 'tragedy'],
      discoveryDate: new Date('2025-04-01'),
      upvotes: 2156,
      downvotes: 67,
      isApproved: true
    },
    {
      title: '8:35 - 기적의 시간 루프',
      type: LoreType.EASTER_EGG,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `NCT WISH 세계관의 성수(Holy Number) - 8시 35분.

발생 사례:
- 료와 사쿠야가 초록별을 처음 발견한 시간
- 도쿄돔 데뷔 무대 시작 시간
- 뮤비 속 유성우 낙하 시간 (20:35)
- 각종 티저 업로드 시간

팬덤 해석:
【기적의 순간】
- 팬들과 멤버들이 처음 만난 시간
- 영원히 함께하고 싶은 '멈춰진 시간'
- 접속(Contact)의 순간

【타임루프설】
- 이 시간이 반복되는 것 = 타임루프에 갇혀있음
- 끊임없이 같은 시간대에서 소원을 이루기 위해 고군분투
- 일본 뮤비에서 큐피드들이 시간을 멈추는 능력을 보여줌

【엔젤 넘버】
- 8:35를 엔젤 넘버로 해석
- 운명적 만남과 영원히 기억될 찰나의 순간

의미: 팬-아티스트 관계의 영원성과 반복되는 소원 성취의 순간`,
      tags: ['835', 'time', 'loop', 'angel-number', 'miracle', 'eternal-moment', 'green-star'],
      discoveryDate: new Date('2024-03-15'),
      upvotes: 3124,
      downvotes: 34,
      isApproved: true
    },
    {
      title: '초록별 (Green Star) - 팬덤의 신격화',
      type: LoreType.SYMBOL,
      status: LoreStatus.ONGOING,
      era: 'WISH',
      description: `NCT WISH 세계관의 가장 독창적 설정. 팬덤을 살아있는 존재로 치환.

공식 설정:
- 팬덤 공식 색상: 펄 네오 샴페인 (초록빛)
- 세계관 내 인격체: 초록별(Green Star)

초록별의 스토리:
- 원래 소원을 들어주는 별이었음
- 어느 날 갑자기 초록색으로 변함
- 소원을 받지 못하게 된 슬픈 존재
- 멤버들이 찾아 헤매는 대상

관계의 역전:
전통적: 팬들이 아이돌(별)을 바라봄
NCT WISH: 아이돌이 팬(초록별)의 빛을 되찾아줌

멤버들의 역할:
- 초록별의 소원을 들어주는 존재
- 별이 다시 빛나게 하는 구원자
- 수평적 구원 서사

팝업스토어:
- 초록별 점등 이벤트
- 팬들이 직접 별을 켜는 참여형 경험

의미: 팬-아티스트 관계를 신화적으로 재해석한 수평적 구원 구조`,
      tags: ['green-star', 'fandom', 'sieunie', 'symbolism', 'wish', 'mutual-salvation'],
      discoveryDate: new Date('2024-02-28'),
      upvotes: 4567,
      isApproved: true
    },
    {
      title: 'Finding Psyche - 에로스와 프시케 신화',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'MIMP',
      description: `그리스 로마 신화 '에로스와 프시케' 이야기의 차용과 재해석.

신화적 배경:
- 에로스(Cupid): 사랑의 신
- 프시케(Psyche): 영혼, 나비로 상징됨
- 에로스가 프시케를 만나 진정한 사랑을 깨닫고 성숙해짐

NCT WISH의 해석:
멤버들 = 에로스(견습 큐피드)
찾는 대상 = 프시케

프시케의 정체:
【나비 상징】
- Baby Blue에서 시온이 나비를 쫓다가 바다에 빠짐
- 나비 = 잡을 수 없는 이상향, 성장 그 자체

【팬덤설 (최유력)】
- 프시케 = 시즈니(팬덤) = 초록별
- 에로스가 프시케를 만나 완전해지듯
- 멤버들은 팬들을 만나 비로소 완전한 존재가 됨

무드 샘플러:
- 'Finding Psyche' 영상에서 멤버들 중 일부만 눈을 뜸
- 각성한 에로스 vs 잠든 에로스
- 진실을 마주한 자 vs 아직 모르는 자

콘서트 VCR:
- 멤버들의 손끝에 나비가 앉아야만 새로운 세계가 열림
- 상호의존적 구원 관계 시각화

의미: 아티스트와 팬의 상호 완성. 사랑을 통한 성숙.`,
      tags: ['finding-psyche', 'eros', 'psyche', 'mythology', 'butterfly', 'fandom', 'mimp'],
      discoveryDate: new Date('2025-12-20'),
      upvotes: 2789,
      isApproved: true
    },
    {
      title: '케노시스 (Kenosis) - 상실을 통한 성장',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Baby Blue',
      description: `NCT WISH의 청춘 서사 = 획득이 아닌 '비움'을 통한 성장.

신학 용어 케노시스(Kenosis):
- 그리스어 "κένωσις" (비움)
- 그리스도가 신성을 비우고 인간이 된 자기 비움

NCT WISH의 케노시스 - 단계별 상실:

【1단계: Steady】
상실 대상: 첫사랑
- 영원(Steady)을 약속했으나 헤어짐
- 유령(과거의 연인/자아)과 작별
- 유령이 사라지며 사쿠야가 눈물

【2단계: Wishful Winter】
상실 대상: 애착 인형
- 유년기의 보호막(Transitional Object) 양도
- 산타(주는 존재)로서의 각성
- 아이에게 자신의 소중한 것을 넘겨줌

【3단계: Baby Blue】
상실 대상: 추억/유년
- 뗏목에 추억이 깃든 물건들을 실어 바다로 떠나보냄
- 성인식(Coming of Age)의 장례 절차
- 되돌릴 수 없는 시간의 흐름을 물리적으로 시각화

【4단계: Hello Mellow】
상실 대상: 인간계의 일상
- 행복했던 지상의 삶을 뒤로함
- 본연의 임무(천상)로 복귀
- 낙원 추방 혹은 승천

철학적 의미:
- 청춘은 마냥 밝고 희망찬 것이 아님
- 필연적인 상실을 내포한 애틋한 것(Baby Blue)
- 성장 = 소중한 것을 하나씩 포기하는 제의적 과정

결론: 어른이 되기 위해서는 유년의 것들을 떠나보내야 함`,
      tags: ['kenosis', 'loss', 'growth', 'coming-of-age', 'sacrifice', 'steady', 'baby-blue'],
      discoveryDate: new Date('2024-12-16'),
      upvotes: 3456,
      isApproved: true
    },
    {
      title: '학교 괴담 - 호러 트위스트',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'MIMP',
      description: `'하이틴 로맨스'에서 '학교 괴담'으로 장르 전환.

MIMP (Finding Psyche) 프로모션:
- 초반: 밝고 청량한 학교 배경
- 후반: 분신사바, 유령 사진 등 호러 요소

핵심 장면:
【분신사바】
- 멤버들이 분신사바 의식을 수행
- 무언가를 소환하려는 시도

의미:
- 소원 성취의 과정이 항상 밝고 긍정적이지만은 않음
- 간절한 소원은 초자연적인 힘을 부름
- 대가(代價)가 따르는 소원

【제7의 멤버】
- 단체 사진에 흐릿하게 찍힌 유령의 형상
- "우리는 6명이지만 항상 누군가와 함께 있다"

누군가의 정체:
- 잊혀진 과거
- 팬덤 (초록별)
- 사라진 유년기의 자아

연출 의도:
- NCT 특유의 '네오(Neo)'한 기괴함
- WISH의 청량함과 결합
- 밝은 것과 어두운 것의 공존

평가: 고도로 계산된 장르 믹스. 청춘의 양면성 표현.`,
      tags: ['horror', 'school-ghost', 'mimp', 'finding-psyche', 'ouija', 'seventh-member'],
      discoveryDate: new Date('2025-12-15'),
      upvotes: 2234,
      downvotes: 234,
      isApproved: true
    },
    {
      title: '위시 젤리 & 별사탕 - 성체성사',
      type: LoreType.OBJECT,
      status: LoreStatus.ONGOING,
      era: 'MIMP',
      description: `멤버들이 소원을 이루어주는 도구(매개체)의 진화.

【1세대: 별사탕】
시기: Songbird 시대
형태: 먹으면 소원을 이뤄주는 별사탕
의미: 순수한 소망의 결정체
역할: 단순한 소원 성취(Wish)

【2세대: 위시 젤리 / 팝츄】
시기: PopPop / MIMP 시대
형태: 솜사탕 맛 핑크색 젤리
효과: 먹으면 '사랑에 빠진다'
특징: '녹는다(Melted WICHU)' 설정

진화의 의미:
- 소원 성취 → 감정적 사랑의 매개로 심화
- Wish → Love/Eros
- 관계 지향적으로 변화

'녹는다'의 상징:
- 감정이 벅차올라 통제할 수 없는 상태
- 첫사랑의 열병
- 이성을 잃고 감정에 휩싸임

성체성사 개념:
- 기독교의 성찬식처럼 먹는 행위를 통한 변화
- 물리적 섭취 → 영적/감정적 변화
- 외부의 것을 내부화하여 본질이 바뀜

결론: 아이템의 진화 = 멤버들의 임무 심화`,
      tags: ['wish-jelly', 'star-candy', 'wichu', 'melted', 'love', 'transformation', 'sacrament'],
      discoveryDate: new Date('2024-06-24'),
      upvotes: 1678,
      isApproved: true
    },
    {
      title: '나비를 쫓는 시온 - 이카로스의 추락',
      type: LoreType.THEORY,
      status: LoreStatus.ONGOING,
      era: 'Baby Blue',
      description: `시온의 나비 추격 장면 - 이상향의 추구와 그 대가.

Baby Blue 핵심 장면:
- 시온이 나비를 쫓아 달려감
- 바다로 떠어듦 (혹은 추락)
- 물속으로 가라앉음

나비의 상징:
1. 프시케 (Psyche) - 영혼
2. 변화와 성장
3. 잡을 수 없는 이상향
4. 꿈과 소원의 구체화

시온의 역할:
- 리더이자 팀의 닻(Anchor)
- 바다를 상징하는 존재
- 그런 그가 바다에 빠진다 = 자기 자신 속으로 침잠

그리스 신화 연결:
【이카로스】
- 태양(이상)을 향해 날아오르다 추락
- 시온은 나비(이상)를 쫓다 바다로 추락

【나르시소스】
- 물에 비친 자신의 모습에 빠져 익사
- 자아 성찰의 과정

팬덤 해석:
- 리더로서 무거운 책임
- 이상을 쫓다 지친 모습
- 하지만 물(바다=본질)로 돌아가 재탄생

의미: 성장을 위해서는 한 번 무너지고 다시 일어나야 함`,
      tags: ['sion', 'butterfly', 'ocean', 'baby-blue', 'icarus', 'narcissus', 'fall'],
      discoveryDate: new Date('2025-08-26'),
      upvotes: 1456,
      isApproved: true
    },
  ];

  for (const lore of lores) {
    await prisma.lore.upsert({
      where: {
        title: lore.title
      },
      update: {},
      create: lore
    });
  }

  console.log(`✅ Created ${lores.length} lore items`);
}
