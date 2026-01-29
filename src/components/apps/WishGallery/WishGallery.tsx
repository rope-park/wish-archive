/**
 * APP: WISH GALLERY
 * 
 * - 갤러리 폴더 및 이미지 뷰어
 * - 폴더 탐색 및 이미지 미리보기
 * - 이미지 선택 시 바탕화면 배경화면으로 설정 가능
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Spinner, MenuBar, MenuItemType, Dropdown, ToolBar } from '@/components/ui';
import { AppHeader } from '@/components/ui/AppHeader';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { ArrowLeft, FolderOpen, Image as ImageIcon, Grid3x3, List as ListIcon, PlayCircle, ZoomIn, ZoomOut } from 'lucide-react';

// ----------------------------------------------------------------------
// Types & Icons
// ----------------------------------------------------------------------

type GalleryItem = {
  id: string;
  name: string;
  type: 'folder' | 'image';
  path?: string;   // 폴더일 때 경로
  src?: string;    // 이미지일 때 URL
  caption?: string; // Cloudinary Context (설명)
  width?: number;
  height?: number;
  createdAt?: string;
};

// 사이드바 퀵 링크 정의
const QUICK_LINKS = [
  { name: 'Root', path: 'nct-wish', icon: '💿' },
  { name: 'Members', path: 'nct-wish/members', icon: '👥' },
  { name: 'Eras (Album)', path: 'nct-wish/eras', icon: '💿' },
  { name: 'Events (Schedule)', path: 'nct-wish/events', icon: '📅' },
];

// ----------------------------------------------------------------------
// 메인 컴포넌트
// ----------------------------------------------------------------------

export default function WishGallery({ onClose }: { onClose: () => void }) {
  // Global Store
  const setBackgroundImage = useWindowStore((state) => state.setBackgroundImage);

  // 상태 관리
  const [currentPath, setCurrentPath] = useState<string>('nct-wish'); // 현재 경로
  const [items, setItems] = useState<GalleryItem[]>([]); // 현재 폴더의 아이템들
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null); // 선택된 아이템

  // 뷰 모드 상태
  const [viewMode, setViewMode] = useState<'thumb' | 'preview' | 'details'>('thumb'); // 보기 모드
  const [showSidebar, setShowSidebar] = useState(true); // 사이드바 표시 여부
  const [zoomLevel, setZoomLevel] = useState(1); // 줌 레벨 (미리보기 모드)
  const [isSlideshow, setIsSlideshow] = useState(false); // 슬라이드쇼 모드 여부

  // 슬라이드 쇼 타이머 참조
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ----------------------------------------------------------------------
  // 1. 데이터 로드 (API Call)
  // ----------------------------------------------------------------------
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setSelectedItem(null); // 폴더 이동 시 선택 초기화
      try {
        // API 호출: 현재 경로의 폴더/파일 가져오기
        const res = await fetch(`/api/gallery?mode=folder&path=${currentPath}`);
        const data = await res.json();

        if (data.items) {
          setItems(data.items);
        } else {
          setItems([]);
        }
      } catch (e) {
        console.error("Failed to load gallery:", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPath]);

  // ----------------------------------------------------------------------
  // 2. 데이터 가공 및 정렬
  // ----------------------------------------------------------------------
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      // 폴더 우선, 그 다음 이름순
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });
  }, [items]);

  const currentImages = useMemo(() => {
    return sortedItems.filter(item => item.type === 'image');
  }, [sortedItems]);

  // ----------------------------------------------------------------------
  // 3. 네비게이션 핸들러
  // ----------------------------------------------------------------------

  // 뒤로 가기 (상위 폴더로 이동)
  const handleBack = () => {
    if (currentPath === 'nct-wish') return; // 루트면 무시
    const parts = currentPath.split('/');
    parts.pop(); // 마지막 경로 제거
    setCurrentPath(parts.join('/'));
  };

  // 폴더 진입
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setViewMode('thumb');
    stopSlideshow();
  };

  // 아이템 열기 (더블 클릭)
  const handleOpenItem = (item: GalleryItem) => {
    if (item.type === 'folder' && item.path) {
      handleNavigate(item.path);
    } else if (item.type === 'image') {
      setSelectedItem(item);
      setViewMode('preview');
      setZoomLevel(1);
    }
  };

  // 이미지 이전/다음
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedItem || currentImages.length === 0) return;
    const currentIndex = currentImages.findIndex(img => img.id === selectedItem.id);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'prev') {
      nextIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    } else {
      nextIndex = (currentIndex + 1) % currentImages.length;
    }
    setSelectedItem(currentImages[nextIndex]);
    setZoomLevel(1);
  };

  // ----------------------------------------------------------------------
  // 4. 슬라이드쇼 및 줌 로직
  // ----------------------------------------------------------------------
  const toggleSlideshow = () => {
    if (isSlideshow) {
      stopSlideshow();
    } else {
      if (viewMode !== 'preview') setViewMode('preview');
      if (!selectedItem && currentImages.length > 0) setSelectedItem(currentImages[0]);
      setIsSlideshow(true);
    }
  };

  const stopSlideshow = () => {
    setIsSlideshow(false);
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current);
      slideshowTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isSlideshow) {
      slideshowTimerRef.current = setInterval(() => {
        navigateImage('next');
      }, 3000);
    } else {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
    }
    return () => { if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSlideshow, selectedItem, currentImages]);

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3.0, prev + delta)));
  };

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'preview') {
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'Escape') setViewMode('thumb');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, selectedItem]);

  // ----------------------------------------------------------------------
  // 5. 메뉴 및 UI 구성
  // ----------------------------------------------------------------------
  const menuItems: MenuItemType[] = [
    {
      key: 'file',
      label: '&File',
      children: (
        <Dropdown.Menu>
          <Dropdown.Item
            label="Set as Wallpaper"
            onClick={() => selectedItem?.src && setBackgroundImage(selectedItem.src)}
            disabled={!selectedItem || selectedItem.type !== 'image'}
          />
          <Dropdown.Divider />
          <Dropdown.Item label="Close" onClick={onClose} />
        </Dropdown.Menu>
      ),
    },
    {
      key: 'view',
      label: '&View',
      children: (
        <Dropdown.Menu>
          <Dropdown.Item label="Thumbnails" onClick={() => setViewMode('thumb')} checked={viewMode === 'thumb'} />
          <Dropdown.Item label="Filmstrip (Preview)" onClick={() => setViewMode('preview')} checked={viewMode === 'preview'} />
          <Dropdown.Item label="Details" onClick={() => setViewMode('details')} checked={viewMode === 'details'} />
          <Dropdown.Divider />
          <Dropdown.Item label="Sidebar" onClick={() => setShowSidebar(!showSidebar)} checked={showSidebar} />
        </Dropdown.Menu>
      ),
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white font-sans select-none overflow-hidden">

      {/* 통일된 헤더 */}
      <AppHeader
        menuItems={[
          {
            label: 'File',
            items: [
              { 
                label: 'Set as Wallpaper', 
                onClick: () => selectedItem?.src && setBackgroundImage(selectedItem.src),
                disabled: !selectedItem || selectedItem.type !== 'image',
                shortcut: 'Ctrl+W'
              },
              { divider: true },
              { label: 'Close', onClick: onClose, shortcut: 'Alt+F4' }
            ]
          },
          {
            label: 'View',
            items: [
              { label: 'Thumbnails', onClick: () => setViewMode('thumb'), shortcut: 'Ctrl+1' },
              { label: 'Preview', onClick: () => setViewMode('preview'), shortcut: 'Ctrl+2' },
              { label: 'Details', onClick: () => setViewMode('details'), shortcut: 'Ctrl+3' },
              { divider: true },
              { label: 'Sidebar', onClick: () => setShowSidebar(!showSidebar), shortcut: 'Ctrl+B' },
              { divider: true },
              { label: 'Slideshow', onClick: toggleSlideshow, disabled: currentImages.length === 0, shortcut: 'F5' }
            ]
          },
          {
            label: 'Tools',
            items: [
              { label: 'Zoom In', onClick: () => handleZoom(0.25), shortcut: 'Ctrl+Plus' },
              { label: 'Zoom Out', onClick: () => handleZoom(-0.25), shortcut: 'Ctrl+Minus' },
              { label: 'Actual Size', onClick: () => setZoomLevel(1), shortcut: 'Ctrl+0' }
            ]
          }
        ]}
        toolbarButtons={[
          {
            icon: <ArrowLeft size={18} />,
            label: 'Back',
            onClick: handleBack,
            disabled: currentPath === 'nct-wish'
          },
          {
            icon: <FolderOpen size={18} />,
            label: 'Folders',
            onClick: () => setShowSidebar(!showSidebar),
            active: showSidebar
          },
          {
            icon: <Grid3x3 size={18} />,
            label: 'Grid',
            onClick: () => setViewMode('thumb'),
            active: viewMode === 'thumb'
          },
          {
            icon: <ListIcon size={18} />,
            label: 'List',
            onClick: () => setViewMode('details'),
            active: viewMode === 'details'
          },
          {
            icon: <PlayCircle size={18} />,
            label: isSlideshow ? 'Stop' : 'Slide',
            onClick: toggleSlideshow,
            active: isSlideshow,
            disabled: currentImages.length === 0
          }
        ]}
        addressBar={{
          value: currentPath.replace('nct-wish', 'Root'),
          readOnly: true,
          placeholder: 'Gallery Path'
        }}
        actionButtons={viewMode === 'preview' ? [
          {
            icon: <ZoomOut size={18} />,
            label: 'Zoom Out',
            onClick: () => handleZoom(-0.25)
          },
          {
            icon: <ZoomIn size={18} />,
            label: 'Zoom In',
            onClick: () => handleZoom(0.25)
          }
        ] : []}
      />

      {/* 4. Main Content Area */}
      <div className="flex-1 flex m-1 bg-white border-2 border-inset border-gray-400 shadow-[inset_1px_1px_0px_#888] min-h-0 relative">

        {/* [Left] Quick Access Sidebar */}
        {showSidebar && (
          <div className="h-full w-[160px] bg-gray-50 border-r border-gray-300 overflow-y-auto custom-scrollbar flex flex-col shrink-0">
            <div className="p-2 font-bold text-xs text-gray-500 uppercase tracking-wider">Quick Access</div>
            {QUICK_LINKS.map((link) => (
              <div
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs
                  ${currentPath === link.path || currentPath.startsWith(link.path + '/')
                    ? 'bg-[#000080] text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'}
                `}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* [Right] Content View */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden w-full relative">

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Spinner size="lg" />
              <p className="mt-4 font-pixel text-xs text-gray-500 animate-pulse">Fetching Cloudinary...</p>
            </div>
          ) : (
            <>
              {/* A. Thumbnail View */}
              {viewMode === 'thumb' && (
                <div
                  className="flex-1 overflow-y-auto p-3 content-start grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4 bg-white custom-scrollbar"
                  onClick={() => setSelectedItem(null)}
                >
                  {sortedItems.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 text-sm mt-10">This folder is empty.</div>
                  )}

                  {sortedItems.map((item) => (
                    <div
                      key={item.id || item.name}
                      onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                      onDoubleClick={() => handleOpenItem(item)}
                      className={`
                        flex flex-col items-center justify-start group cursor-default
                        ${selectedItem === item ? '' : 'hover:opacity-90'}
                      `}
                    >
                      {/* Frame */}
                      <div className={`
                        w-20 h-20 mb-1 flex items-center justify-center bg-gray-50 overflow-hidden relative shadow-sm
                        ${selectedItem === item ? 'ring-2 ring-[#000080] opacity-80' : 'border border-gray-300'}
                      `}>
                        {item.type === 'folder' ? (
                          <span className="text-4xl">📁</span>
                        ) : (
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        )}
                      </div>
                      {/* Label */}
                      <span className={`
                        text-xs text-center line-clamp-2 break-all px-1 py-0.5 rounded
                        ${selectedItem === item ? 'bg-[#000080] text-white' : 'text-gray-900'}
                      `}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* B. Details View */}
              {viewMode === 'details' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                  <div className="flex text-xs text-gray-600 px-2 py-1 border-b border-gray-200 bg-gray-50 font-bold shrink-0">
                    <div className="w-1/2 px-1 border-r border-gray-200">Name</div>
                    <div className="w-1/4 px-1 border-r border-gray-200">Caption/Tag</div>
                    <div className="w-1/4 px-1">Size</div>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                    {sortedItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        onDoubleClick={() => handleOpenItem(item)}
                        className={`
                          flex items-center text-xs px-1 py-0.5 cursor-default
                          ${selectedItem === item ? 'bg-[#000080] text-white' : 'hover:bg-gray-100 text-gray-800'}
                        `}
                      >
                        <div className="w-1/2 flex items-center gap-2 truncate pr-2">
                          <span className="text-sm">{item.type === 'folder' ? '📁' : '🖼️'}</span>
                          <span className="truncate">{item.name}</span>
                        </div>
                        <div className="w-1/4 truncate px-1 opacity-80">{item.caption || '-'}</div>
                        <div className="w-1/4 truncate px-1 opacity-80">{item.width ? `${item.width} x ${item.height}` : '-'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* C. Preview View */}
              {viewMode === 'preview' && (
                <div className="flex-1 flex flex-col bg-gray-700 relative overflow-hidden">
                  {selectedItem && selectedItem.type === 'image' ? (
                    <>
                      {/* Main Canvas */}
                      <div className="flex-1 flex items-center justify-center overflow-auto custom-scrollbar relative">
                        <img
                          src={selectedItem.src}
                          alt={selectedItem.name}
                          className="transition-transform duration-200 origin-center shadow-lg"
                          style={{
                            transform: `scale(${zoomLevel})`,
                            maxWidth: '95%',
                            maxHeight: '95%',
                            objectFit: 'contain'
                          }}
                          draggable={false}
                        />
                      </div>

                      {/* Caption Overlay */}
                      {selectedItem.caption && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm font-handwriting">
                          {selectedItem.caption}
                        </div>
                      )}

                      {/* Nav Arrows */}
                      <button onClick={() => navigateImage('prev')} className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-2xl z-10">‹</button>
                      <button onClick={() => navigateImage('next')} className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-2xl z-10">›</button>

                      {/* Filmstrip */}
                      <div className="h-16 bg-gray-800 border-t border-gray-600 flex items-center gap-2 px-4 overflow-x-auto custom-scrollbar shrink-0">
                        {currentImages.map(img => (
                          <button
                            key={img.id}
                            onClick={() => { setSelectedItem(img); setZoomLevel(1); }}
                            className={`
                              w-10 h-10 shrink-0 border-2 overflow-hidden
                              ${selectedItem.id === img.id ? 'border-yellow-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}
                            `}
                          >
                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      No image selected
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 5. Status Bar */}
      <div className="h-6 border-t border-gray-300 bg-gray-100 px-2 flex items-center gap-4 text-xs text-gray-600 select-none">
        <span className="flex-1 truncate">
          {viewMode === 'preview'
            ? `${currentImages.findIndex(i => i.id === selectedItem?.id) + 1} / ${currentImages.length}`
            : `${sortedItems.length} object(s)`
          }
        </span>
        <div className="w-[1px] h-4 bg-gray-400" />
        <span className="w-48 truncate text-right">
          {selectedItem
            ? `${selectedItem.name} ${selectedItem.width ? `(${selectedItem.width}x${selectedItem.height})` : ''}`
            : 'Ready'}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Helper Component
// ----------------------------------------------------------------------

function NavButton({ label, icon, disabled, onClick, active }: { label: string, icon: React.ReactNode, disabled?: boolean, onClick?: () => void, active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center min-w-[32px] h-[28px] px-1 rounded-sm
        border border-transparent
        ${active ? 'bg-gray-300 border-gray-400 shadow-inner' : ''}
        ${!disabled && !active ? 'hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm active:shadow-inner active:bg-gray-200' : ''}
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-75
      `}
      title={label}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}