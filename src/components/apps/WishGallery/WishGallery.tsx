/**
 * APP: WISH GALLERY
 * 
 * - 갤러리 폴더 및 이미지 뷰어
 * - 폴더 탐색 및 이미지 미리보기
 * - 이미지 선택 시 바탕화면 배경화면으로 설정 가능
 */
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Button, Spinner, MenuBar, MenuItemType, Dropdown, ToolBar } from '@/components/ui';
import { useWindowStore } from '@/app/stores/useWindowStore';

// ----------------------------------------------------------------------
// Types & Icons
// ----------------------------------------------------------------------

type GalleryItem = {
  id: string;
  name: string;
  type: 'root' | 'folder' | 'image';
  children?: GalleryItem[];
  url?: string;
  thumbnailUrl?: string;
  date?: string;
  width?: number;
  height?: number;
};

const hasDescendant = (parent: GalleryItem, targetId: string): boolean => {
  if (!parent.children) return false;
  for (const child of parent.children) {
    if (child.id === targetId) return true;
    if (child.children && hasDescendant(child, targetId)) return true;
  }
  return false;
}

// ----------------------------------------------------------------------
// 메인 컴포넌트
// ----------------------------------------------------------------------

export default function WishGallery({ onClose }: { onClose: () => void }) {
  // Global Store
  const setBackgroundImage = useWindowStore((state) => state.setBackgroundImage);

  // 상태 관리
  const [fileSystem, setFileSystem] = useState<GalleryItem | null>(null);
  const [currentFolder, setCurrentFolder] = useState<GalleryItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  // 뷰 모드 상태
  const [viewMode, setViewMode] = useState<'thumb' | 'preview' | 'details'>('thumb'); // 보기 모드
  const [showTree, setShowTree] = useState(true); // 폴더 트리 표시 여부
  const [zoomLevel, setZoomLevel] = useState(1); // 줌 레벨 (미리보기 모드)
  const [isSlideshow, setIsSlideshow] = useState(false); // 슬라이드쇼 모드 여부

  // 슬라이드 쇼 타이머 참조
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 데이터 로드
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data: GalleryItem = await res.json();
          setFileSystem(data);
          // 초기 폴더: 'All Photos' 또는 루트
          const allPhotos = data.children?.find((c: GalleryItem) => c.name === 'All Photos');
          setCurrentFolder(allPhotos || data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    init();
  }, []);

  const currentImages = useMemo(() => {
    return currentFolder?.children?.filter((item) => item.type === 'image') || [];
  }, [currentFolder]);

  const sortedChildren = useMemo(() => {
    if (!currentFolder?.children) return [];
    return [...currentFolder.children].sort((a, b) => {
      // 폴더 우선 정렬, 그 다음 이름순
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'folder' ? -1 : 1;
    });
  }, [currentFolder]);

  // 폴더 이동
  const handleNavigate = (item: GalleryItem) => {
    if (item.type === 'folder' || item.type === 'root') {
      setCurrentFolder(item);
      setSelectedItem(null);
      setViewMode('thumb');
      stopSlideshow();
    }
  };

  const handleImageSelect = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleOpenItem = (item: GalleryItem) => {
    if (item.type === 'folder') {
      handleNavigate(item);
    } else if (item.type === 'image') {
      setSelectedItem(item);
      setViewMode('preview');
      setZoomLevel(1);
    }
  };

  // 이미지 네비게이션 (이전/다음)
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

  // 슬라이드쇼
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
      }, 3000); // 3초마다 전환
    } else {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
    }
    return () => { if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current); };
  }, [isSlideshow, selectedItem, currentImages]);

  // 줌 컨트롤
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


  // 렌더링
  if (loading || !fileSystem) {
    return (
      <div className="h-full flex items-center justify-center bg-[#f0f0f0] select-none">
        <Spinner size="lg" />
        <p className="mt-4 font-pixel text-xs text-gray-500 animate-pulse">Loading Gallery...</p>
      </div>
    );
  }

  // 메뉴 정의
  const menuItems: MenuItemType[] = [
    {
      key: 'file',
      label: '&File',
      children: (
        <Dropdown.Menu>
          <Dropdown.Item
            label="Set as Wallpaper"
            onClick={() => selectedItem?.url && setBackgroundImage(selectedItem.url)}
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
        </Dropdown.Menu>
      ),
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#f0f0f0] font-sans select-none overflow-hidden">

      {/* 1. Menu Bar */}
      <MenuBar items={menuItems} className="bg-[#f0f0f0]" />

      {/* 2. Tool Bar */}
      <ToolBar hasGripper={true} className="border-b-0">
        <div className="flex gap-1 items-center">
          <NavButton label="Back" icon="⬅️" onClick={() => setCurrentFolder(fileSystem)} disabled={currentFolder === fileSystem} />
          <div className="w-[1px] h-5 bg-gray-400 mx-2" />
          <NavButton label="Folders" icon="📂" active={showTree} onClick={() => setShowTree(!showTree)} />
          <div className="w-[1px] h-5 bg-gray-400 mx-2" />
          <NavButton
            label={isSlideshow ? "Stop" : "SlideShow"}
            icon={isSlideshow ? "⏹️" : "🎞️"}
            onClick={toggleSlideshow}
            active={isSlideshow}
            disabled={currentImages.length === 0}
          />
          <NavButton
            label="Wallpaper"
            icon="🖼️"
            onClick={() => selectedItem?.url && setBackgroundImage(selectedItem.url)}
            disabled={!selectedItem || selectedItem.type !== 'image'}
          />
        </div>
      </ToolBar>

      {/* 3. View Options Bar (Secondary Toolbar) */}
      <div className="h-7 bg-[#f0f0f0] border-b border-white border-t border-gray-200 flex items-center px-2 gap-2 text-xs">
        <span className="text-gray-500">View:</span>
        <button className={`hover:bg-blue-100 px-1 rounded ${viewMode === 'thumb' ? 'font-bold text-blue-800' : ''}`} onClick={() => setViewMode('thumb')}>Thumbnails</button>
        <button className={`hover:bg-blue-100 px-1 rounded ${viewMode === 'preview' ? 'font-bold text-blue-800' : ''}`} onClick={() => setViewMode('preview')}>Preview</button>
        <button className={`hover:bg-blue-100 px-1 rounded ${viewMode === 'details' ? 'font-bold text-blue-800' : ''}`} onClick={() => setViewMode('details')}>Details</button>

        {viewMode === 'preview' && (
          <>
            <div className="w-[1px] h-3 bg-gray-400 mx-1" />
            <button onClick={() => handleZoom(-0.25)} className="hover:bg-gray-200 px-1 rounded">🔍-</button>
            <span className="text-[10px] w-8 text-center">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => handleZoom(0.25)} className="hover:bg-gray-200 px-1 rounded">🔍+</button>
          </>
        )}
      </div>

      {/* 4. Main Content Area */}
      <div className="flex-1 flex m-1 bg-white border-2 border-inset border-gray-400 shadow-[inset_1px_1px_0px_#888] min-h-0 relative">

        {/* [Left] Folder Tree (Responsive) */}
        {showTree && (
          <div className="h-full w-[180px] bg-white border-r border-gray-200 overflow-y-auto custom-scrollbar flex flex-col shrink-0">
            <div className="p-1 min-w-max">
              <FolderTree item={fileSystem} currentFolder={currentFolder} onNavigate={handleNavigate} />
            </div>
          </div>
        )}

        {/* [Right] Content View */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden w-full relative">

          {/* A. Thumbnail View */}
          {viewMode === 'thumb' && (
            <div
              className="flex-1 overflow-y-auto p-3 content-start grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4 bg-white custom-scrollbar"
              onClick={() => setSelectedItem(null)}
            >
              {sortedChildren.length === 0 && (
                <div className="col-span-full text-center text-gray-400 text-sm mt-10">Empty Folder</div>
              )}

              {sortedChildren.map((item) => (
                <div
                  key={item.id || item.name}
                  onClick={(e) => { e.stopPropagation(); handleImageSelect(item); }}
                  onDoubleClick={() => handleOpenItem(item)}
                  className={`
                                flex flex-col items-center justify-start group cursor-default
                                ${selectedItem === item ? '' : 'hover:opacity-90'}
                            `}
                >
                  {/* Frame */}
                  <div className={`
                                w-20 h-20 mb-1 flex items-center justify-center bg-gray-100 overflow-hidden relative shadow-sm
                                ${selectedItem === item ? 'ring-2 ring-[#000080] opacity-80' : 'border border-gray-300'}
                            `}>
                    {item.type === 'folder' ? (
                      <span className="text-4xl">📁</span>
                    ) : (
                      <img
                        src={item.thumbnailUrl || item.url}
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

          {/* B. Details View (List) */}
          {viewMode === 'details' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <div className="flex text-xs text-gray-600 px-2 py-1 border-b border-gray-200 bg-gray-50 font-bold shrink-0">
                <div className="w-1/2 px-1 border-r border-gray-200">Name</div>
                <div className="w-1/4 px-1 border-r border-gray-200">Date</div>
                <div className="w-1/4 px-1">Dimensions</div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                {sortedChildren.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleImageSelect(item)}
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
                    <div className="w-1/4 truncate px-1 opacity-80">{item.date ? new Date(item.date).toLocaleDateString() : '-'}</div>
                    <div className="w-1/4 truncate px-1 opacity-80">{item.width ? `${item.width} x ${item.height}` : '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. Preview View */}
          {viewMode === 'preview' && (
            <div className="flex-1 flex flex-col bg-[#505050] relative overflow-hidden">
              {selectedItem ? (
                <>
                  {/* Main Canvas */}
                  <div className="flex-1 flex items-center justify-center overflow-auto custom-scrollbar relative">
                    <img
                      src={selectedItem.url}
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

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-2xl z-10 transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-2xl z-10 transition-colors"
                  >
                    ›
                  </button>

                  {/* Bottom Filmstrip */}
                  <div className="h-16 bg-[#333] border-t border-gray-600 flex items-center gap-2 px-4 overflow-x-auto custom-scrollbar shrink-0">
                    {currentImages.map(img => (
                      <button
                        key={img.id}
                        onClick={() => { setSelectedItem(img); setZoomLevel(1); }}
                        className={`
                                    w-10 h-10 shrink-0 border-2 overflow-hidden
                                    ${selectedItem.id === img.id ? 'border-yellow-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}
                                  `}
                      >
                        <img src={img.thumbnailUrl || img.url} alt="" className="w-full h-full object-cover" />
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
        </div>
      </div>

      {/* 5. Status Bar */}
      <div className="h-6 border-t border-gray-300 bg-[#f0f0f0] px-2 flex items-center gap-4 text-xs text-gray-600 select-none">
        <span className="flex-1 truncate">
          {viewMode === 'preview'
            ? `${currentImages.findIndex(i => i.id === selectedItem?.id) + 1} / ${currentImages.length}`
            : `${currentFolder?.children?.length || 0} object(s)`
          }
        </span>
        <div className="w-[1px] h-4 bg-gray-400" />
        <span className="w-48 truncate text-right">
          {selectedItem ? `${selectedItem.name} ${selectedItem.width ? `(${selectedItem.width}x${selectedItem.height})` : ''}` : 'My Wish Gallery'}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Helper Components
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

// ----------------------------------------------------------------------
// FolderTree Component
// ----------------------------------------------------------------------

function FolderTree({
  item,
  currentFolder,
  onNavigate,
  level = 0
}: {
  item: GalleryItem,
  currentFolder: GalleryItem | null,
  onNavigate: (i: GalleryItem) => void,
  level?: number
}) {
  const [isOpen, setIsOpen] = useState(false);

  // 선택 여부 확인
  const isSelected = currentFolder?.id === item.id;

  // 자식 폴더가 있는지 확인
  const childFolders = item.children?.filter(c => c.type === 'folder' || c.type === 'root') || [];
  const hasChildren = childFolders.length > 0;

  // [Effect] 현재 선택된 폴더가 내 자식이라면 자동으로 펼치기
  useEffect(() => {
    let shouldOpen = false;

    // 루트는 처음에 항상 펼쳐두기
    if (item.type === 'root') {
      setIsOpen(true);
    }

    if (currentFolder && (currentFolder.id === item.id || hasDescendant(item, currentFolder.id))) {
      shouldOpen = true;
    }

    if (shouldOpen) {
      setIsOpen(prev => {
        if (prev) return prev; // 이미 열려있으면 유지
        return true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder, item]);

  // 토글 핸들러
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-sans select-none">
      <div
        className={`
                    flex items-center gap-1 py-[1px] cursor-pointer text-xs truncate border border-transparent 
                    ${isSelected
            ? 'bg-[#000080] text-white border-dotted border-gray-200'
            : 'text-black hover:underline hover:text-blue-800'
          }
                `}
        style={{ paddingLeft: `${level * 16}px` }} // 들여쓰기 조정
        onClick={() => onNavigate(item)}
      >
        {/* 1. 토글 버튼 (자식이 있을 때만 표시) */}
        <div
          className="w-4 h-4 flex items-center justify-center shrink-0 hover:bg-black/10 rounded-sm cursor-pointer"
          onClick={hasChildren ? handleToggle : undefined}
        >
          {hasChildren && (
            <span className="text-[10px] text-gray-500 transform scale-75">
              {isOpen ? '▼' : '▶'}
            </span>
          )}
        </div>

        {/* 2. 폴더 아이콘 (상태에 따라 변경) */}
        <span className="text-sm shrink-0">
          {item.type === 'root'
            ? '🖼️'
            : (isOpen ? '📂' : '📁') // 열리면 📂, 닫히면 📁
          }
        </span>

        {/* 3. 폴더 이름 */}
        <span className="truncate">{item.name}</span>
      </div>

      {/* 4. 자식 폴더 렌더링 (isOpen일 때만) */}
      {hasChildren && isOpen && (
        <div>
          {childFolders.map(child => (
            <FolderTree
              key={child.id || child.name}
              item={child}
              currentFolder={currentFolder}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}