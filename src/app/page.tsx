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

// 설정 데이터 (추후 src/config/desktop.ts 등으로 분리 가능)
// 바탕화면 아이콘 설정
interface DesktopIconConfig {
  id: string;
  type: AppType;
  title: string;
  iconSrc: string;
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: 'my_wish', type: 'MY_WISH', title: 'My WISH', iconSrc: '/icons/desktop/mywish.png' },
  { id: 'archive', type: 'WISH_ARCHIVE', title: 'WISH Archive', iconSrc: '/icons/desktop/wisharchive.png' },
  { id: 'disco', type: 'DISCOGRAPHY', title: 'Discography', iconSrc: '/icons/desktop/discography.png' },
  { id: 'gallery', type: 'WISH_GALLERY', title: 'WISH_Gallery', iconSrc: '/icons/desktop/wishgallery.png' },
  { id: 'world', type: 'WISH_WORLD', title: 'WISH World', iconSrc: '/icons/desktop/wishworld.png' },
  { id: 'mail', type: 'TO_WISH', title: 'To. WISH', iconSrc: '/icons/desktop/towish.png' },
  { id: 'readme', type: 'README', title: 'README.txt', iconSrc: '/icons/desktop/readme.png' },
  { id: 'trash', type: 'RECYCLE_BIN' as AppType, title: 'Recycle Bin', iconSrc: '/icons/desktop/recyclebin.png' },
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
    component: <PolaroidPhotoWidget src="/images/widgets/PolaroidPhoto/wishpolaroid_temp.jpg" />,
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

export default function Home() {
  // 🖱️ 아이콘 선택 상태 관리
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  // 동적 위젯 위치 계산
  const [widgetPositions, setWidgetPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  // 동적 위젯 크기 계산
  const [widgetScale, setWidgetScale] = useState<number>(1);
  // 창 열기 함수 가져오기
  const { openWindow } = useWindowStore();

  // 화면 크기에 따른 위젯 위치 및 크기 계산
  useEffect(() => {
    const calculatePositions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const taskbarHeight = 50; // Taskbar 높이
      const availableHeight = viewportHeight - taskbarHeight; // 사용 가능한 높이
      
      // 화면 크기에 따른 scale 계산
      // 모바일: 0.4~0.5, 태블릿: 0.5~0.7, 데스크탑: 0.7~1.0
      let scale = 1;
      if (viewportWidth < 768) {
        // 모바일 (320px ~ 767px)
        scale = Math.max(0.35, Math.min(0.5, viewportWidth / 1600));
      } else if (viewportWidth < 1024) {
        // 태블릿 (768px ~ 1023px)
        scale = Math.max(0.5, viewportWidth / 1800);
      } else {
        // 데스크탑 (1024px+)
        scale = Math.max(0.6, viewportWidth / 1920);
      }
      setWidgetScale(scale);
      
      const newPositions: { [key: string]: { x: number; y: number } } = {};
      
      WIDGET_CONFIGS.forEach(widget => {
        // 백분율을 픽셀로 변환 (전체 화면 높이 기준)
        newPositions[widget.id] = {
          x: Math.round((viewportWidth * widget.positionPercent.x) / 100),
          y: Math.round((viewportHeight * widget.positionPercent.y) / 100),
        };
      });
      
      setWidgetPositions(newPositions);
    };

    calculatePositions();
    
    // 화면 크기 변경 시 재계산
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  // 바탕화면 빈 곳 클릭 시 아이콘 선택 해제
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // 이벤트 버블링 방지: 위젯이나 아이콘 클릭 시엔 동작 안 함
    if (e.target === e.currentTarget) {
      setSelectedIconId(null);
    }
  };

  // 아이콘 클릭 핸들러 (이벤트 전파 중단 필수)
  const handleIconClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIconId(id);
  };

  // 아이콘 더블 클릭 핸들러
  const handleIconDoubleClick = (icon: DesktopIconConfig) => {
    // 특수 아이콘 처리 (예: 휴지통)
    if (icon.id === 'trash') {
      setModalOpen(true);
      return;
    }

    // 일반 아이콘: 창 열기
    openWindow({
      id: icon.id,
      type: icon.type,
      title: icon.title,
      icon: icon.iconSrc,
    });
  };

  return (
    <main
      className="w-full h-full relative overflow-hidden"
      onClick={handleBackgroundClick}
    >

      {/* =================================================================================
          0. 윈도우 렌더러 (열린 창들을 그려줌)
          - z-inex 관리는 store 내부에서 처리되므로 신경 쓸 필요 없음
      ================================================================================= */}
      <WindowRenderer />

      {/* =================================================================================
          1. Modal (에러 메시지 등)
      ================================================================================= */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="error"
        title="Error"
        message="추억은 버릴 수 없어요!"
      />

      {/* =================================================================================
          2. 데스크탑 아이콘 그리드
      ================================================================================= */}
      <div className="
        absolute top-4 left-4 bottom-16
        w-full sm:w-[280px] md:w-[200px]
        max-w-[calc(100vw-2rem)]
        flex flex-row sm:flex-col flex-wrap gap-4 sm:gap-y-6 sm:gap-x-2 content-start
        z-[--z-desktop] pointer-events-none
        overflow-y-auto sm:overflow-visible
        px-2 sm:px-0
      ">
        <div className="pointer-events-auto contents">
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
          3. 바탕화면 위젯들 (드래그 가능) - 모든 화면 크기에서 표시
      ================================================================================= */}
      <div className="absolute inset-0 bottom-[50px] pointer-events-none">
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

    </main>
  );
}