/**
 * Desktop Home (메인 바탕화면)
 * 
 * - 아이콘 그리드 (좌측)
 * - 위젯 놀이터 (우측)
 * - 작업 표시줄 (하단 고정)
 * - 반응형 레이아웃 (모바일/데스크탑 대응)
 */

/** TODO: 이미지를 불러오는 위젯은 해당 위젯 내에서 랜덤으로 알아서 이미지 불러와야함
 * 지금은 임시로 고정된 이미지 경로를 넘겨주고 있음
 */

'use client';

import { useState, useEffect } from 'react';
import { useWindowStore, AppType } from '@/app/stores/useWindowStore';
import { Modal } from '@/components/ui';

// --- 컴포넌트 Imports ---
import { DesktopIcon } from '@/components/os';
import WindowRenderer from '@/components/os/WindowRenderer';

// --- 위젯 Imports ---
import { DDayCounterWidget, DraggableWidget, MembersQuoteWidget, MiniPlayerWidget, PhotoCardWidget, PolaroidPhotoWidget, StickyNoteWidget, WichuTamagotchiWidget, WishJarWidget } from '@/components/widgets';

// ----------------------------------------------------------------------
// 1. 설정 데이터 (Config)
// ----------------------------------------------------------------------

// 바탕화면 아이콘 설정
interface DesktopIconConfig {
  id: string;
  type: AppType;
  title: string;
  iconSrc: string;
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: 'my_wish', type: 'MY_WISH', title: 'My WISH', iconSrc: '/system/icons/apps/mywish.png' },
  { id: 'archive', type: 'WISH_ARCHIVE', title: 'WISH Archive', iconSrc: '/system/icons/apps/wisharchive.png' },
  { id: 'disco', type: 'DISCOGRAPHY', title: 'Discography', iconSrc: '/system/icons/apps/discography.png' },
  { id: 'gallery', type: 'WISH_GALLERY', title: 'WISH_Gallery', iconSrc: '/system/icons/apps/wishgallery.png' },
  { id: 'world', type: 'WISH_WORLD', title: 'WISH World', iconSrc: '/system/icons/apps/wishworld.png' },
  { id: 'mail', type: 'TO_WISH', title: 'To. WISH', iconSrc: '/system/icons/apps/towish.png' },
  { id: 'readme', type: 'README', title: 'README.txt', iconSrc: '/system/icons/apps/readme.png' },
  { id: 'trash', type: 'RECYCLE_BIN' as AppType, title: 'Recycle Bin', iconSrc: '/system/icons/apps/recyclebin.png' },
];

// 위젯 설정 (백분율 기반 초기 위치)
interface WidgetConfig {
  id: string;
  positionPercent: { x: number; y: number }; // 화면 크기 대비 백분율 (0~100)
  component: React.ReactNode;
}

const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: 'dday',
    positionPercent: { x: 75, y: 6 },
    component: <DDayCounterWidget targetDate="2024-02-21" label="Debut" />,
  },
  {
    id: 'photocard',
    positionPercent: { x: 30, y: 8 },
    component: <PhotoCardWidget />,
  },
  {
    id: 'sticky_note',
    positionPercent: { x: 78, y: 25 },
    component: <StickyNoteWidget initialText="Welcome to WISH OS! 🍀" color="pink" />,
  },
  {
    id: 'polaroid',
    positionPercent: { x: 18, y: 60 },
    component: <PolaroidPhotoWidget />,
  },
  {
    id: 'tamagotchi',
    positionPercent: { x: 68, y: 55 },
    component: <WichuTamagotchiWidget />,
  },
  {
    id: 'quote',
    positionPercent: { x: 45, y: 75 },
    component: <MembersQuoteWidget />,
  },
  {
    id: 'miniplayer',
    positionPercent: { x: 3, y: 80 },
    component: <MiniPlayerWidget />,
  }
];

// ----------------------------------------------------------------------
// 2. 메인 컴포넌트
// ----------------------------------------------------------------------

export default function Home() {
  // --- State ---
  // 아이콘 선택 상태 관리
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  // 동적 위젯 위치 및 크기 계산
  const [widgetPositions, setWidgetPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [widgetScale, setWidgetScale] = useState<number>(1);
  // Taskbar 높이 (반응형)
  const [taskbarHeight, setTaskbarHeight] = useState<number>(50);
  // 위젯 준비 상태
  const [widgetsReady, setWidgetsReady] = useState(false);

  // --- Store ---
  const { openWindow } = useWindowStore();

  // --- Effects ---
  // 화면 크기에 따른 위젯 위치 및 크기 계산
  useEffect(() => {
    const calculatePositions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Taskbar 높이 계산 (반응형)
      let currentTaskbarHeight = 50; // 기본값
      if (viewportWidth < 640) {
        currentTaskbarHeight = 44; // 모바일: 더 작게
      } else if (viewportWidth < 768) {
        currentTaskbarHeight = 46; // 작은 태블릿
      }
      setTaskbarHeight(currentTaskbarHeight);

      const availableHeight = viewportHeight - currentTaskbarHeight;

      // 화면 크기에 따른 scale 계산
      let scale = 1;
      if (viewportWidth < 640) {
        // 모바일 (320px ~ 639px) - 더 크게
        scale = Math.max(0.45, Math.min(0.65, viewportWidth / 1400));
      } else if (viewportWidth < 768) {
        // 작은 태블릿 (640px ~ 767px)
        scale = Math.max(0.55, Math.min(0.7, viewportWidth / 1500));
      } else if (viewportWidth < 1024) {
        // 태블릿 (768px ~ 1023px)
        scale = Math.max(0.6, viewportWidth / 1700);
      } else if (viewportWidth < 1440) {
        // 작은 데스크탑 (1024px ~ 1439px)
        scale = Math.max(0.7, viewportWidth / 1920);
      } else {
        // 큰 데스크탑 (1440px+)
        scale = Math.min(1.0, viewportWidth / 1920);
      }
      setWidgetScale(scale);

      const newPositions: { [key: string]: { x: number; y: number } } = {};

      WIDGET_CONFIGS.forEach(widget => {
        // 백분율을 픽셀로 변환 (사용 가능한 높이 기준)
        const x = Math.round((viewportWidth * widget.positionPercent.x) / 100);
        const y = Math.round((availableHeight * widget.positionPercent.y) / 100);

        newPositions[widget.id] = { x, y };
      });

      setWidgetPositions(newPositions);
      setWidgetsReady(true); // 위젯 준비 완료
    };

    calculatePositions();

    // 화면 크기 변경 시 재계산
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  // --- Handlers ---
  // 바탕화면 빈 곳 클릭 시 아이콘 선택 해제
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 방지: 위젯이나 아이콘 클릭 시엔 동작 안 함
    if (e.target === e.currentTarget) {
      setSelectedIconId(null);
    }
  };

  // 앱 실행 핸들러
  const executeApp = (icon: DesktopIconConfig) => {
    if (icon.id === 'trash') {
      setModalOpen(true);
      return;
    }

    openWindow({
      id: icon.id,
      type: icon.type,
      title: icon.title,
      icon: icon.iconSrc,
    });

    if (window.innerWidth < 768) {
      // 모바일/태블릿: 아이콘 선택 해제
      setSelectedIconId(null);
    }
  };

  // 아이콘 클릭 핸들러 (이벤트 전파 중단 필수)
  const handleIconClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (window.innerWidth < 768) {
      const icon = DESKTOP_ICONS.find(icon => icon.id === id);
      if (icon) {
        executeApp(icon);
      }
      return;
    }

    setSelectedIconId(id);
  };

  // 아이콘 더블 클릭 핸들러
  const handleIconDoubleClick = (icon: DesktopIconConfig) => {
    executeApp(icon);
  };

  return (
    <main
      className="w-full h-full relative overflow-hidden bg-cover bg-center"
      onClick={handleBackgroundClick}
    >

      {/* =================================================================================
          0. 윈도우 렌더러 (열린 창들을 그려줌)
          - z-index 관리는 store 내부에서 처리
      ================================================================================= */}
      <WindowRenderer />

      {/* =================================================================================
          1. 시스템 모달
      ================================================================================= */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="error"
        title="Error"
        message="추억은 버릴 수 없어요!"
      />

      {/* =================================================================================
          2. 바탕화면 아이콘 그리드
      ================================================================================= */}
      <div className="
        absolute top-0 left-0
        w-full h-full
        pt-safe pl-safe

        /* [Mobile] 전체 화면 채우기, 스크롤 허용 */
        flex flex-row flex-wrap content-start
        justify-start gap-x-6 gap-y-6 p-6
        overflow-y-auto overflow-x-hidden
        pb-[calc(4rem+env(safe-area-inset-bottom))] /*taskbar 높이 확보*/
        pointer-events-auto

        /* [Desktop] 고정 크기 그리드, 스크롤 숨김 */
        md:w-auto md:h-auto md:bottom-auto md:right-auto
        md:flex-col md:flex-wrap md:content-start md:gap-2 md:p-4
        md:overflow-visible
        md:pointer-events-none

        z-[var(--z-desktop)]
      "
        onClick={handleBackgroundClick}
      >
        <div className="contents md:pointer-events-auto">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.title}
              iconSrc={icon.iconSrc}
              isSelected={selectedIconId === icon.id}
              onClick={(e) => handleIconClick(e, icon.id)}
              onDoubleClick={() => handleIconDoubleClick(icon)}
            />
          ))}
        </div>
      </div>


      {/* =================================================================================
          3. 바탕화면 위젯들 (드래그 가능)
      ================================================================================= */}
      {widgetsReady && (
        <div
          className="
            hidden md:block
            absolute inset-0 pointer-events-none z-[var(--z-desktop)]
          "
          style={{ bottom: `${taskbarHeight}px` }}
        >
          {WIDGET_CONFIGS.map((widget) => (
            <DraggableWidget
              key={widget.id}
              defaultPosition={widgetPositions[widget.id] || { x: 0, y: 0 }}
              scale={widgetScale}
            >
              {widget.component}
            </DraggableWidget>
          ))}
        </div>
      )}

    </main>
  );
}