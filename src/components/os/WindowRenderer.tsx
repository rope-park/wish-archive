/**
 * Window Renderer
 * 
 * - 열려있는 모든 창을 렌더링합니다.
 * - 각 앱 타입에 따라 적절한 컴포넌트를 매핑하여 렌더링합니다.
 */

'use client';

import { useWindowStore, AppType } from '@/app/stores/useWindowStore';
import { WindowFrame } from '..';

// 앱 컴포넌트 Imports


import { MyWish, WishWorld, WishArchive, WishGallery, Discography, RecycleBin, ToWish } from '@/components/apps';

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
    const { windows, closeWindow } = useWindowStore();

    // 앱 타입에 따른 컴포넌트 매핑
    const renderAppContent = (type: AppType, windowId: string) => {
        switch (type) {
            case 'TO_WISH':
                return <ToWish />;
            case 'MY_WISH':
                return <MyWish onClose={() => closeWindow(windowId)}/>;
            case 'WISH_WORLD':
                return <WishWorld />;
            case 'WISH_ARCHIVE':
                return <WishArchive />;
            case 'WISH_GALLERY':
                return <WishGallery onClose={() => closeWindow(windowId)} />;
            case 'DISCOGRAPHY':
                return <Discography onClose={() => closeWindow(windowId)} />;
            case 'RECYCLE_BIN':
                return <RecycleBin onClose={() => closeWindow(windowId)} />;
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
                    {renderAppContent(win.type, win.id)}
                </WindowFrame>
            ))}
        </>
    );
}