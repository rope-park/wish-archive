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

import { useState } from 'react';
import { useWindowStore, AppType } from '@/app/stores/useWindowStore';

// --- 컴포넌트 Imports ---
import { DesktopIcon } from '@/components/os';
import WindowRenderer from '@/components/os/WindowRenderer';

// --- 위젯 Imports ---
import { DDayCounterWidget, Draggable, MembersQuoteWidget, MiniPlayerWidget, PhotoCardWidget, PolaroidPhotoWidget, StickyNoteWidget, WichuTamagotchiWidget, WishJarWidget } from '@/components/widgets';
import DraggableWidget from '@/components/widgets/DraggableWidget';

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

// 위젯 설정 (초기 위치 및 컴포넌트 매핑)
const WIDGETS = [
  {
    id: 'dday',
    defaultPos: { x: 1150, y: 40 },
    component: <DDayCounterWidget targetDate="2024-02-21" label="Debut" />,
  },
  {
    id: 'photocard',
    defaultPos: { x: 450, y: 50 },
    component: <PhotoCardWidget />,
  },
  {
    id: 'sticky_note',
    defaultPos: { x: 1200, y: 180 },
    component: <StickyNoteWidget initialText="Welcome to WISH OS! 🍀" color="pink" />,
  },
  {
    id: 'polaroid',
    defaultPos: { x: 300, y: 450 },
    component: <PolaroidPhotoWidget src="/images/widgets/PolaroidPhoto/wishpolaroid_temp.jpg" />,
  },
  {
    id: 'tamagotchi',
    defaultPos: { x: 1050, y: 400 },
    component: <WichuTamagotchiWidget />,
  },
  {
    id: 'quote',
    defaultPos: { x: 700, y: 550 },
    component: <MembersQuoteWidget />,
  },
  {
    id: 'miniplayer',
    defaultPos: { x: 50, y: 600 },
    component: <MiniPlayerWidget />,
  }
];

export default function Home() {
  // 🖱️ 아이콘 선택 상태 관리
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  // 창 열기 함수 가져오기
  const { openWindow } = useWindowStore();

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
      alert("추억은 버릴 수 없어요!");
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
          1. 윈도우 렌더러 (열린 창들을 그려줌)
          - z-inex 관리는 store 내부에서 처리되므로 신경 쓸 필요 없음
      ================================================================================= */}
      <WindowRenderer />

      {/* =================================================================================
          2. 데스크탑 아이콘 그리드
      ================================================================================= */}
      <div className="
        absolute top-4 left-4 bottom-16 w-[200px]
        flex flex-col flex-wrap gap-y-6 gap-x-2 content-start
        z-[--z-desktop] pointer-events-none
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
          3. 바탕화면 위젯들 (드래그 가능)
      ================================================================================= */}
      {WIDGETS.map((widget) => (
        <DraggableWidget
          key={widget.id}
          defaultPosition={widget.defaultPos}
        >
          {widget.component}
        </DraggableWidget>
      ))}

    </main>
  );
}