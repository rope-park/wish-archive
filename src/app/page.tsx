/**
 * Desktop Home (메인 바탕화면)
 * 
 * - 아이콘 그리드 (좌측)
 * - 위젯 놀이터 (우측)
 * - 작업 표시줄 (하단 고정)
 * - 반응형 레이아웃 (모바일/데스크탑 대응)
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useWindowStore, AppType } from '@/app/stores/useWindowStore';
import { Modal } from '@/components/ui';
import { LAYOUT_CONSTANTS } from '@/lib/costants';

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

// ----------------------------------------------------------------------
// 2. 메인 컴포넌트
// ----------------------------------------------------------------------

export default function Home() {
  // --- State ---
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [widgetPositions, setWidgetPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [widgetScale, setWidgetScale] = useState<number>(1);
  const [iconScale, setIconScale] = useState<number>(1);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [taskbarHeight, setTaskbarHeight] = useState<number>(48);
  const [widgetsReady, setWidgetsReady] = useState(false);
  const [isViewportTooSmall, setIsViewportTooSmall] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // --- Store ---
  const { openWindow } = useWindowStore();

  // 터치 디바이스 감지
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouchScreen = 'ontouchstart' in window ||
                              navigator.maxTouchPoints > 0 ||
                              ((navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints ?? 0) > 0;

      setIsTouchDevice(hasTouchScreen);
    };

    checkTouchDevice();
  }, []);

  // --- 위젯 설정 (viewport 크기에 따라 동적으로 변경) ---
  const WIDGET_CONFIGS = useMemo(() => {
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

    // 모바일: miniplayer, polaroid, quote, photocard 표시
    if (isMobile) {
      return [
        {
          id: 'photocard',
          positionPercent: { x: 5, y: 5 },
          baseSize: { width: 200, height: 300 },
          component: PhotoCardWidget,
          props: {},
        },
        {
          id: 'polaroid',
          positionPercent: { x: 55, y: 5 },
          baseSize: { width: 256, height: 360 },
          component: PolaroidPhotoWidget,
          props: {},
        },
        {
          id: 'quote',
          positionPercent: { x: 5, y: 45 },
          baseSize: { width: 288, height: 340 },
          component: MembersQuoteWidget,
          props: {},
        },
        {
          id: 'miniplayer',
          positionPercent: { x: 5, y: 75 },
          baseSize: { width: 340, height: 140 },
          component: MiniPlayerWidget,
          props: {},
        },
      ];
    }

        // 태블릿: 중간 수준의 위젯 표시
    if (isTablet) {
      return [
        {
          id: 'dday',
          positionPercent: { x: 5, y: 5 },
          baseSize: { width: 160, height: 70 },
          component: DDayCounterWidget,
          props: { targetDate: "2024-02-21", label: "Debut" },
        },
        {
          id: 'photocard',
          positionPercent: { x: 5, y: 20 },
          baseSize: { width: 180, height: 270 },
          component: PhotoCardWidget,
          props: {},
        },
        {
          id: 'polaroid',
          positionPercent: { x: 30, y: 50 },
          baseSize: { width: 220, height: 310 },
          component: PolaroidPhotoWidget,
          props: {},
        },
        {
          id: 'quote',
          positionPercent: { x: 60, y: 20 },
          baseSize: { width: 260, height: 310 },
          component: MembersQuoteWidget,
          props: {},
        },
        {
          id: 'miniplayer',
          positionPercent: { x: 5, y: 75 },
          baseSize: { width: 300, height: 130 },
          component: MiniPlayerWidget,
          props: {},
        },
      ];
    }

    // 데스크탑: 모든 위젯 표시
    return [
      {
        id: 'dday',
        positionPercent: { x: 75, y: 6 },
        baseSize: { width: 160, height: 70 },
        component: DDayCounterWidget,
        props: { targetDate: "2024-02-21", label: "Debut" },
      },
      {
        id: 'photocard',
        positionPercent: { x: 30, y: 8 },
        baseSize: { width: 200, height: 300 },
        component: PhotoCardWidget,
        props: {},
      },
      {
        id: 'sticky_note',
        positionPercent: { x: 78, y: 25 },
        baseSize: { width: 200, height: 200 },
        component: StickyNoteWidget,
        props: { initialText: "Welcome to WISH OS! 🍀", color: "pink" as const },
      },
      {
        id: 'polaroid',
        positionPercent: { x: 18, y: 60 },
        baseSize: { width: 256, height: 360 },
        component: PolaroidPhotoWidget,
        props: {},
      },
      {
        id: 'tamagotchi',
        positionPercent: { x: 68, y: 55 },
        baseSize: { width: 260, height: 340 },
        component: WichuTamagotchiWidget,
        props: {},
      },
      {
        id: 'quote',
        positionPercent: { x: 45, y: 60 },
        baseSize: { width: 288, height: 340 },
        component: MembersQuoteWidget,
        props: {},
      },
      {
        id: 'miniplayer',
        positionPercent: { x: 3, y: 75 },
        baseSize: { width: 340, height: 140 },
        component: MiniPlayerWidget,
        props: {},
      },
    ];
  }, [viewportWidth]);

  // --- Effects ---
  // 화면 크기에 따른 위젯 위치 및 크기 계산
  useEffect(() => {
    const calculatePositions = () => {
      const currentViewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // viewport width 상태 업데이트 (위젯 설정 재계산 트리거)
      setViewportWidth(currentViewportWidth);

      // 최소 크기 체크
      if (currentViewportWidth < 320 || viewportHeight < 500) {
        setIsViewportTooSmall(true);
        return;
      } else {
        setIsViewportTooSmall(false);
      }

      // Taskbar 높이 계산 (반응형 - 화면 크기에 따라 달라짐)
      let currentTaskbarHeight: number = LAYOUT_CONSTANTS.TASKBAR_HEIGHT; // 기본 48px
      if (currentViewportWidth < 768) {
        currentTaskbarHeight = LAYOUT_CONSTANTS.TASKBAR_HEIGHT_MOBILE; // 64px
      } else if (currentViewportWidth < 1024) {
        currentTaskbarHeight = LAYOUT_CONSTANTS.TASKBAR_HEIGHT_TABLET; // 56px
      }
      setTaskbarHeight(currentTaskbarHeight);

      // 아이콘 크기 계산 (위젯보다 먼저 계산 필요 - 아이콘 영역 높이 계산에 사용)
      let iconScaleValue = 1;
      if (currentViewportWidth < 640) {
        // 모바일 - 0.7 ~ 0.85
        iconScaleValue = 0.7 + ((currentViewportWidth - 320) / (640 - 320)) * 0.15;
      } else if (currentViewportWidth < 768) {
        // 작은 태블릿 - 0.85 ~ 0.95
        iconScaleValue = 0.85 + ((currentViewportWidth - 640) / (768 - 640)) * 0.1;
      } else if (currentViewportWidth < 1024) {
        // 태블릿 - 0.95 ~ 1.0
        iconScaleValue = 0.95 + ((currentViewportWidth - 768) / (1024 - 768)) * 0.05;
      } else if (currentViewportWidth < 1440) {
        // 작은 데스크탑 - 1.0 ~ 1.1
        iconScaleValue = 1.0 + ((currentViewportWidth - 1024) / (1440 - 1024)) * 0.1;
      } else if (currentViewportWidth < 1920) {
        // 중간 데스크탑 - 1.1 ~ 1.2
        iconScaleValue = 1.1 + ((currentViewportWidth - 1440) / (1920 - 1440)) * 0.1;
      } else {
        // 큰 데스크탑 - 1.2 ~ 1.3
        iconScaleValue = Math.min(1.3, 1.2 + ((currentViewportWidth - 1920) / 1000) * 0.1);
      }
      setIconScale(iconScaleValue);

      // 안전 영역 계산 (데스크톱 아이콘 영역 & 태스크바 제외)
      let ICON_AREA_WIDTH = 0;
      let ICON_AREA_HEIGHT = 0;
      
      if (currentViewportWidth < 768) {
        // 모바일: 아이콘이 상단에 flex-wrap으로 배치됨
        // 아이콘 개수와 크기로 대략적인 높이 추정
        const iconSize = (iconScaleValue >= 1 ? 48 : 40) * iconScaleValue; // 아이콘 크기
        const iconContainerHeight = iconSize + 20; // 아이콘 + 라벨
        const iconsPerRow = Math.floor((currentViewportWidth - 48) / (iconSize + 24)); // 가로에 들어갈 아이콘 수
        const iconRows = Math.ceil(DESKTOP_ICONS.length / Math.max(1, iconsPerRow)); // 필요한 행 수
        ICON_AREA_HEIGHT = (iconRows * iconContainerHeight) + 48 + 24; // 행 * 높이 + 상하 패딩 + 여유
        ICON_AREA_WIDTH = 0;
      } else {
        // 데스크탑: 좌측 세로 정렬
        ICON_AREA_WIDTH = 120;
        ICON_AREA_HEIGHT = 0;
      }
      
      const PADDING = LAYOUT_CONSTANTS.PADDING;

      // 사용 가능한 영역 계산
      const safeStartX = ICON_AREA_WIDTH + PADDING;
      const safeWidth = currentViewportWidth - safeStartX - PADDING;
      const safeStartY = ICON_AREA_HEIGHT + PADDING;
      const safeHeight = viewportHeight - currentTaskbarHeight - ICON_AREA_HEIGHT - (PADDING * 2);

      // 화면 크기에 따른 scale 계산 (더 넓은 범위로 동적 조정)
      let scale = 1;
      if (currentViewportWidth < 640) {
        // 모바일 (320px ~ 639px) - 0.4 ~ 0.6
        scale = 0.4 + ((currentViewportWidth - 320) / (640 - 320)) * 0.2;
      } else if (currentViewportWidth < 768) {
        // 작은 태블릿 (640px ~ 767px) - 0.6 ~ 0.75
        scale = 0.6 + ((currentViewportWidth - 640) / (768 - 640)) * 0.15;
      } else if (currentViewportWidth < 1024) {
        // 태블릿 (768px ~ 1023px) - 0.75 ~ 0.9
        scale = 0.75 + ((currentViewportWidth - 768) / (1024 - 768)) * 0.15;
      } else if (currentViewportWidth < 1440) {
        // 작은 데스크탑 (1024px ~ 1439px) - 0.9 ~ 1.1
        scale = 0.9 + ((currentViewportWidth - 1024) / (1440 - 1024)) * 0.2;
      } else if (currentViewportWidth < 1920) {
        // 중간 데스크탑 (1440px ~ 1919px) - 1.1 ~ 1.3
        scale = 1.1 + ((currentViewportWidth - 1440) / (1920 - 1440)) * 0.2;
      } else {
        // 큰 데스크탑 (1920px+) - 1.3 ~ 1.5
        scale = Math.min(1.5, 1.3 + ((currentViewportWidth - 1920) / 1000) * 0.2);
      }
      setWidgetScale(scale);

      const newPositions: { [key: string]: { x: number; y: number } } = {};

      WIDGET_CONFIGS.forEach(widget => {
        // viewport에 맞게 위젯 크기 동적 조정 (비율 유지)
        const scaledWidth = widget.baseSize.width * scale;
        const scaledHeight = widget.baseSize.height * scale;

        // 안전한 최대 위치 계산 (위젯이 완전히 보이도록)
        const maxSafeX = currentViewportWidth - scaledWidth - PADDING;
        const maxSafeY = viewportHeight - currentTaskbarHeight - scaledHeight - PADDING;

        // 안전 영역 내에서 백분율 적용 가능한 범위 계산
        const availableWidth = maxSafeX - safeStartX;
        const availableHeight = maxSafeY - safeStartY;

        // 백분율을 실제 픽셀로 변환
        let x = Math.round(safeStartX + (availableWidth * widget.positionPercent.x) / 100);
        let y = Math.round(safeStartY + (availableHeight * widget.positionPercent.y) / 100);

        // 최종 안전 범위 내로 제한
        x = Math.max(safeStartX, Math.min(x, maxSafeX));
        y = Math.max(safeStartY, Math.min(y, maxSafeY));

        newPositions[widget.id] = { x, y };
      });

      setWidgetPositions(newPositions);
      setWidgetsReady(true); // 위젯 준비 완료
    };

    calculatePositions();

    // 화면 크기 변경 시 재계산
    window.addEventListener('resize', calculatePositions);
    window.addEventListener('orientationchange', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
      window.removeEventListener('orientationchange', calculatePositions);
    };
  }, [WIDGET_CONFIGS]);

  // --- Handlers ---
  // 바탕화면 빈 곳 클릭 시 아이콘 선택 해제
  const handleBackgroundClick = (e: React.MouseEvent | React.TouchEvent) => {
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

    if (isTouchDevice) {
      setSelectedIconId(null);
    }
  };

  // 아이콘 클릭 핸들러 (이벤트 전파 중단 필수)
  const handleIconClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: string): void => {
    e.stopPropagation();

    if (isTouchDevice || viewportWidth < 768) {
      const icon: DesktopIconConfig | undefined = DESKTOP_ICONS.find((icon: DesktopIconConfig) => icon.id === id);
      if (icon) {
        executeApp(icon);
      }
      return;
    }

    setSelectedIconId(id);
  };

  // 아이콘 더블클릭 핸들러
  const handleIconDoubleClick = (icon: DesktopIconConfig) => {
    if (isTouchDevice) return; // 터치 디바이스에서는 더블클릭 무시
    executeApp(icon);
  };

  // 바탕화면 배경 클릭 핸들러
  return (
    <main
      className="w-full h-full relative overflow-hidden bg-cover bg-center"
      style={{
        minWidth: '320px',
        minHeight: '500px',
        touchAction: 'pan-y'
      }}
    >
      {/* 최소 크기 미만 경고 화면 */}
       {isViewportTooSmall && (
        <div className="absolute inset-0 z-[9999] bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white rounded-lg p-8 max-w-md shadow-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="font-pixel text-xl mb-4 text-gray-900">화면 크기가 너무 작습니다</h2>
            <p className="font-pixel text-sm text-gray-700 leading-relaxed mb-2">
              이 사이트는 최소 <strong>320 x 500</strong> 크기의 화면이 필요합니다.
            </p>
            <p className="font-pixel text-xs text-gray-500">
              기기를 회전하거나 브라우저 창을 키워주세요.
            </p>
          </div>
        </div>
      )}

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
      <div 
        className="
          absolute top-0 left-0
          w-full
          pt-safe pl-safe

          /* [Mobile] 전체 화면 채우기, 스크롤 허용 */
          flex flex-row flex-wrap content-start
          justify-start gap-x-4 gap-y-4 p-4
          overflow-y-auto overflow-x-hidden
          pointer-events-auto

          /* [Desktop] 세로 방향으로 정렬, 높이 부족 시 다음 열로 wrap */
          md:w-auto md:bottom-auto md:right-auto
          md:flex-col md:flex-wrap md:content-start md:items-start md:gap-2 md:p-4
          md:overflow-visible
          md:pointer-events-none

          z-[var(--z-desktop)]
        "
        style={{
          height: `calc(100vh - ${taskbarHeight}px)`,
          maxHeight: `calc(100dvh - ${taskbarHeight}px)`,
          paddingBottom: `${taskbarHeight + 10}px`,
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={handleBackgroundClick}
        onTouchEnd={handleBackgroundClick}
      >
        <div className="contents md:pointer-events-auto">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.title}
              iconSrc={icon.iconSrc}
              isSelected={selectedIconId === icon.id}
              onClick={(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => handleIconClick(e, icon.id)}
              onDoubleClick={() => handleIconDoubleClick(icon)}
              scale={iconScale}
            />
          ))}
        </div>
      </div>

      {/* =================================================================================
          3. 바탕화면 위젯들 (드래그 가능)
      ================================================================================= */}
      {widgetsReady && (
        <div
          className="absolute inset-0 pointer-events-none z-[var(--z-desktop)]"
          style={{ 
            bottom: `${taskbarHeight}px`,
            paddingBottom: `${taskbarHeight}px`,
          }}
        >
          {WIDGET_CONFIGS.map((widget) => {
            const WidgetComponent = widget.component;
            return (
              <DraggableWidget
                key={widget.id}
                defaultPosition={widgetPositions[widget.id] || { x: 0, y: 0 }}
                scale={widgetScale}
                taskbarHeight={taskbarHeight}
              >
                <WidgetComponent {...widget.props} scale={widgetScale} />
              </DraggableWidget>
            );
          })}
        </div>
      )}

    </main>
  );
}