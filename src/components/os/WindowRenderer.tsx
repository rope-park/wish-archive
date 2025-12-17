/**
 * WindowRenderer 컴포넌트
 * 
 * - 열린 윈도우 스토어를 구독하여 각 윈도우에 해당하는 앱 컴포넌트 렌더링
 * - 각 앱 타입에 따라 적절한 컴포넌트를 매핑하여 렌더링
 * - 윈도우 프레임 컴포넌트로 감싸서 창 관리 기능 제공
 */

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
} from '../widgets';

function PlaceholderApp({ type }: { type: string }) {
  return (
    <div className="w-full h-full min-w-[300px] min-h-[200px] flex flex-col items-center justify-center bg-white p-2 text-center gap-4">
      <div className="text-4xl">🚧</div>
      <div>
        <h3 className="font-pixel text-lg font-bold mb-2">{type}</h3>
        <p className="text-gray-500 text-sm">이 앱은 아직 개발 중입니다.<br/>조금만 기다려주세요! 💚</p>
      </div>
    </div>
  );
}

export default function WindowRenderer() {
    const { windows, closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

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
                <WindowFrame
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    iconSrc={win.icon}
                    initialSize={win.size}
                    initialPosition={win.position}
                >
                    {renderAppContent(win.appType)}
                </WindowFrame>
            ))}
        </>
    );
}