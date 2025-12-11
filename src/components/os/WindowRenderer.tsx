'use client';

import { useWindowStore, AppType } from '@/app/stores/useWindowStore';
import { WindowFrame } from '..';

// 앱 컴포넌트 Imports
import {
    DDayCounterWidget,
    MembersQuoteWidget,
    MiniPlayerWidget,
    PhotoCardWidget,
    PolaroidPhotoWidget,
    StickyNoteWidget,
    WichuTamagotchiWidget,
    WishJarWidget
} from '@/components/widgets';

function PlaceholderApp({ type }: { type: string }) {
  return (
    <div className="w-full h-full min-w-[300px] min-h-[200px] flex flex-col items-center justify-center bg-white p-8 text-center gap-4">
      <div className="text-4xl">🚧</div>
      <div>
        <h3 className="font-pixel text-lg font-bold mb-2">{type}</h3>
        <p className="text-gray-500 text-sm">이 앱은 아직 개발 중입니다.<br/>조금만 기다려주세요! 💚</p>
      </div>
    </div>
  );
}

export default function WindowRenderer() {
    const { windows, activeWindowId, closeWindow, minimizeWindow, focusWindow, maximizeWindow } = useWindowStore();

    // 앱 타입에 따른 컴포넌트 매핑
    const renderAppContent = (type: AppType) => {
        switch (type) {
            case 'TO_WISH':
                return <WishJarWidget />;
            case 'MY_WISH':
            case 'DISCOGRAPHY':
            case 'WISH_ARCHIVE':
            case 'WISH_GALLERY':
            case 'WISH_WORLD':
            case 'RECYCLE_BIN':
            case 'README':
            default:
                return <PlaceholderApp type={type} />;
        }
    };

    return (
        <>
            {windows.map((win) => (
                <div
                    key={win.id}
                    style={{
                        display: win.isMinimized ? 'none' : 'block', // 최소화 시 숨김
                        zIndex: win.zIndex, // 활성화 순서(레이어) 적용
                        position: win.isMaximized ? 'fixed' : 'absolute',
                        width: win.isMaximized ? '100%' : 'auto',
                        height: win.isMaximized ? '100%' : 'auto',
                        left: win.isMaximized ? 0 : (win.defaultPosition?.x ?? 100),
                        top: win.isMaximized ? 0 : (win.defaultPosition?.y ?? 50),
                    }}
                    // 창 자체를 클릭하면 맨 앞으로 가져오기 (Focus)
                    onMouseDown={() => focusWindow(win.id)}
                >
                    <WindowFrame
                        title={win.title}
                        iconSrc={win.icon}
                        isActive={activeWindowId === win.id}
                        isMaximized={win.isMaximized}
                        onClose={() => closeWindow(win.id)}
                        onMinimize={() => minimizeWindow(win.id)}
                        onMaximize={() => maximizeWindow(win.id)}
                    >
                        {renderAppContent(win.appType)}
                    </WindowFrame>
                </div>
            ))}
        </>
    );
}